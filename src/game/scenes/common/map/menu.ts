import { MenuConfig, MenuOptionConfig } from "../../../menus/menu";
import {
  createAboutPage,
  createExperiencePage,
  createItemsPage,
  createProjectsPage,
  createSkillsPage,
} from "../../../menus/pages";
import {
  MENU_BOX_MARGIN,
  MENU_VERTICAL_SEPARATOR_X,
} from "../../../menus/style";

export const getMenuConfig = (scene: Phaser.Scene): MenuConfig => ({
  optionsConfig: menuOptionsConfig,
  x: MENU_BOX_MARGIN,
  y: MENU_BOX_MARGIN,
  separatorX: MENU_VERTICAL_SEPARATOR_X,
  width: scene.cameras.main.width - MENU_BOX_MARGIN * 2,
  height: scene.cameras.main.height - MENU_BOX_MARGIN * 2,
});

const menuOptionsConfig: MenuOptionConfig[] = [
  {
    textKey: "about",
    pageCreationFunction: createAboutPage,
  },
  {
    textKey: "skills",
    pageCreationFunction: createSkillsPage,
  },
  {
    textKey: "experience",
    pageCreationFunction: createExperiencePage,
  },
  {
    textKey: "projects",
    pageCreationFunction: createProjectsPage,
  },
  {
    textKey: "items",
    pageCreationFunction: createItemsPage,
  },
];
