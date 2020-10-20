import { getState } from "../../state/state";
import { delayedPointerUp } from "../../input/touchInput";
import { TITLE_BACKGROUND } from "./images";

const BACKGROUND_COLOR = 0x2b2b2b;
const BACKGROUND_BLACK_COLOR = 0;
const BACKGROUND_ALPHA = 1;

export const addBackground = (scene: Phaser.Scene) => {
  const graphics = scene.add.graphics();
  scene.cameras.main.roundPixels = true;

  graphics.fillGradientStyle(
    BACKGROUND_COLOR,
    BACKGROUND_COLOR,
    BACKGROUND_BLACK_COLOR,
    BACKGROUND_BLACK_COLOR,
    BACKGROUND_ALPHA
  );

  const background = scene.add.sprite(0, 0, TITLE_BACKGROUND);
  background.setOrigin(0, 0);
  background.setScrollFactor(0, 0);
  background.setInteractive(
    new Phaser.Geom.Rectangle(0, 0, background.width, background.height),
    Phaser.Geom.Rectangle.Contains
  );
  background.on("pointerdown", () => (getState().input.touch.action = true));
  background.on("pointerup", () =>
    delayedPointerUp(scene, () => (getState().input.touch.action = false))
  );

  return background;
};
