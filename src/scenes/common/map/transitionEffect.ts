import { FOREGROUND_DEPTH } from "../constants";

const FINISH_DELAY = 500;

export const addFadeIn = (scene: Phaser.Scene) => {
  let finished = false;
  let timerEvent: Phaser.Time.TimerEvent;

  const blackFadeIn = addBlackRectangle(scene);
  blackFadeIn.alpha = 0;

  return function continueFadeIn() {
    if (blackFadeIn.alpha < 1) {
      blackFadeIn.alpha += 0.02;

      return false;
    }

    if (!timerEvent) {
      timerEvent = scene.time.delayedCall(
        FINISH_DELAY,
        () => (finished = true)
      );
    }

    return finished;
  };
};

export const addFadeOut = (scene: Phaser.Scene) => {
  let finished = false;
  let timerEvent: Phaser.Time.TimerEvent;

  const blackFadeOut = addBlackRectangle(scene);

  return function continueFadeOut() {
    if (blackFadeOut.alpha > 0) {
      blackFadeOut.alpha -= 0.02;

      return false;
    }

    if (!timerEvent) {
      timerEvent = scene.time.delayedCall(FINISH_DELAY, () => {
        finished = true;
        blackFadeOut.destroy(true);
      });
    }

    return finished;
  };
};

const addBlackRectangle = (scene: Phaser.Scene) => {
  const graphics = scene.add.graphics();
  graphics.fillStyle(0);
  const blackFadeOut = graphics.fillRect(
    0,
    0,
    scene.cameras.main.width,
    scene.cameras.main.height
  );

  blackFadeOut.setScrollFactor(0, 0);
  blackFadeOut.depth = FOREGROUND_DEPTH;

  return blackFadeOut;
};
