import "phaser";

const ANIMATION_STILL = "still";
const ANIMATION_ATTACK = "attack";

const FRAMERATE = 8;
const NO_REPEAT = 0;
const REPEAT_INFINITELY = -1;

export const createEnemyAnimations = (
  scene: Phaser.Scene,
  characterKey: string
): void => {
  scene.anims.create({
    key: ANIMATION_STILL,
    frames: scene.anims.generateFrameNumbers(characterKey, {
      frames: [
        0,
        0,
        0,
        1,
        2,
        2,
        1,
        0,
        0,
        0,
        0,
        3,
        3,
        3,
        3,
        0,
        0,
        0,
        0,
        0,
        4,
        4,
        4,
        0,
        0,
      ],
    }),
    frameRate: FRAMERATE,
    repeat: REPEAT_INFINITELY,
  });

  scene.anims.create({
    key: ANIMATION_ATTACK,
    frames: scene.anims.generateFrameNames(characterKey, {
      frames: [0, 5, 5, 0],
    }),
    frameRate: FRAMERATE,
    repeat: NO_REPEAT,
  });
};

export const playStill = (sprite: Phaser.GameObjects.Sprite): void => {
  sprite.play(ANIMATION_STILL);
};

export const playAttack = (sprite: Phaser.GameObjects.Sprite): void => {
  sprite.play(ANIMATION_ATTACK);
};
