import "phaser";
import {
  MENU_BOX_FILL_ALPHA,
  MENU_BOX_FILL_COLOR,
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
import {
  createAboutPage,
  createExperiencePage,
  createItemsPage,
  createProjectsPage,
  createSkillsPage,
} from "./pages";
import { createMenuText } from "./texts";
import {
  isDownButtonPressed,
  isUpButtonPressed,
} from "../characters/main/control";
import { MENU_DEPTH } from "../scenes/common/constants";

const menuOptionsConfig = () => [
  {
    textKey: "about",
    pageCreationFunction: createAboutPage,
    interactive: false,
  },
  {
    textKey: "skills",
    pageCreationFunction: createSkillsPage,
    interactive: false,
  },
  {
    textKey: "experience",
    pageCreationFunction: createExperiencePage,
    interactive: true,
  },
  {
    textKey: "projects",
    pageCreationFunction: createProjectsPage,
    interactive: true,
  },
  {
    textKey: "items",
    pageCreationFunction: createItemsPage,
    interactive: false,
  },
];

export interface Menu {
  show(): void;
  hide(): void;
  isMenuOpen(): boolean;
  isMenuBusy(): boolean;
  selectNextOption(): void;
  selectPreviousOption(): void;
  isCurrentOptionInteractive(): boolean;
  activateCurrentOption(): void;
  deactivateCurrentOption(): void;
  isCurrentOptionActive(): boolean;
  scrollPageDown(): void;
  scrollPageUp(): void;
}

interface MenuOption {
  text: Phaser.GameObjects.Text;
  page: Phaser.GameObjects.Container;
  interactive: boolean;
}

export const createMenu = (scene: Phaser.Scene): Menu => {
  const menuBox = createMenuBoxRectangle(scene);
  const textOptions = createTextOptions(scene, menuBox);

  let menuBusy = false;
  let selectedOption = 0;
  let isOptionActive = false;

  return {
    show() {
      menuBox.setVisible(true);

      if (menuBox.scaleY < 1) {
        menuBox.scaleY = Math.min(menuBox.scaleY + 0.05, 1);
        menuBusy = true;
      } else {
        menuBusy = false;
        showTextOptions(textOptions, selectedOption, isOptionActive);
      }
    },

    hide() {
      menuBox.setVisible(false);
      hideTextOptions(textOptions);
      selectedOption = 0;
      menuBox.scaleY = 0;
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
      textOptions[selectedOption].page.y = MENU_PAGE_Y;
    },

    selectPreviousOption() {
      if (selectedOption === 0) {
        return;
      }

      selectedOption--;
      textOptions[selectedOption].page.y = MENU_PAGE_Y;
    },

    isCurrentOptionInteractive() {
      return textOptions[selectedOption].interactive;
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

    scrollPageUp() {
      if (textOptions[selectedOption].page.y >= MENU_PAGE_Y) {
        return;
      }

      textOptions[selectedOption].page.y += 4;
    },

    scrollPageDown() {
      const pageBounds = textOptions[selectedOption].page.getBounds();
      if (
        textOptions[selectedOption].page.y <=
        scene.cameras.main.height - MENU_BOX_MARGIN * 6 - pageBounds.height
      ) {
        return;
      }

      textOptions[selectedOption].page.y -= 4;
    },
  };
};

export const controlMenu = (
  scene: Phaser.Scene,
  menu: Menu,
  isDownEscapeJustPressed: boolean,
  isActionButtonJustPressed: boolean
) => {
  menu.show();
  const cursors = scene.input.keyboard.createCursorKeys();

  if (menu.isCurrentOptionActive()) {
    if (isDownEscapeJustPressed && menu.isCurrentOptionActive()) {
      menu.deactivateCurrentOption();
    }

    if (cursors.up?.isDown) {
      menu.scrollPageUp();
    }

    if (cursors.down?.isDown) {
      menu.scrollPageDown();
    }
  } else {
    if (isDownEscapeJustPressed) {
      menu.hide();
    }

    if (isUpButtonPressed(scene)) {
      menu.selectPreviousOption();
    }

    if (isDownButtonPressed(scene)) {
      menu.selectNextOption();
    }

    if (isActionButtonJustPressed && menu.isCurrentOptionInteractive()) {
      menu.activateCurrentOption();
    }
  }
};

const createMenuBoxRectangle = (scene: Phaser.Scene) => {
  const graphics = createGraphicsToolWithLineStyle(scene);

  const dialogBox = graphics.strokeRoundedRect(
    0,
    0,
    scene.cameras.main.width - MENU_BOX_MARGIN * 2,
    scene.cameras.main.height - MENU_BOX_MARGIN * 2
  );

  dialogBox.setScrollFactor(0, 0);

  graphics.fillStyle(MENU_BOX_FILL_COLOR, MENU_BOX_FILL_ALPHA);
  dialogBox.fill();

  graphics.lineBetween(
    MENU_VERTICAL_SEPARATOR_X,
    MENU_BOX_MARGIN,
    MENU_VERTICAL_SEPARATOR_X,
    scene.cameras.main.height - MENU_VERTICAL_SEPARATOR_Y
  );

  dialogBox.visible = false;
  dialogBox.scaleY = 0;
  dialogBox.x = MENU_BOX_MARGIN;
  dialogBox.y = MENU_BOX_MARGIN;
  dialogBox.setDepth(MENU_DEPTH);

  return dialogBox;
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
  box: Phaser.GameObjects.Graphics
): MenuOption[] => {
  const textOptions = menuOptionsConfig().map(
    (optionConfig, index): MenuOption => {
      const text = createMenuText({
        scene,
        textKey: optionConfig.textKey,
        x: box.x * 2,
        y: box.y * 2 + 40 * index,
      });

      const page = optionConfig.pageCreationFunction(scene, box);

      return {
        text,
        page,
        interactive: optionConfig.interactive,
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
    textOption.page.setVisible(false);
  });

  textOptions[selectedOption].text.setColor(
    isOptionActive
      ? MENU_BOX_FONT_ACTIVATED_OPTION_COLOR
      : MENU_BOX_FONT_SELECTED_OPTION_COLOR
  );
  textOptions[selectedOption].page.setVisible(true);
};

const hideTextOptions = (textOptions: MenuOption[]) => {
  textOptions.forEach((textOption) => {
    textOption.text.setVisible(false);
    textOption.page.setVisible(false);
  });
};
