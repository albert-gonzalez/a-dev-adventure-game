import "phaser";
import { GameState } from "../state/state";

interface CharacterDirections {
  directionX: number;
  directionY: number;
}

export const LEFT = "left";
export const RIGHT = "right";
export const UP = "up";
export const DOWN = "down";

export const UP_DIRECTION = -1;
export const DOWN_DIRECTION = 1;

export const LEFT_DIRECTION = -1;
export const RIGHT_DIRECTION = 1;

export const NO_DIRECTION = 0;

export const MOVEMENT_SPEED = 200;
export const MOVEMENT_SPEED_SLOW = 150;

export const getCharacterDirections = (
  scene: Phaser.Scene,
  state: GameState
): CharacterDirections => {
  const cursors = scene.input.keyboard.createCursorKeys();
  let directionX, directionY;

  if (isLeftButtonPressed(cursors, state)) {
    directionX = LEFT_DIRECTION;
  } else if (isRightButtonPressed(cursors, state)) {
    directionX = RIGHT_DIRECTION;
  } else {
    directionX = NO_DIRECTION;
  }

  if (isUpButtonPressed(cursors, state)) {
    directionY = UP_DIRECTION;
  } else if (isDownButtonPressed(cursors, state)) {
    directionY = DOWN_DIRECTION;
  } else {
    directionY = NO_DIRECTION;
  }

  return {
    directionY,
    directionX,
  };
};

export const isUpButtonPressed = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys,
  state: GameState
): boolean => cursors.up?.isDown || state.input.touch.up;

export const isDownButtonPressed = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys,
  state: GameState
): boolean => cursors.down?.isDown || state.input.touch.down;

export const isLeftButtonPressed = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys,
  state: GameState
): boolean => cursors.left?.isDown || state.input.touch.left;

export const isRightButtonPressed = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys,
  state: GameState
): boolean => cursors.right?.isDown || state.input.touch.right;

export const isActionButtonJustPressed = (
  scene: Phaser.Scene,
  state: GameState
): boolean => {
  const isPressed =
    Phaser.Input.Keyboard.JustDown(
      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    ) || state.input.touch.action;

  state.input.touch.action = false;

  return isPressed;
};

export const isActionButtonDown = (
  scene: Phaser.Scene,
  state: GameState
): boolean => {
  return (
    scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown ||
    state.input.touch.action
  );
};

export const isUpButtonJustPressed = (
  scene: Phaser.Scene,
  state: GameState
): boolean => {
  const isPressed =
    Phaser.Input.Keyboard.JustDown(
      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    ) || state.input.touch.up;

  state.input.touch.up = false;

  return isPressed;
};

export const isDownButtonJustPressed = (
  scene: Phaser.Scene,
  state: GameState
): boolean => {
  const isPressed =
    Phaser.Input.Keyboard.JustDown(
      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    ) || state.input.touch.down;

  state.input.touch.down = false;

  return isPressed;
};

export const isMenuButtonJustPressed = (
  scene: Phaser.Scene,
  state: GameState
): boolean => {
  const isPressed =
    Phaser.Input.Keyboard.JustDown(
      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    ) || state.input.touch.menu;

  state.input.touch.menu = false;

  return isPressed;
};

export const isToggleSoundButtonJustPressed = (
  scene: Phaser.Scene,
  state: GameState
): boolean => {
  const isPressed =
    Phaser.Input.Keyboard.JustDown(
      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    ) || state.input.touch.toggleSound;

  state.input.touch.toggleSound = false;

  return isPressed;
};

export const isToggleFullScreenButtonJustPressed = (
  scene: Phaser.Scene,
  state: GameState
): boolean => {
  const isPressed =
    Phaser.Input.Keyboard.JustDown(
      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
    ) || state.input.touch.toggleFullScreen;

  state.input.touch.toggleFullScreen = false;

  return isPressed;
};

export const updateCharacterVelocity = (
  character: Phaser.GameObjects.Sprite,
  directionX: number,
  directionY: number,
  movementSpeed = MOVEMENT_SPEED
): void => {
  (character.body as Phaser.Physics.Arcade.Body).setVelocity(
    movementSpeed * directionX,
    movementSpeed * directionY
  );
};
