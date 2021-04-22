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
  fontSize?: string;
  color?: string;
  padding?: Phaser.Types.GameObjects.Text.TextPadding;
  origin?: { x: number; y: number };
  lineSpacing?: number;
  alpha?: number;
  align?: string;
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
  padding = {},
  origin = { x: 0, y: 0 },
  lineSpacing,
  alpha = 1,
  align = "left",
}: MenuTextOptions): Phaser.GameObjects.Text => {
  const textObject = scene.add.text(x, y, "", {
    fontFamily: MENU_BOX_FONT_FAMILY,
    fontSize,
    color,
    padding,
  });

  if (width) {
    textObject.setWordWrapWidth(width);
  }
  textObject.setText(textKey ? getText(textKey) : text);
  textObject.setScrollFactor(0, 0);
  textObject.setShadow(2, 1, "#000");
  textObject.setVisible(visible);
  textObject.setDepth(MENU_DEPTH);
  textObject.setLineSpacing(lineSpacing ?? MENU_BOX_FONT_LINE_SPACING);
  textObject.setOrigin(origin.x, origin.y);
  textObject.setAlpha(alpha);
  textObject.setAlign(align);

  return textObject;
};
