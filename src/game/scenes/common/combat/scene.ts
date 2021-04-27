import { GameState, getState } from "../../../state/state";
import { Image, loadImages, SpriteSheet } from "../map/images";
import { Audio, loadAudio } from "../audio";
import { COMBAT_BACKGROUND_KEY } from "./images";
import { controlMenu, createMenu, Menu } from "../../../menus/menu";
import { isActionButtonJustPressed } from "../../../input/input";
import { getMenuConfig } from "../combat/menu";
import { createStatusMenu, getStatusMenuConfig, StatusMenu } from "./status";
import { controlDialog, Dialog } from "../../../menus/dialog";
import { createCombatDialogBox } from "./dialog";
import { createTurnFunction } from "./system";
import { createEnemy, Enemy, EnemyConfig } from "./enemy";
import { createEndingCutScene } from "../../ending/createEndingCutScene";
import {
  checkSystemControlsInput,
  initLoadingScreen,
  SceneMethods,
} from "../scene";
import { createTouchButtons } from "../../../input/touchInput";

export interface CreateCombatSceneInput {
  initialCutScene: (state: GameState) => boolean;
  images: Image[];
  spriteSheets: SpriteSheet[];
  audios: Audio[];
  music?: string;
  enemy: EnemyConfig;
}

let menu: Menu;
let statusMenu: StatusMenu;
let dialog: Dialog;
let runTurn: () => boolean;

export const createSceneMethods = ({
  initialCutScene,
  images,
  spriteSheets,
  audios,
  enemy,
}: CreateCombatSceneInput): SceneMethods => {
  function preload(this: Phaser.Scene) {
    const state = getState();
    state.scene.phaser = this;
    state.cutScene = initialCutScene;
    initLoadingScreen(this);
    loadImages(this, images, spriteSheets);
    loadAudio(this, audios);
  }

  function create(this: Phaser.Scene) {
    const state = getState();
    const background = this.add.sprite(-20, -20, COMBAT_BACKGROUND_KEY);
    background.setOrigin(0, 0);

    state.combat.enemy = createEnemy(enemy, this);

    menu = createMenu(this, getMenuConfig(this));

    statusMenu = createStatusMenu(this, getStatusMenuConfig(this));

    dialog = createCombatDialogBox(this);
    state.dialog = dialog;
    runTurn = createTurnFunction();
    createTouchButtons(this, state, false);
  }

  function update(this: Phaser.Scene) {
    const state = getState();
    const actionButtonJustPressed = isActionButtonJustPressed(this, state);
    const enemy = state.combat.enemy as Enemy;
    let isTurnRunning = false;
    statusMenu.updateHp();

    checkSystemControlsInput(this, state);

    if (dialog.isDialogOpen()) {
      controlDialog(dialog, actionButtonJustPressed);

      return;
    }

    if (state.cutScene) {
      const isFinished = state.cutScene(state);

      if (isFinished) {
        state.cutScene = undefined;
      }

      return;
    }

    isTurnRunning = runTurn();

    if (isTurnRunning) {
      menu.block();

      return;
    }

    if (enemy.isHpEmpty()) {
      enemy.die();

      state.cutScene = createEndingCutScene(this);

      return;
    }

    if (!menu.isMenuOpen()) {
      statusMenu.show();
      menu.show();
    }

    controlMenu(this, menu, false, actionButtonJustPressed, state);

    return;
  }

  return { preload, create, update };
};
