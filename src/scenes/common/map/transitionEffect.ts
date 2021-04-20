import { FOREGROUND_DEPTH } from "../constants";

const FINISH_DELAY = 500;

export const addFadeIn = (scene: Phaser.Scene): (() => boolean) => {
  let finished = false;

  const blackFadeIn = addBlackRectangle(scene);
  blackFadeIn.alpha = 0;

  scene.tweens.add({
    targets: blackFadeIn,
    alpha: 1,
    duration: FINISH_DELAY,
    onComplete: () => (finished = true),
  });

  return function continueFadeIn() {
    return finished;
  };
};

export const addFadeOut = (
  scene: Phaser.Scene,
  rectangle?: Phaser.GameObjects.Graphics
): (() => boolean) => {
  let finished = false;

  const blackFadeOut = rectangle || addBlackRectangle(scene);

  scene.tweens.add({
    targets: blackFadeOut,
    alpha: 0,
    duration: FINISH_DELAY,
    onComplete: () => {
      finished = true;
      blackFadeOut.destroy();
    },
  });

  return function continueFadeOut() {
    return finished;
  };
};

export const addBlackRectangle = (
  scene: Phaser.Scene
): Phaser.GameObjects.Graphics => {
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
