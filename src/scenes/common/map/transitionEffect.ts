import { FOREGROUND_DEPTH } from "../constants";

const DURATION = 500;

interface TransitionOptions {
  depth?: number;
  duration?: number;
  alpha?: number;
}

export interface Transition {
  isFinished: boolean;
  rectangle: Phaser.GameObjects.Graphics;
}

export const addFadeIn = (
  scene: Phaser.Scene,
  options: TransitionOptions = {}
): (() => Transition) => {
  let isFinished = false;

  const blackFadeIn = addBlackRectangle(scene, options);
  blackFadeIn.alpha = 0;

  scene.tweens.add({
    targets: blackFadeIn,
    alpha: options.alpha ?? 1,
    duration: options.duration || DURATION,
    onComplete: () => (isFinished = true),
  });

  return function getTransition() {
    return { isFinished, rectangle: blackFadeIn };
  };
};

export const addFadeOut = (
  scene: Phaser.Scene,
  rectangle?: Phaser.GameObjects.Graphics,
  options: TransitionOptions = {}
): (() => Transition) => {
  let isFinished = false;

  const blackFadeOut = rectangle || addBlackRectangle(scene, options);
  const alpha = options.alpha ?? 0;

  scene.tweens.add({
    targets: blackFadeOut,
    alpha,
    duration: options.duration || DURATION,
    onComplete: () => {
      isFinished = true;
      if (alpha === 0) {
        blackFadeOut.destroy();
      }
    },
  });

  return function continueFadeOut() {
    return { isFinished, rectangle: blackFadeOut };
  };
};

export const addBlackRectangle = (
  scene: Phaser.Scene,
  options: TransitionOptions = {}
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
  blackFadeOut.depth = options.depth || FOREGROUND_DEPTH;

  return blackFadeOut;
};
