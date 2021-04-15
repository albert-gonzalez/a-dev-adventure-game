import { createDialogBox, Dialog } from "../../../menus/dialog";
import { MENU_BOX_MARGIN } from "../../../menus/style";

const MENU_BOX_HEIGHT = 150;

export const createMapDialogBox = (scene: Phaser.Scene): Dialog => {
  return createDialogBox(scene, {
    x: MENU_BOX_MARGIN,
    y: scene.cameras.main.height - MENU_BOX_HEIGHT - MENU_BOX_MARGIN,
    width: scene.cameras.main.width - MENU_BOX_MARGIN * 2,
    height: MENU_BOX_HEIGHT,
  });
};
