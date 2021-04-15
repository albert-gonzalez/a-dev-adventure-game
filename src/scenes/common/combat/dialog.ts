import { createDialogBox, Dialog } from "../../../menus/dialog";
import { MENU_BOX_MARGIN } from "../../../menus/style";

const MENU_BOX_HEIGHT = 100;
const MARGIN_TOP = 10;

export const createCombatDialogBox = (scene: Phaser.Scene): Dialog => {
  return createDialogBox(scene, {
    x: MENU_BOX_MARGIN,
    y: MARGIN_TOP,
    width: scene.cameras.main.width - MENU_BOX_MARGIN * 2,
    height: MENU_BOX_HEIGHT,
  });
};
