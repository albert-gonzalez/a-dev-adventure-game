import "phaser";

const ANIMATION_STILL = "still";
const ANIMATION_ATTACK = "attack";

const FRAMERATE = 8;
const NO_REPEAT = 0;
const REPEAT_INFINITELY = -1;

export const createEnemyAnimations = (
  scene: Phaser.Scene,
  characterKey: string
) => {
  scene.anims.create({
    key: ANIMATION_STILL,
    frames: scene.anims.generateFrameNumbers(characterKey, {
      frames: [0, 0, 0, 1, 2, 2, 1],
    }),
    frameRate: FRAMERATE,
    repeat: REPEAT_INFINITELY,
  });
};

export const playStill = (sprite: Phaser.GameObjects.Sprite) => {
  sprite.play(ANIMATION_STILL);
};
