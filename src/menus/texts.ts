import {
  MENU_BOX_FONT_FAMILY,
  MENU_BOX_FONT_LINE_SPACING,
  MENU_BOX_FONT_SIZE_L,
} from "./style";
import { getText } from "../i18n/i18n";
import { MENU_DEPTH } from "../scenes/common/constants";

interface MenuTextOptions {
  scene: Phaser.Scene;
  textKey?: string;
  text?: string;
  x: number;
  y: number;
  visible?: boolean;
  width?: number;
  fontSize?: number;
  color?: string;
}

export const createMenuText = ({
  scene,
  textKey,
  text = "",
  x,
  y,
  visible = false,
  width,
  fontSize = MENU_BOX_FONT_SIZE_L,
  color = "#ffffff",
}: MenuTextOptions) => {
  const textObject = scene.add.text(x, y, "", {
    fontFamily: MENU_BOX_FONT_FAMILY,
    fontSize,
    lineSpacing: MENU_BOX_FONT_LINE_SPACING,
    color,
  });

  if (width) {
    textObject.setWordWrapWidth(width);
  }
  textObject.setText(textKey ? getText(textKey) : text);
  textObject.setScrollFactor(0, 0);
  textObject.setShadow(1, 1, "#000");
  textObject.setVisible(visible);
  textObject.setDepth(MENU_DEPTH);

  return textObject;
};
