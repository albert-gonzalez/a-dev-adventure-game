import { GameState } from "../state/state";
import { createMenuText } from "../menus/texts";
import { MENU_DEPTH } from "../scenes/common/constants";

const BUTTON_LINE_WIDTH = 2;
const BUTTON_LINE_COLOR = 0x555555;
const BUTTON_SIZE = 80;
const BUTTON_RADIUS = 10;
const BUTTON_COLOR = 0x777777;
const BUTTON_FONT_SIZE = "30px";
const BUTTON_ALPHA = 0.15;
const BUTTON_MARGIN = 10;
const POINTER_UP_DELAY = 100;

export const createTouchButtons = (
  scene: Phaser.Scene,
  state: GameState,
  withMenuButton = true
): void => {
  if (withMenuButton) {
    createButton(
      scene,
      scene.cameras.main.width - (BUTTON_SIZE * 3 + BUTTON_MARGIN * 3),
      BUTTON_MARGIN,
      "M",
      (pointer) => (state.input.touch.menu = pointer.isDown),
      () => (state.input.touch.menu = false)
    );
  }

  createButton(
    scene,
    scene.cameras.main.width - (BUTTON_SIZE * 2 + BUTTON_MARGIN * 2),
    BUTTON_MARGIN,
    "S",
    (pointer) => (state.input.touch.toggleSound = pointer.isDown),
    () => (state.input.touch.toggleSound = false)
  );

  createButton(
    scene,
    scene.cameras.main.width - (BUTTON_SIZE + BUTTON_MARGIN),
    BUTTON_MARGIN,
    "F",
    (pointer) => (state.input.touch.toggleFullScreen = pointer.isDown),
    () => (state.input.touch.toggleFullScreen = false)
  );

  if (scene.game.device.os.desktop) {
    return;
  }

  createButton(
    scene,
    scene.cameras.main.width - (BUTTON_MARGIN + BUTTON_SIZE + BUTTON_SIZE / 2),
    scene.cameras.main.height - (BUTTON_MARGIN + BUTTON_SIZE + BUTTON_SIZE / 2),
    "A",
    (pointer) => (state.input.touch.action = pointer.isDown),
    () => (state.input.touch.action = false)
  );

  createButton(
    scene,
    BUTTON_MARGIN,
    scene.cameras.main.height - (BUTTON_MARGIN + BUTTON_SIZE + BUTTON_SIZE / 2),
    "←",
    (pointer) => (state.input.touch.left = pointer.isDown),
    () => (state.input.touch.left = false)
  );

  createButton(
    scene,
    BUTTON_MARGIN * 3 + BUTTON_SIZE * 2,
    scene.cameras.main.height - (BUTTON_MARGIN + BUTTON_SIZE + BUTTON_SIZE / 2),
    "→",
    (pointer) => (state.input.touch.right = pointer.isDown),
    () => (state.input.touch.right = false)
  );

  createButton(
    scene,
    BUTTON_MARGIN * 2 + BUTTON_SIZE,
    scene.cameras.main.height - (BUTTON_SIZE + BUTTON_MARGIN),
    "↓",
    (pointer) => (state.input.touch.down = pointer.isDown),
    () => (state.input.touch.down = false)
  );

  createButton(
    scene,
    BUTTON_MARGIN * 2 + BUTTON_SIZE,
    scene.cameras.main.height - (BUTTON_MARGIN * 2 + BUTTON_SIZE * 2),
    "↑",
    (pointer) => (state.input.touch.up = pointer.isDown),
    () => (state.input.touch.up = false)
  );
};

const createButton = (
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
  downCallback: (pointer: Phaser.Input.Pointer) => void,
  upCallback: () => void
) => {
  const button = scene.add.container(x, y);
  button.setScrollFactor(0, 0);
  button.depth = MENU_DEPTH;
  button.alpha = BUTTON_ALPHA;

  const graphics = scene.add.graphics();
  graphics.lineStyle(BUTTON_LINE_WIDTH, BUTTON_LINE_COLOR);
  const rectangle = graphics.strokeRoundedRect(
    0,
    0,
    BUTTON_SIZE,
    BUTTON_SIZE,
    BUTTON_RADIUS
  );

  graphics.fillStyle(BUTTON_COLOR, 1);
  rectangle.fillRoundedRect(0, 0, BUTTON_SIZE, BUTTON_SIZE, BUTTON_RADIUS);

  const textElement = createMenuText({
    scene,
    x: BUTTON_SIZE / 2 + 2,
    y: BUTTON_SIZE / 2 + 2,
    text,
    visible: true,
    fontSize: BUTTON_FONT_SIZE,
  });

  textElement.setOrigin(0.5, 0.5);

  button.add([rectangle, textElement]);

  button.setInteractive(
    new Phaser.Geom.Rectangle(0, 0, BUTTON_SIZE, BUTTON_SIZE),
    Phaser.Geom.Rectangle.Contains
  );
  button.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
    pointerDown(pointer, button, downCallback);
  });
  button.on("pointerover", (pointer: Phaser.Input.Pointer) => {
    pointerDown(pointer, button, downCallback);
  });
  button.on("pointerup", () =>
    delayedPointerUp(scene, () => pointerUp(button, upCallback))
  );
  button.on("pointerout", () => pointerUp(button, upCallback));
};

const pointerDown = (
  pointer: Phaser.Input.Pointer,
  button: Phaser.GameObjects.Container,
  callback: (pointer: Phaser.Input.Pointer) => void
) => {
  if (pointer.isDown) {
    button.alpha = 0.5;
  }
  callback(pointer);
};

const pointerUp = (
  button: Phaser.GameObjects.Container,
  callback: () => void
) => {
  button.alpha = BUTTON_ALPHA;
  callback();
};

export const delayedPointerUp = (scene: Phaser.Scene, callback: () => void) => {
  scene.time.delayedCall(POINTER_UP_DELAY, callback);
};
