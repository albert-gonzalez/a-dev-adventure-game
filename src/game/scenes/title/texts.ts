import { getText } from "../../i18n/i18n";

import { BACKSPACE_PRESS_EFFECT } from "./audio";
import { FONT_FAMILY } from "../common/constants";
import { START_DELAY } from "../common/map/texts";
import { isActionButtonDown } from "../../input/input";
import { getState } from "../../state/state";

const TITLE_FONT_FAMILY = FONT_FAMILY;
const TITLE_LINE_SPACING = 10;
const TITLE_FONT_SIZE = "44px";
const TITLE_X = 210;
const TITLE_Y = 150;
const TITLE_TOP_PADDING = 10;
const HELP_FONT_SIZE = "16px";
const HELP_X = 400;
const HELP_Y = 340;
const TIME_BETWEEN_DELETIONS = 150;
const BLINK_TIME = 2000;
const KEYBOARD_CONTROLS_TEXT_X = 40;
const CONTROLS_TITLE_TEXT_Y = 420;
const CONTROLS_TEXT_Y = CONTROLS_TITLE_TEXT_Y + 30;
const CONTROLS_FONT_SIZE = "14px";
const CONTROLS_LINE_SPACING = 14;

export const addTitleText = (scene: Phaser.Scene): Phaser.GameObjects.Text => {
  const titleText = scene.add.text(TITLE_X, TITLE_Y, "", {
    fontFamily: TITLE_FONT_FAMILY,
    fontSize: TITLE_FONT_SIZE,
  });

  titleText.setPadding(0, TITLE_TOP_PADDING, 0, 0);
  titleText.setLineSpacing(TITLE_LINE_SPACING);

  return titleText;
};

export const deleteLetters = (
  titleText: Phaser.GameObjects.Text,
  letterCount: number,
  scene: Phaser.Scene,
  canBeInterrupted = false
): Promise<void> => {
  return new Promise((resolve, reject) => {
    let interrupted = false;

    scene.time.delayedCall(START_DELAY, () => {
      for (let i = 1; i <= letterCount; i++) {
        scene.time.delayedCall(TIME_BETWEEN_DELETIONS * i, () => {
          if (interrupted) {
            return;
          }

          if (canBeInterrupted && isActionButtonDown(scene, getState())) {
            interrupted = true;
            reject();
          }

          titleText.setText(
            titleText.text.substr(0, titleText.text.length - 1)
          );
          scene.sound.play(BACKSPACE_PRESS_EFFECT);

          if (i === letterCount) {
            resolve();
          }
        });
      }
    });
  });
};

export const addPressToStartText = (scene: Phaser.Scene): void => {
  const startText = scene.add.text(HELP_X, HELP_Y, getText("pressToStart"), {
    fontFamily: TITLE_FONT_FAMILY,
    fontSize: HELP_FONT_SIZE,
  });

  startText.setOrigin(0.5);

  blinkText(startText, scene);
};

export const addPControlsTexts = (scene: Phaser.Scene): void => {
  scene.add.text(
    KEYBOARD_CONTROLS_TEXT_X,
    CONTROLS_TITLE_TEXT_Y,
    getText("howToPlay"),
    {
      fontFamily: TITLE_FONT_FAMILY,
      fontSize: HELP_FONT_SIZE,
    }
  );

  const controls = scene.add.text(
    KEYBOARD_CONTROLS_TEXT_X,
    CONTROLS_TEXT_Y,
    getText("howToPlayControls"),
    {
      fontFamily: TITLE_FONT_FAMILY,
      fontSize: CONTROLS_FONT_SIZE,
    }
  );

  controls.setLineSpacing(CONTROLS_LINE_SPACING);
};

const blinkText = (text: Phaser.GameObjects.Text, scene: Phaser.Scene) => {
  scene.time.delayedCall(BLINK_TIME, () => {
    text.visible = !text.visible;
    blinkText(text, scene);
  });
};
