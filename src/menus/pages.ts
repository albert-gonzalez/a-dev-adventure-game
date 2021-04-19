import {
  MENU_BOX_FONT_DATES_COLOR,
  MENU_BOX_FONT_WHITE_COLOR,
  MENU_BOX_FONT_GRAY_COLOR,
  MENU_BOX_FONT_SELECTED_OPTION_COLOR,
  MENU_BOX_FONT_SIZE_M,
  MENU_BOX_FONT_SIZE_S,
  MENU_BOX_FONT_SIZE_XS,
  MENU_BOX_FONT_TITLE_COLOR,
  MENU_BOX_MARGIN,
  MENU_PAGE_MARGIN_X,
  MENU_PAGE_Y,
  MENU_VERTICAL_SEPARATOR_X,
} from "./style";
import { createMenuText } from "./texts";
import { createBar } from "./bar";
import { INVENTORY_UPDATED_EVENT } from "../inventory/current";
import { getState } from "../state/state";
import experience from "../data/experience.json";
import projects from "../data/projects.json";
import skills from "../data/skills.json";
import { MENU_DEPTH } from "../scenes/common/constants";
import { HP_UPDATED_EVENT } from "../characters/common/player";
import { PORTRAIT_KEY } from "../scenes/common/map/images";
import { MenuConfig } from "./menu";
import { setPendingAction } from "../scenes/common/combat/system";

export enum PageType {
  SCROLL,
  LIST,
  SINGLE_ACTION,
  STATIC,
}

export interface MenuPage {
  container: Phaser.GameObjects.Container;
  actions?: MenuPageActions;
  type: PageType;
}

export interface ListOption {
  key: string;
  description?: string;
  quantity: number;
}

interface MenuPageActions {
  up?: () => void;
  down?: () => void;
  reset?: () => void;
  action: () => void;
}

export const createPage = (
  container: Phaser.GameObjects.Container,
  type: PageType,
  actions?: MenuPageActions
): MenuPage => {
  return {
    actions,
    container,
    type,
  };
};

const INVENTORY_PAGE = "inventoryPage";
export const getCurrentItemIndexUpdatedEvent = (prefix: string): string =>
  `${prefix}_currentItemIndexUpdated`;

const createScrollablePage = (container: Phaser.GameObjects.Container) =>
  createPage(container, PageType.SCROLL, {
    action: noFn,
    up: () => scrollUp(container),
    down: () => scrollDown(container),
    reset: () => resetScroll(container),
  });

export const createListPage = (
  container: Phaser.GameObjects.Container,
  config: MenuConfig,
  optionListGetter: () => ListOption[],
  actionFn: (currentOptionIndex: number) => number,
  currentOptionChangedEvent: string,
  listUpdatedEvent: string
): MenuPage => {
  const scene = getState().scene.phaser as Phaser.Scene;

  let currentOptionIndex = -1;

  createListOptions(scene, container, config, optionListGetter());

  const changeOption = (getCurrentOption: () => number) => {
    currentOptionIndex = getCurrentOption();
    changeCurrentOptionTextColor(
      container,
      optionListGetter(),
      currentOptionIndex
    );
  };

  scene.events.addListener(listUpdatedEvent, () => {
    createListOptions(scene, container, config, optionListGetter());
  });

  changeCurrentOptionTextColor(
    container,
    optionListGetter(),
    currentOptionIndex
  );

  return createPage(container, PageType.LIST, {
    action: () => changeOption(() => actionFn(currentOptionIndex)),
    up: () =>
      changeOption(() => selectPreviousOption(container, currentOptionIndex)),
    down: () =>
      changeOption(() => selectNextOption(container, currentOptionIndex)),
    reset: () => changeOption(() => 0),
  });
};

const createStaticPage = (container: Phaser.GameObjects.Container): MenuPage =>
  createPage(container, PageType.STATIC);

export const createActionOnlyPage = (
  container: Phaser.GameObjects.Container,
  action: () => void
): MenuPage => createPage(container, PageType.SINGLE_ACTION, { action });

const scrollUp = (container: Phaser.GameObjects.Container) => {
  if (container.y >= MENU_PAGE_Y) {
    return;
  }

  container.y += 4;
};

const scrollDown = (container: Phaser.GameObjects.Container) => {
  const pageBounds = container.getBounds();
  if (
    container.y <=
    -pageBounds.height + container.parentContainer.height - MENU_BOX_MARGIN
  ) {
    return;
  }

  container.y -= 4;
};

const resetScroll = (container: Phaser.GameObjects.Container) =>
  (container.y = MENU_BOX_MARGIN);

const selectPreviousOption = (
  container: Phaser.GameObjects.Container,
  currentOption: number
) => {
  if (currentOption === 0 || !container.length) {
    return currentOption;
  }

  currentOption--;

  return currentOption;
};

const selectNextOption = (
  container: Phaser.GameObjects.Container,
  currentOption: number
) => {
  if (currentOption >= container.length / 2 - 1) {
    return currentOption;
  }

  currentOption++;

  return currentOption;
};

export const changeCurrentOptionTextColor = (
  container: Phaser.GameObjects.Container,
  optionList: ListOption[],
  selectedOption: number
): void => {
  optionList.forEach((option, index) => {
    const color =
      selectedOption === index
        ? MENU_BOX_FONT_SELECTED_OPTION_COLOR
        : option.quantity
        ? MENU_BOX_FONT_WHITE_COLOR
        : MENU_BOX_FONT_GRAY_COLOR;

    const optionNameContainer = container.getAt(
      index * 2
    ) as Phaser.GameObjects.Container;

    const optionQuantity = container.getAt(
      index * 2 + 1
    ) as Phaser.GameObjects.Text;

    (optionNameContainer.getAt(0) as Phaser.GameObjects.Text).setColor(color);
    (optionNameContainer.getAt(1) as Phaser.GameObjects.Text).setColor(color);
    optionQuantity.setColor(color);
  });
};

const useItem = (currentOptionIndex: number) => {
  const state = getState();
  const item = state.inventory.get(currentOptionIndex);

  if (!item) {
    return currentOptionIndex;
  }

  const itemRemoved = state.inventory.decreaseQuantity(
    currentOptionIndex,
    state.scene.phaser as Phaser.Scene
  );

  setPendingAction(item.effect);

  return itemRemoved &&
    (currentOptionIndex > 0 || state.inventory.getAll().length === 0)
    ? currentOptionIndex - 1
    : currentOptionIndex;
};

const noFn = () => {
  return;
};

export const createPageContainer = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Container,
  config: MenuConfig
): Phaser.GameObjects.Container => {
  const graphics = scene.add.graphics();
  graphics.fillStyle(0xfffff, 0);
  const separatorX = config.separatorX || 0;

  const mask = graphics.fillRect(
    box.x + separatorX + MENU_BOX_MARGIN,
    box.y + MENU_BOX_MARGIN,
    box.width - MENU_BOX_MARGIN * 2,
    box.height - MENU_BOX_MARGIN * 2
  );

  mask.setScrollFactor(0, 0);

  const container = scene.add.container(
    separatorX + MENU_BOX_MARGIN,
    MENU_BOX_MARGIN
  );

  container.setMask(new Phaser.Display.Masks.GeometryMask(scene, mask));
  container.setScrollFactor(0, 0);

  container.visible = false;
  container.setDepth(MENU_DEPTH);

  return container;
};

export const createAboutPage = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Container,
  config: MenuConfig
): MenuPage => {
  const separatorX = config.separatorX || 0;

  const width = scene.cameras.main.width - separatorX - MENU_PAGE_MARGIN_X;
  const container = createPageContainer(scene, box, config);
  let hpBar = createBar({
    scene,
    text: "HP:",
    x: 0,
    y: 140,
    percentage: getState().albert.hp,
  });

  container.add([
    createMenuText({
      scene,
      textKey: "name",
      x: 0,
      y: 0,
      visible: true,
    }),
    createMenuText({
      scene,
      text: "Albert González",
      x: 0,
      y: 30,
      visible: true,
      fontSize: MENU_BOX_FONT_SIZE_S,
    }),
    createMenuText({ scene, textKey: "age", x: 0, y: 70, visible: true }),
    createMenuText({
      scene,
      text: calculateAge() + "",
      x: 0,
      y: 100,
      visible: true,
      fontSize: MENU_BOX_FONT_SIZE_S,
    }),
    scene.add.sprite(250, 0, PORTRAIT_KEY).setOrigin(0, 0),

    createMenuText({
      scene,
      textKey: "aboutMe",
      x: 0,
      y: 240,
      visible: true,
      fontSize: MENU_BOX_FONT_SIZE_M,
      width,
    }),
    hpBar,
  ]);

  scene.events.addListener(HP_UPDATED_EVENT, () => {
    const newHpBar = createBar({
      scene,
      text: "HP:",
      x: 0,
      y: 140,
      percentage: getState().albert.hp,
    });
    container.replace(hpBar, newHpBar, true);
    hpBar = newHpBar;
  });

  return createStaticPage(container);
};

export const createSkillsPage = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Container,
  config: MenuConfig
): MenuPage => {
  const container = createPageContainer(scene, box, config);

  container.add(
    skills.map((skill, index) =>
      createBar({
        ...skill,
        x: 260 * (index % 2),
        y: 70 * Math.floor(index / 2),
        scene,
      })
    )
  );

  return createStaticPage(container);
};

export const createItemsPage = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Container,
  config: MenuConfig,
  interactive = false
): MenuPage => {
  const container = createPageContainer(scene, box, config);

  const page = createListPage(
    container,
    config,
    () => getState().inventory.getAll(),
    useItem,
    getCurrentItemIndexUpdatedEvent(INVENTORY_PAGE),
    INVENTORY_UPDATED_EVENT
  );

  if (interactive) {
    return page;
  }

  return createStaticPage(container);
};

export const createExperiencePage = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Container,
  config: MenuConfig
): MenuPage => {
  const container = createPageContainer(scene, box, config);
  const textWidth =
    scene.cameras.main.width - MENU_VERTICAL_SEPARATOR_X - MENU_BOX_MARGIN * 4;

  let currentY = 0;
  container.add(
    experience.flatMap((job) => {
      const titleText = createMenuText({
        scene,
        textKey: job.titleKey,
        x: 0,
        y: currentY,
        visible: true,
        width: textWidth,
        color: MENU_BOX_FONT_TITLE_COLOR,
      });

      currentY += titleText.height + 20;

      const datesText = createMenuText({
        scene,
        textKey: job.datesKey,
        x: 0,
        y: currentY,
        fontSize: MENU_BOX_FONT_SIZE_M,
        visible: true,
        color: MENU_BOX_FONT_DATES_COLOR,
      });

      currentY += datesText.height + 20;

      const descriptionText = createMenuText({
        scene,
        textKey: job.descriptionKey,
        x: 0,
        y: currentY,
        fontSize: MENU_BOX_FONT_SIZE_M,
        visible: true,
        width: textWidth,
      });

      currentY += descriptionText.height + 50;

      return [titleText, datesText, descriptionText];
    })
  );

  return createScrollablePage(container);
};

export const createProjectsPage = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Container,
  config: MenuConfig
): MenuPage => {
  const container = createPageContainer(scene, box, config);
  const textWidth =
    scene.cameras.main.width - MENU_VERTICAL_SEPARATOR_X - MENU_BOX_MARGIN * 4;

  let currentY = 0;
  container.add(
    projects.flatMap((project) => {
      const titleText = createMenuText({
        scene,
        textKey: project.titleKey,
        x: 0,
        y: currentY,
        visible: true,
        width: textWidth,
        color: MENU_BOX_FONT_TITLE_COLOR,
      });

      currentY += titleText.height + 20;

      const descriptionText = createMenuText({
        scene,
        textKey: project.descriptionKey,
        x: 0,
        y: currentY,
        fontSize: MENU_BOX_FONT_SIZE_M,
        visible: true,
        width: textWidth,
      });

      currentY += descriptionText.height + 50;

      return [titleText, descriptionText];
    })
  );

  return createScrollablePage(container);
};

export const createListOptions = (
  scene: Phaser.Scene,
  container: Phaser.GameObjects.Container,
  config: MenuConfig,
  options: ListOption[]
): void => {
  const separatorX = config.separatorX || 0;

  container.removeAll(true);

  container.add([
    ...Object.values(options).flatMap((item, index) => {
      const color =
        item.quantity !== 0
          ? MENU_BOX_FONT_WHITE_COLOR
          : MENU_BOX_FONT_GRAY_COLOR;

      const nameText = createMenuText({
        scene,
        textKey: item.key,
        x: 0,
        y: 35 * index,
        fontSize: MENU_BOX_FONT_SIZE_S,
        visible: true,
        color,
      });

      const nameContainer = scene.add.container(0, 0, [nameText]);

      if (item.description) {
        nameContainer.add(
          createMenuText({
            scene,
            textKey: item.description,
            x: nameText.displayWidth + 5,
            y: 35 * index,
            fontSize: MENU_BOX_FONT_SIZE_XS,
            visible: true,
            color,
            padding: { top: 4 },
          })
        );
      }

      return [
        nameContainer,
        createMenuText({
          scene,
          text: item.quantity + "",
          x: config.width - separatorX - MENU_BOX_MARGIN * 3,
          y: 35 * index,
          fontSize: MENU_BOX_FONT_SIZE_S,
          visible: true,
          color,
        }),
      ];
    }),
  ]);
};

const calculateAge = () => {
  const birthday = new Date("1986-02-13");

  return new Date(Date.now() - birthday.getTime()).getUTCFullYear() - 1970;
};
