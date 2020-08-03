import "phaser";

export const LEFT = "left";
export const RIGHT = "right";
export const UP = "up";
export const DOWN = "down";

export const UP_DIRECTION = -1;
export const DOWN_DIRECTION = 1;

export const LEFT_DIRECTION = -1;
export const RIGHT_DIRECTION = 1;

export const NO_DIRECTION = 0;

const MOVEMENT_SPEED = 200;
export const MOVEMENT_SPEED_SLOW = 150;

export const getCharacterDirections = (scene: Phaser.Scene) => {
  const cursors = scene.input.keyboard.createCursorKeys();
  let directionX, directionY;

  if (cursors.left?.isDown) {
    directionX = LEFT_DIRECTION;
  } else if (cursors.right?.isDown) {
    directionX = RIGHT_DIRECTION;
  } else {
    directionX = NO_DIRECTION;
  }

  if (cursors.up?.isDown) {
    directionY = UP_DIRECTION;
  } else if (cursors.down?.isDown) {
    directionY = DOWN_DIRECTION;
  } else {
    directionY = NO_DIRECTION;
  }

  return {
    directionY,
    directionX,
  };
};

export const isActionButtonPressed = (scene: Phaser.Scene) =>
  Phaser.Input.Keyboard.JustDown(
    scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  );

export const isUpButtonPressed = (scene: Phaser.Scene) =>
  Phaser.Input.Keyboard.JustDown(
    scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
  );

export const isDownButtonPressed = (scene: Phaser.Scene) =>
  Phaser.Input.Keyboard.JustDown(
    scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
  );

export const isDownEscapePressed = (scene: Phaser.Scene) =>
  Phaser.Input.Keyboard.JustDown(
    scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
  );

export const updateCharacterVelocity = (
  albert: Phaser.GameObjects.Sprite,
  directionX: number,
  directionY: number,
  movementSpeed = MOVEMENT_SPEED
) =>
  (albert.body as Phaser.Physics.Arcade.Body).setVelocity(
    movementSpeed * directionX,
    movementSpeed * directionY
  );
