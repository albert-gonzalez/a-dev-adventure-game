import "phaser";
import {
  DOWN,
  DOWN_DIRECTION,
  LEFT,
  LEFT_DIRECTION,
  RIGHT,
  RIGHT_DIRECTION,
  UP,
  UP_DIRECTION,
} from "../../../input/input";
import { SceneAction } from "../../../scenes/common/map/actions";

export const ANIMATION_STILL_LEFT = `still-${LEFT}`;
export const ANIMATION_STILL_RIGHT = `still-${RIGHT}`;
export const ANIMATION_STILL_UP = `still-${UP}`;
export const ANIMATION_STILL_DOWN = `still-${DOWN}`;

const ANIMATION_LEFT = LEFT;
const ANIMATION_RIGHT = RIGHT;
const ANIMATION_UP = UP;
const ANIMATION_DOWN = DOWN;

const FRAMERATE = 8;
const NO_REPEAT = 0;
const REPEAT_INFINITELY = -1;

const TRANSITION_TO_STILL: { [key: string]: string } = {
  left: ANIMATION_STILL_LEFT,
  right: ANIMATION_STILL_RIGHT,
  up: ANIMATION_STILL_UP,
  down: ANIMATION_STILL_DOWN,
};

const TRANSITION_TO_MOVE_X: { [key: number]: string } = {
  [LEFT_DIRECTION]: ANIMATION_LEFT,
  [RIGHT_DIRECTION]: ANIMATION_RIGHT,
};

const TRANSITION_TO_MOVE_Y: { [key: number]: string } = {
  [UP_DIRECTION]: ANIMATION_UP,
  [DOWN_DIRECTION]: ANIMATION_DOWN,
};

export const createCharacterAnimations = (
  scene: Phaser.Scene,
  characterKey: string,
  animationPrefix = ""
) => {
  scene.anims.create({
    key: `${animationPrefix}${ANIMATION_LEFT}`,
    frames: scene.anims.generateFrameNumbers(characterKey, {
      frames: [3, 4, 5, 4],
    }),
    frameRate: FRAMERATE,
    repeat: REPEAT_INFINITELY,
  });

  scene.anims.create({
    key: `${animationPrefix}${ANIMATION_STILL_LEFT}`,
    frames: scene.anims.generateFrameNumbers(characterKey, {
      frames: [4],
    }),
    repeat: NO_REPEAT,
  });

  scene.anims.create({
    key: `${animationPrefix}${ANIMATION_DOWN}`,
    frames: scene.anims.generateFrameNumbers(characterKey, {
      frames: [0, 1, 2, 1],
    }),
    frameRate: FRAMERATE,
    repeat: REPEAT_INFINITELY,
  });

  scene.anims.create({
    key: `${animationPrefix}${ANIMATION_STILL_DOWN}`,
    frames: scene.anims.generateFrameNumbers(characterKey, {
      frames: [1],
    }),
    repeat: NO_REPEAT,
  });

  scene.anims.create({
    key: `${animationPrefix}${ANIMATION_UP}`,
    frames: scene.anims.generateFrameNumbers(characterKey, {
      frames: [9, 10, 11, 10],
    }),
    frameRate: FRAMERATE,
    repeat: REPEAT_INFINITELY,
  });

  scene.anims.create({
    key: `${animationPrefix}${ANIMATION_STILL_UP}`,
    frames: scene.anims.generateFrameNumbers(characterKey, {
      frames: [10],
    }),
    repeat: NO_REPEAT,
  });

  scene.anims.create({
    key: `${animationPrefix}${ANIMATION_RIGHT}`,
    frames: scene.anims.generateFrameNumbers(characterKey, {
      frames: [6, 7, 8, 7],
    }),
    frameRate: FRAMERATE,
    repeat: REPEAT_INFINITELY,
  });

  scene.anims.create({
    key: `${animationPrefix}${ANIMATION_STILL_RIGHT}`,
    frames: scene.anims.generateFrameNumbers(characterKey, {
      frames: [7],
    }),
    repeat: NO_REPEAT,
  });
};

export const updateAnimation = (
  character: Phaser.GameObjects.Sprite,
  directionX: number,
  directionY: number,
  animationPrefix = "",
  forceStill = false
) => {
  let animToPlay;

  if (!directionY && !directionX) {
    const transition =
      TRANSITION_TO_STILL[
        character.anims.currentAnim.key.replace(animationPrefix, "")
      ];

    if (transition) {
      character.anims.play(`${animationPrefix}${transition}`, true);
    }
  }

  if (directionY) {
    let transition = TRANSITION_TO_MOVE_Y[directionY];
    if (forceStill) {
      transition = TRANSITION_TO_STILL[transition];
    }
    animToPlay = `${animationPrefix}${transition}`;
  } else if (directionX) {
    let transition = TRANSITION_TO_MOVE_X[directionX];
    if (forceStill) {
      transition = TRANSITION_TO_STILL[transition];
    }
    animToPlay = `${animationPrefix}${transition}`;
  }

  if (animToPlay) {
    character.anims.play(animToPlay, true);
  }
};

export const objectActivationDirectionMatchesAnimation = (
  albert: Phaser.GameObjects.Sprite,
  sceneAction: SceneAction
) => {
  return sceneAction.activationDirections?.some((direction) =>
    albert.anims.currentAnim.key.includes(direction)
  );
};
