import "phaser";

import {
  MENU_BOX_FILL_ALPHA,
  MENU_BOX_FILL_COLOR_BOTTOM,
  MENU_BOX_FILL_COLOR_TOP,
  MENU_BOX_FONT_FAMILY,
  MENU_BOX_FONT_LINE_SPACING_SMALL,
  MENU_BOX_FONT_SIZE_L,
  MENU_BOX_LINE_ALPHA,
  MENU_BOX_LINE_COLOR,
  MENU_BOX_LINE_WIDTH,
} from "./style";
import { DialogText } from "../scenes/common/map/actions";
import { GameState, getState } from "../state/state";
import { MENU_DEPTH } from "../scenes/common/constants";
import { getText } from "../i18n/i18n";
import { createMenuBoxRectangle, MenuConfig } from "./menu";
import { SELECT_EFFECT } from "../scenes/common/audio";

const MENU_BOX_MARGIN = 20;

export interface Dialog {
  showDialogBox(
    messages?: DialogText[],
    afterCutScene?: (state: GameState) => boolean
  ): void;
  showNextMessageOrHideDialogBox(): void;
  setText(newText: string): void;
  isDialogOpen(): boolean;
  isDialogBusy(): boolean;
}

export const createDialogBox = (
  scene: Phaser.Scene,
  config: MenuConfig
): Dialog => {
  const dialogBox = createMenuBoxRectangle(scene, config);
  dialogBox.setDepth(MENU_DEPTH);
  const text = createDialogBoxText(scene, dialogBox);
  text.setDepth(MENU_DEPTH);

  let dialogBusy = false;
  let currentMessages: DialogText[] = [];
  let currentAfterCutScene: (state: GameState) => boolean;

  return {
    showDialogBox(
      messages?: DialogText[],
      afterCutScene?: (state: GameState) => boolean
    ) {
      dialogBox.setVisible(true);

      if (afterCutScene) {
        currentAfterCutScene = afterCutScene;
      }

      if (messages?.length) {
        currentMessages = [...messages];
        text.setText(formatDialogText(currentMessages.shift()));
      }

      dialogBusy = true;

      scene.tweens.add({
        targets: dialogBox,
        duration: 250,
        scaleY: 1,
        onComplete: () => {
          text.setVisible(true);
          dialogBusy = false;
        },
      });
    },

    showNextMessageOrHideDialogBox() {
      dialogBusy = true;
      setTimeout(() => (dialogBusy = false), 100);
      scene.sound.play(SELECT_EFFECT);

      if (currentMessages.length) {
        text.setText(formatDialogText(currentMessages.shift()));
        return;
      }

      dialogBox.setVisible(false);
      dialogBox.scaleY = 0;
      text.setVisible(false);
      if (currentAfterCutScene) {
        getState().cutScene = currentAfterCutScene;
      }
    },

    setText(newText: string) {
      text.setText(newText);
    },

    isDialogOpen() {
      return dialogBox.visible;
    },

    isDialogBusy() {
      return dialogBusy;
    },
  };
};

const formatDialogText = (text?: DialogText) => {
  let str = "";

  if (!text) {
    return str;
  }

  if (text.who) {
    str = `${getText(text.who)}:\n\n`;
  }

  return str + getText(text.text, text.options);
};

const createDialogBoxText = (
  scene: Phaser.Scene,
  dialogBox: Phaser.GameObjects.Container
) => {
  const text = scene.add.text(
    dialogBox.x * 2,
    dialogBox.y + MENU_BOX_MARGIN,
    "",
    {
      fontFamily: MENU_BOX_FONT_FAMILY,
      fontSize: MENU_BOX_FONT_SIZE_L,
    }
  );

  text.setWordWrapWidth(scene.cameras.main.width - MENU_BOX_MARGIN * 4);
  text.setScrollFactor(0, 0);
  text.setVisible(false);
  text.setLineSpacing(MENU_BOX_FONT_LINE_SPACING_SMALL);

  return text;
};

export const controlDialog = (
  dialog: Dialog,
  isActionButtonJustPressed: boolean
): void => {
  if (!dialog.isDialogBusy() && isActionButtonJustPressed) {
    dialog.showNextMessageOrHideDialogBox();
    return;
  }

  //dialog.showDialogBox();
};
