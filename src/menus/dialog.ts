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
import { MENU_DEPTH } from "../scenes/common/map/constants";
import { getText } from "../i18n/i18n";

const MENU_BOX_MARGIN = 20;
const MENU_BOX_HEIGHT = 150;

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

export const createDialogBox = (scene: Phaser.Scene): Dialog => {
  const dialogBox = createDialogBoxRectangle(scene);
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

      if (dialogBox.scaleY < 1) {
        dialogBox.scaleY = Math.min(dialogBox.scaleY + 0.08, 1);
        dialogBusy = true;
      } else {
        text.setVisible(true);
        dialogBusy = false;
      }
    },

    showNextMessageOrHideDialogBox() {
      dialogBusy = true;
      setTimeout(() => (dialogBusy = false), 100);
      scene.sound.play("select");

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

  return str + getText(text.text);
};

const createDialogBoxRectangle = (scene: Phaser.Scene) => {
  const graphics = scene.add.graphics();
  const width = scene.cameras.main.width - MENU_BOX_MARGIN * 2;
  graphics.fillGradientStyle(
    MENU_BOX_FILL_COLOR_TOP,
    MENU_BOX_FILL_COLOR_TOP,
    MENU_BOX_FILL_COLOR_BOTTOM,
    MENU_BOX_FILL_COLOR_BOTTOM,
    MENU_BOX_FILL_ALPHA
  );

  graphics.fillRect(0, 0, width, MENU_BOX_HEIGHT);

  graphics.lineStyle(
    MENU_BOX_LINE_WIDTH,
    MENU_BOX_LINE_COLOR,
    MENU_BOX_LINE_ALPHA
  );

  const dialogBox = graphics.strokeRoundedRect(0, 0, width, MENU_BOX_HEIGHT, 4);

  dialogBox.setScrollFactor(0, 0);

  dialogBox.visible = false;
  dialogBox.scaleY = 0;
  dialogBox.x = MENU_BOX_MARGIN;
  dialogBox.y = scene.cameras.main.height - MENU_BOX_HEIGHT - MENU_BOX_MARGIN;

  return dialogBox;
};

const createDialogBoxText = (
  scene: Phaser.Scene,
  dialogBox: Phaser.GameObjects.Graphics
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
) => {
  if (!dialog.isDialogBusy() && isActionButtonJustPressed) {
    dialog.showNextMessageOrHideDialogBox();
    return;
  }

  dialog.showDialogBox();
};
