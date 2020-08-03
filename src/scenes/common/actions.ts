import { GameState } from "../../state/state";
import { findPropertyByName } from "../../gameObjects/properties";
import { actions, currentActionStates } from "../scene1/actions";
import { objectActivationDirectionMatchesAnimation } from "../../characters/common/animation/animation";
import { addItem } from "../../inventory/current";
import { getItemFromRepository } from "../../inventory/itemRepository";
import { Dialog } from "../../menus/dialog";

type ActivationDirection = "up" | "down" | "left" | "right";

export interface DialogText {
  who?: string;
  text: string;
}

interface ActionState {
  texts: DialogText[];
  itemKeys?: string[];
  condition?: (state: GameState) => boolean;
  updateState?: (state: GameState) => void;
  textsFailure?: DialogText[];
  cutScene?: (state: GameState) => boolean;
}

export interface SceneAction {
  activationDirections: ActivationDirection[];
  states: ActionState[];
  removeAfterLastState?: boolean;
}

export interface CurrentActionStates {
  [key: string]: number;
}

export interface SceneActions {
  [key: string]: SceneAction;
}

export const getAction = (sceneActions: SceneActions, key: string) =>
  sceneActions[key];

export const getCurrentActionState = (
  currentActionStates: CurrentActionStates,
  key: string
) => {
  if (!(key in currentActionStates)) {
    currentActionStates[key] = 0;
  }

  return currentActionStates[key];
};

export const increaseCurrentActionState = (
  currentActionStates: CurrentActionStates,
  actions: SceneActions,
  key: string
) => {
  if (isLastState(currentActionStates, actions, key)) {
    return;
  }

  currentActionStates[key] += 1;
};

export const isLastState = (
  currentActionStates: CurrentActionStates,
  actions: SceneActions,
  key: string
) =>
  !actions[key] || actions[key].states.length - 1 === currentActionStates[key];

export const actionCallback = (
  albert: Phaser.GameObjects.GameObject,
  object: Phaser.GameObjects.GameObject,
  state: GameState
) => {
  const scene = state.scene.phaser as Phaser.Scene;
  const cutScene = state.cutScene;
  const isActionButtonJustPressed = state.controls.isActionJustPressed;
  const dialog = state.dialog as Dialog;

  if (
    cutScene ||
    !isActionButtonJustPressed ||
    dialog.isDialogOpen() ||
    dialog.isDialogBusy()
  ) {
    return;
  }
  const actionKey = findPropertyByName(object, "action").value;
  const sceneAction = getAction(
    actions,
    findPropertyByName(object, "action").value
  );

  if (!sceneAction) {
    return;
  }

  if (
    !objectActivationDirectionMatchesAnimation(
      albert as Phaser.GameObjects.Sprite,
      sceneAction
    )
  ) {
    return;
  }

  const currentActionState = getCurrentActionState(
    currentActionStates,
    actionKey
  );
  const sceneActionState = sceneAction.states[currentActionState];

  if (!sceneActionState) {
    return;
  }

  const isCurrentStateTheLast = isLastState(
    currentActionStates,
    actions,
    actionKey
  );

  if (sceneActionState.condition && !sceneActionState.condition(state)) {
    dialog.showDialogBox(sceneActionState.textsFailure);

    return;
  }

  dialog.showDialogBox(sceneActionState.texts, sceneActionState.cutScene);

  const items = sceneActionState.itemKeys;
  if (items?.length) {
    items.forEach((key) =>
      addItem(state.inventory, getItemFromRepository(key), scene)
    );
  }

  sceneActionState.updateState && sceneActionState.updateState(state);

  increaseCurrentActionState(currentActionStates, actions, actionKey);

  if (isCurrentStateTheLast && sceneAction.removeAfterLastState) {
    object.destroy(true);
  }
};
