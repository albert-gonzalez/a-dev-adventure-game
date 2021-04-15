import { GameState, getState } from "../../../state/state";
import { Image, loadImages, SpriteSheet } from "../map/images";
import { Audio, loadAudio } from "../audio";
import { COMBAT_BACKGROUND_KEY } from "./images";
import { createEnemyAnimations, playStill } from "./animation";
import { controlMenu, createMenu, Menu } from "../../../menus/menu";
import { isActionButtonJustPressed } from "../../../input/input";
import { getMenuConfig, menuOptionsConfig } from "../combat/menu";
import { createStatusMenu, getStatusMenuConfig, StatusMenu } from "./status";
import { controlDialog, Dialog } from "../../../menus/dialog";
import { createCombatDialogBox } from "./dialog";
import { createTurnFunction } from "./system";
import { createEnemy, Enemy, EnemyConfig } from "./enemy";

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
  music,
  enemy,
}: CreateCombatSceneInput) => {
  function preload(this: Phaser.Scene) {
    const state = getState();
    state.scene.phaser = this;
    state.cutScene = initialCutScene;
    loadImages(this, images, spriteSheets);
    loadAudio(this, audios);
  }

  function create(this: Phaser.Scene) {
    const state = getState();
    const background = this.add.sprite(0, 0, COMBAT_BACKGROUND_KEY);
    background.setOrigin(0, 0);

    state.combat.enemy = createEnemy(this, enemy);

    menu = createMenu(this, getMenuConfig(this));
    menu.show();

    statusMenu = createStatusMenu(this, getStatusMenuConfig(this));

    dialog = createCombatDialogBox(this);
    state.dialog = dialog;
    runTurn = createTurnFunction();
  }

  function update(this: Phaser.Scene) {
    const state = getState();
    const actionButtonJustPressed = isActionButtonJustPressed(this, state);
    const enemy = state.combat.enemy as Enemy;
    let isTurnRunning = false;
    statusMenu.show();
    isTurnRunning = runTurn();

    if (isTurnRunning) {
      menu.block();

      return;
    }

    if (dialog.isDialogOpen()) {
      controlDialog(dialog, actionButtonJustPressed);

      return;
    }

    if (enemy.isHpEmpty()) {
      enemy.die();

      return;
    }

    controlMenu(this, menu, false, actionButtonJustPressed, state);

    return;
  }

  return { preload, create, update };
};
