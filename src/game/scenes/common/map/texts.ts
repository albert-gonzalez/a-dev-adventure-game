import { isActionButtonDown } from "../../../input/input";
import { getState } from "../../../state/state";
import { KEY_PRESS_EFFECT } from "../audio";

export const START_DELAY = 500;
const TIME_BETWEEN_KEYSTROKES = 200;

export const writeText = (
  titleText: Phaser.GameObjects.Text,
  textToWrite: string,
  scene: Phaser.Scene,
  canBeInterrupted = false,
  speed = TIME_BETWEEN_KEYSTROKES,
  withAudio = true
): Promise<void> => {
  return new Promise((resolve, reject) => {
    let interrupted = false;
    scene.time.delayedCall(START_DELAY, () => {
      textToWrite.split("").forEach((char, i) => {
        scene.time.delayedCall(speed * i, () => {
          if (interrupted) {
            return;
          }

          if (canBeInterrupted && isActionButtonDown(scene, getState())) {
            interrupted = true;
            reject();

            return;
          }

          titleText.setText(titleText.text + char);
          withAudio && scene.sound.play(KEY_PRESS_EFFECT);

          if (i === textToWrite.length - 1) {
            resolve();
          }
        });
      });
    });
  });
};
