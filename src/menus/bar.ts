import { MENU_BOX_LINE_WIDTH } from "./style";
import { createMenuText } from "./texts";

interface BarOptions {
  scene: Phaser.Scene;
  textKey?: string;
  text?: string;
  x: number;
  y: number;
  percentage: number;
}

export const createBar = ({
  scene,
  textKey,
  text,
  x,
  y,
  percentage,
}: BarOptions) => {
  const container = scene.add.container(x, y);
  const graphics = scene.add.graphics();
  const maxWidth = 150;

  graphics.lineStyle(14, chooseBarColor(percentage));
  const percentLine = graphics.lineBetween(
    10,
    38,
    (percentage / 100) * maxWidth + 10,
    38
  );
  graphics.stroke();
  graphics.lineStyle(MENU_BOX_LINE_WIDTH, 0xffffff);
  const box = graphics.strokeRoundedRect(10, 30, 150, 15, 2);

  container.add([
    createMenuText({
      scene,
      textKey,
      text,
      x: 0,
      y: 0,
      visible: true,
    }),
    percentLine,
    box,
  ]);

  return container;
};

const chooseBarColor = (percentage: number) => {
  const colors = {
    80: 0x00ff00,
    50: 0xe8e533,
    20: 0xebb134,
    0: 0xff0000,
  };
  const barColor = Object.entries(colors)
    .reverse()
    .find((entry) => parseInt(entry[0], 10) <= percentage);

  if (!barColor) {
    throw Error("Incorrect percentage");
  }

  return barColor[1];
};
