import { getText } from "../../i18n/i18n";

import { BACKSPACE_PRESS_EFFECT, KEY_PRESS_EFFECT } from "./audio";
import { FONT_FAMILY } from "../common/constants";

const TITLE_FONT_FAMILY = FONT_FAMILY;
const TITLE_LINE_SPACING = 10;
const TITLE_FONT_SIZE = "44px";
const TITLE_X = 200;
const TITLE_Y = 200;
const TITLE_TOP_PADDING = 10;
const HELP_FONT_SIZE = "16px";
const HELP_X = 400;
const HELP_Y = 500;
const START_DELAY = 500;
const TIME_BETWEEN_KEYSTROKES = 200;
const TIME_BETWEEN_DELETIONS = 150;
const BLINK_TIME = 2000;

export const addTitleText = (scene: Phaser.Scene) => {
  const titleText = scene.add.text(TITLE_X, TITLE_Y, "", {
    fontFamily: TITLE_FONT_FAMILY,
    fontSize: TITLE_FONT_SIZE,
    lineSpacing: TITLE_LINE_SPACING,
  });

  titleText.setPadding(0, TITLE_TOP_PADDING, 0, 0);

  return titleText;
};
export const writeText = (
  titleText: Phaser.GameObjects.Text,
  textToWrite: string,
  scene: Phaser.Scene
): Promise<void> => {
  return new Promise((resolve) => {
    scene.time.delayedCall(START_DELAY, () => {
      textToWrite.split("").forEach((char, i) => {
        scene.time.delayedCall(TIME_BETWEEN_KEYSTROKES * i, () => {
          titleText.setText(titleText.text + char);
          scene.sound.play(KEY_PRESS_EFFECT);

          if (i === textToWrite.length - 1) {
            resolve();
          }
        });
      });
    });
  });
};

export const deleteLetters = (
  titleText: Phaser.GameObjects.Text,
  letterCount: number,
  scene: Phaser.Scene
): Promise<void> => {
  return new Promise((resolve) => {
    scene.time.delayedCall(START_DELAY, () => {
      for (let i = 1; i <= letterCount; i++) {
        scene.time.delayedCall(TIME_BETWEEN_DELETIONS * i, () => {
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

export const addPressToStartText = (scene: Phaser.Scene) => {
  const startText = scene.add.text(HELP_X, HELP_Y, getText("pressToStart"), {
    fontFamily: TITLE_FONT_FAMILY,
    fontSize: HELP_FONT_SIZE,
  });

  startText.setOrigin(0.5);

  blinkText(startText, scene);
};

const blinkText = (text: Phaser.GameObjects.Text, scene: Phaser.Scene) => {
  scene.time.delayedCall(BLINK_TIME, () => {
    text.visible = !text.visible;
    blinkText(text, scene);
  });
};
