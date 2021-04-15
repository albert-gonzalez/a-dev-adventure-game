import { MenuConfig, MenuOptionConfig } from "../../../menus/menu";
import {
  createActionOnlyPage,
  createItemsPage,
  createListPage,
  getCurrentItemIndexUpdatedEvent,
} from "../../../menus/pages";
import { MENU_BOX_MARGIN, MENU_PAGE_MARGIN_X } from "../../../menus/style";
import { createMenuText } from "../../../menus/texts";
import { createPageContainer } from "../../../menus/pages";
import { getState } from "../../../state/state";
import { COMBAT_SKILLS_UPDATED, decreaseSkillQuantity } from "./skills";
import { attackEnemy, setPendingAction } from "./system";

const MENU_X = 220;
const MENU_Y = 400;
const MENU_VERTICAL_SEPARATOR_X = 140;
const SKILLS_PAGE = "SKILLS_PAGE";

export const getMenuConfig = (scene: Phaser.Scene): MenuConfig => ({
  optionsConfig: menuOptionsConfig,
  x: MENU_X,
  y: MENU_Y,
  width: scene.cameras.main.width - MENU_X - MENU_BOX_MARGIN,
  height: scene.cameras.main.height - MENU_Y - MENU_BOX_MARGIN,
  separatorX: MENU_VERTICAL_SEPARATOR_X,
});

const createCodePage = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Container,
  config: MenuConfig
) => {
  const separatorX = config.separatorX || 0;
  const width = box.width - separatorX - MENU_PAGE_MARGIN_X;
  const container = createPageContainer(scene, box, config);

  container.add([
    createMenuText({
      scene,
      textKey: "codePageDescription",
      x: 0,
      y: 0,
      visible: true,
      width,
    }),
  ]);

  return createActionOnlyPage(container, () => setPendingAction(attackEnemy));
};

const createCombatSkillsPage = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Container,
  config: MenuConfig
) => {
  const container = createPageContainer(scene, box, config);

  return createListPage(
    container,
    config,
    () => getState().combat.skills,
    useSkill,
    getCurrentItemIndexUpdatedEvent(SKILLS_PAGE),
    COMBAT_SKILLS_UPDATED
  );
};

const useSkill = (currentOptionIndex: number): number => {
  const state = getState();

  const itemRemoved = decreaseSkillQuantity(
    state.combat.skills,
    currentOptionIndex,
    state.scene.phaser as Phaser.Scene
  );

  return itemRemoved &&
    (currentOptionIndex > 0 || state.combat.skills.length === 0)
    ? currentOptionIndex - 1
    : currentOptionIndex;
};

const menuOptionsConfig: MenuOptionConfig[] = [
  {
    textKey: "code",
    pageCreationFunction: createCodePage,
  },
  {
    textKey: "skills",
    pageCreationFunction: createCombatSkillsPage,
  },
  {
    textKey: "items",
    pageCreationFunction: (scene, container, config) =>
      createItemsPage(scene, container, config, true),
  },
];
