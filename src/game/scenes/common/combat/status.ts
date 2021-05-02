import { HP_UPDATED_EVENT } from "../../../characters/common/player";
import { createBar } from "../../../menus/bar";
import { createMenuBoxRectangle, MenuConfig } from "../../../menus/menu";
import { MENU_BOX_MARGIN } from "../../../menus/style";
import { getState } from "../../../state/state";
import { ALBERT_KEY } from "../map/characters";

export interface StatusMenu {
  show: () => void;
  updateHp: () => void;
}

const MENU_X = MENU_BOX_MARGIN;
const MENU_Y = 400;
const MENU_WIDTH = 190;

export const getStatusMenuConfig = (scene: Phaser.Scene): MenuConfig => ({
  x: MENU_X,
  y: MENU_Y,
  width: MENU_WIDTH,
  height: scene.cameras.main.height - MENU_Y - MENU_BOX_MARGIN,
});

export const createStatusMenu = (
  scene: Phaser.Scene,
  config: MenuConfig
): StatusMenu => {
  const menuBox = createMenuBoxRectangle(scene, config);
  let lifeBar = createHpBar(scene, menuBox, 1);
  let updatingHp = false;
  let animationPercentage = 0;

  menuBox.add(lifeBar);

  scene.events.addListener(HP_UPDATED_EVENT, () => {
    updatingHp = true;
    animationPercentage = 0;
  });

  return {
    show() {
      menuBox.setVisible(true);

      scene.tweens.add({
        targets: menuBox,
        duration: 300,
        scaleY: 1,
      });
    },
    updateHp() {
      if (updatingHp) {
        animationPercentage += 0.05;

        lifeBar = createHpBar(scene, menuBox, animationPercentage, lifeBar);

        if (animationPercentage >= 1) {
          updatingHp = false;
        }
      }
    },
  };
};

const createHpBar = (
  scene: Phaser.Scene,
  menuBox: Phaser.GameObjects.Container,
  animationPercentage: number,
  lifeBar?: Phaser.GameObjects.Container
) => {
  {
    const albertState = getState().albert;
    const hpPercentage =
      (albertState.previousHp / albertState.maxHp) * 100 +
      ((albertState.hp - albertState.previousHp) / albertState.maxHp) *
        100 *
        animationPercentage;

    if (lifeBar) {
      lifeBar.destroy();
    }
    lifeBar = createBar({
      scene,
      textKey: ALBERT_KEY,
      x: MENU_BOX_MARGIN / 2,
      y: MENU_BOX_MARGIN,
      percentage: hpPercentage,
    });

    menuBox.add(lifeBar);

    return lifeBar;
  }
};
