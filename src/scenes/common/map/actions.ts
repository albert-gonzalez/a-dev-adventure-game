import { GameState } from "../../../state/state";
import { findPropertyByName } from "../../../gameObjects/properties";
import { addItem } from "../../../inventory/current";
import { getItemFromRepository } from "../../../inventory/itemRepository";
import { Dialog } from "../../../menus/dialog";
import { DOWN, LEFT, RIGHT, UP } from "../../../input/input";
import { lookAtMainCharacter } from "./characters";

type ActivationDirection = "up" | "down" | "left" | "right";

export type ActionCallback = (
  object: Phaser.GameObjects.GameObject,
  anotherObject: Phaser.GameObjects.GameObject
) => void;

export interface ColliderWithCallback {
  object: Phaser.GameObjects.GameObject[] | Phaser.Tilemaps.TilemapLayer;
  callback?: ActionCallback;
}

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
  activationDirections?: ActivationDirection[];
  states: ActionState[];
  removeAfterLastState?: boolean;
  characterKey?: string;
  disabled?: boolean;
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
  albert: Phaser.GameObjects.Sprite,
  object: Phaser.GameObjects.Sprite,
  state: GameState
) => {
  const scene = state.scene.phaser as Phaser.Scene;
  const cutScene = state.cutScene;
  const isActionButtonJustPressed = state.input.isActionJustPressed;
  const dialog = state.dialog as Dialog;
  const actions = state.scene.actions;
  const currentActionStates = state.scene.currentActionStates;

  if (cutScene || dialog.isDialogOpen() || dialog.isDialogBusy()) {
    return;
  }
  const actionKey = findPropertyByName(object, "action").value;
  const sceneAction = getAction(
    actions,
    findPropertyByName(object, "action").value
  );

  if (!sceneAction || sceneAction.disabled) {
    return;
  }

  const actionCharacter =
    sceneAction.characterKey &&
    state.scene.characterSprites[sceneAction.characterKey];

  if (
    !isActionButtonJustPressed ||
    !isActivationDirectionCorrect(albert, object)
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

  if (actionCharacter) {
    lookAtMainCharacter(
      albert,
      actionCharacter,
      sceneAction.characterKey as string
    );

    sceneActionState.cutScene = (state) => {
      actionCharacter.setFrame(
        state.scene.charactersData[sceneAction.characterKey as string]
          .frame as number
      );

      return true;
    };
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
    object.destroy();
  }
};

const isActivationDirectionCorrect = (
  mainCharacter: Phaser.GameObjects.Sprite,
  action: Phaser.GameObjects.Sprite
) => {
  const charBody = mainCharacter.body as Phaser.Physics.Arcade.Body;
  const actionBody = action.body as Phaser.Physics.Arcade.Body;
  const xDiff = charBody.center.x - actionBody.center.x;
  const yDiff = charBody.center.y - actionBody.center.y;
  let activationDirection;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    activationDirection = xDiff > 0 ? LEFT : RIGHT;
  } else {
    activationDirection = yDiff > 0 ? UP : DOWN;
  }

  return mainCharacter.anims.currentAnim.key.includes(activationDirection);
};

export const transformAction = (object: Phaser.GameObjects.Sprite) => {
  object.setVisible(false);
  object.y += (object.body as Phaser.Physics.Arcade.Body).height;
};
