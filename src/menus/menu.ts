import "phaser";
import {
  MENU_BOX_FILL_ALPHA,
  MENU_BOX_FILL_COLOR_BOTTOM,
  MENU_BOX_FILL_COLOR_TOP,
  MENU_BOX_FONT_ACTIVATED_OPTION_COLOR,
  MENU_BOX_FONT_SELECTED_OPTION_COLOR,
  MENU_BOX_LINE_ALPHA,
  MENU_BOX_LINE_COLOR,
  MENU_BOX_LINE_WIDTH,
  MENU_BOX_MARGIN,
  MENU_PAGE_Y,
  MENU_VERTICAL_SEPARATOR_X,
  MENU_VERTICAL_SEPARATOR_Y,
} from "./style";

import { createMenuText } from "./texts";
import {
  isDownButtonJustPressed,
  isDownButtonPressed,
  isLeftButtonPressed,
  isRightButtonPressed,
  isUpButtonJustPressed,
  isUpButtonPressed,
} from "../input/input";
import { MENU_DEPTH } from "../scenes/common/constants";
import { GameState } from "../state/state";
import { MenuPage, PageType } from "./pages";

export interface Menu {
  show(): void;
  hide(): void;
  block(): void;
  isMenuOpen(): boolean;
  isMenuBusy(): boolean;
  selectNextOption(): void;
  selectPreviousOption(): void;
  isCurrentOptionInteractive(): boolean;
  isCurrentOptionSingleAction(): boolean;
  isCurrentOptionScrollable(): boolean;
  activateCurrentOption(): void;
  deactivateCurrentOption(): void;
  isCurrentOptionActive(): boolean;
  runDown(): void;
  runUp(): void;
  runAction(): void;
}

interface MenuOption {
  text: Phaser.GameObjects.Text;
  page: MenuPage;
}

export interface MenuConfig {
  x: number;
  y: number;
  separatorX?: number;
  width: number;
  height: number;
  optionsConfig?: MenuOptionConfig[];
}

export interface MenuOptionConfig {
  textKey: string;
  pageCreationFunction: (
    scene: Phaser.Scene,
    box: Phaser.GameObjects.Container,
    config: MenuConfig
  ) => MenuPage;
}

export const createMenu = (scene: Phaser.Scene, config: MenuConfig): Menu => {
  const menuBox = createMenuBoxRectangle(scene, config);
  const textOptions = createTextOptions(scene, menuBox, config);

  let menuBusy = false;
  let selectedOption = 0;
  let isOptionActive = false;
  let isBlocked = false;

  return {
    show() {
      menuBox.setVisible(true);
      menuBox.setAlpha(1);
      isBlocked = false;

      if (menuBox.scaleY < 1) {
        menuBox.scaleY = Math.min(menuBox.scaleY + 0.05, 1);
        menuBusy = true;
      } else {
        menuBusy = false;
        showTextOptions(textOptions, selectedOption, isOptionActive);
      }
    },

    hide() {
      this.deactivateCurrentOption();
      menuBox.setVisible(false);
      hideTextOptions(textOptions);
      selectedOption = 0;
      menuBox.scaleY = 0;
    },

    block() {
      if (isBlocked) {
        return;
      }

      menuBox.setAlpha(0.5);
      selectedOption = 0;
      textOptions[selectedOption].page.actions?.reset?.();
      isBlocked = true;
    },

    isMenuOpen() {
      return menuBox.visible;
    },

    isMenuBusy() {
      return menuBusy;
    },

    selectNextOption() {
      if (selectedOption === textOptions.length - 1) {
        return;
      }

      selectedOption++;
      textOptions[selectedOption].page.actions?.reset?.();
    },

    selectPreviousOption() {
      if (selectedOption === 0) {
        return;
      }

      selectedOption--;
      textOptions[selectedOption].page.actions?.reset?.();
    },

    isCurrentOptionInteractive() {
      return !!textOptions[selectedOption].page.actions;
    },

    isCurrentOptionSingleAction() {
      return textOptions[selectedOption].page.type === PageType.SINGLE_ACTION;
    },

    isCurrentOptionScrollable() {
      return textOptions[selectedOption].page.type === PageType.SCROLL;
    },

    activateCurrentOption() {
      isOptionActive = true;
    },

    deactivateCurrentOption() {
      isOptionActive = false;
    },

    isCurrentOptionActive() {
      return isOptionActive;
    },

    runUp() {
      textOptions[selectedOption].page.actions?.up?.();
    },

    runDown() {
      textOptions[selectedOption].page.actions?.down?.();
    },

    runAction() {
      textOptions[selectedOption].page.actions?.action?.();
    },
  };
};

export const controlMenu = (
  scene: Phaser.Scene,
  menu: Menu,
  isDownEscapeJustPressed: boolean,
  isActionButtonJustPressed: boolean,
  state: GameState
) => {
  menu.show();
  const cursors = scene.input.keyboard.createCursorKeys();

  if (isDownEscapeJustPressed) {
    menu.hide();

    return;
  }

  if (menu.isCurrentOptionActive()) {
    if (isLeftButtonPressed(cursors, state)) {
      menu.deactivateCurrentOption();
    }

    if (menu.isCurrentOptionScrollable()) {
      if (isUpButtonPressed(cursors, state)) {
        menu.runUp();
      }

      if (isDownButtonPressed(cursors, state)) {
        menu.runDown();
      }

      return;
    }

    if (isUpButtonJustPressed(scene, state)) {
      menu.runUp();
    }

    if (isDownButtonJustPressed(scene, state)) {
      menu.runDown();
    }

    if (isActionButtonJustPressed) {
      menu.runAction();
    }
  } else {
    if (isUpButtonJustPressed(scene, state)) {
      menu.selectPreviousOption();
    }

    if (isDownButtonJustPressed(scene, state)) {
      menu.selectNextOption();
    }

    if (
      menu.isCurrentOptionInteractive() &&
      (isActionButtonJustPressed || isRightButtonPressed(cursors, state))
    ) {
      if (menu.isCurrentOptionSingleAction()) {
        menu.runAction();

        return;
      }

      menu.activateCurrentOption();
    }
  }
};

export const createMenuBoxRectangle = (
  scene: Phaser.Scene,
  config: MenuConfig
): Phaser.GameObjects.Container => {
  const container = scene.add.container();
  const graphics = createGraphicsToolWithLineStyle(scene);
  const width = config.width;
  const height = config.height;

  graphics.fillGradientStyle(
    MENU_BOX_FILL_COLOR_TOP,
    MENU_BOX_FILL_COLOR_TOP,
    MENU_BOX_FILL_COLOR_BOTTOM,
    MENU_BOX_FILL_COLOR_BOTTOM,
    MENU_BOX_FILL_ALPHA
  );

  graphics.fillRect(0, 0, width, height);

  const dialogBox = graphics.strokeRoundedRect(0, 0, width, height, 4);

  dialogBox.setScrollFactor(0, 0);

  if (config.separatorX) {
    dialogBox.lineBetween(
      config.separatorX,
      MENU_BOX_MARGIN,
      config.separatorX,
      height - MENU_VERTICAL_SEPARATOR_Y
    );
  }

  container.visible = false;
  container.scaleY = 0;
  container.x = config.x;
  container.y = config.y;
  container.width = config.width;
  container.height = config.height;
  container.setDepth(MENU_DEPTH);

  container.add(dialogBox);

  return container;
};

const createGraphicsToolWithLineStyle = (scene: Phaser.Scene) => {
  const graphics = scene.add.graphics();

  graphics.lineStyle(
    MENU_BOX_LINE_WIDTH,
    MENU_BOX_LINE_COLOR,
    MENU_BOX_LINE_ALPHA
  );

  return graphics;
};

const createTextOptions = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Container,
  config: MenuConfig
): MenuOption[] => {
  if (!config.optionsConfig) {
    return [];
  }

  const textOptions = config.optionsConfig.map(
    (optionConfig, index): MenuOption => {
      const text = createMenuText({
        scene,
        textKey: optionConfig.textKey,
        x: MENU_BOX_MARGIN,
        y: MENU_BOX_MARGIN + 40 * index,
      });

      const page = optionConfig.pageCreationFunction(scene, box, config);

      box.add([text, page.container]);

      return {
        text,
        page,
      };
    }
  );

  textOptions[0].text.setColor("#AAAAAA");

  return textOptions;
};

const showTextOptions = (
  textOptions: MenuOption[],
  selectedOption: number,
  isOptionActive: boolean
) => {
  textOptions.forEach((textOption) => {
    textOption.text.setColor("#fff");
    textOption.text.setVisible(true);
    textOption.page.container.setVisible(false);
  });

  textOptions[selectedOption].text.setColor(
    isOptionActive
      ? MENU_BOX_FONT_ACTIVATED_OPTION_COLOR
      : MENU_BOX_FONT_SELECTED_OPTION_COLOR
  );
  textOptions[selectedOption].page.container.setVisible(true);
};

const hideTextOptions = (textOptions: MenuOption[]) => {
  textOptions.forEach((textOption) => {
    textOption.text.setVisible(false);
    textOption.page.container.setVisible(false);
  });
};
