import {
  MENU_BOX_FONT_DATES_COLOR,
  MENU_BOX_FONT_SIZE_M,
  MENU_BOX_FONT_SIZE_S,
  MENU_BOX_FONT_TITLE_COLOR,
  MENU_BOX_MARGIN,
  MENU_PAGE_MARGIN_X,
  MENU_PAGE_MARGIN_Y,
  MENU_PAGE_X,
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
import { HP_UPDATED_EVENT, updateHP } from "../characters/main/state";

const createPageContainer = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Graphics
) => {
  const graphics = scene.add.graphics();
  graphics.fillStyle(0xfffff, 0);

  const mask = graphics.fillRect(
    MENU_PAGE_X,
    MENU_PAGE_Y,
    scene.cameras.main.width - MENU_VERTICAL_SEPARATOR_X - MENU_PAGE_MARGIN_X,
    scene.cameras.main.height - MENU_PAGE_MARGIN_Y
  );

  mask.setScrollFactor(0, 0);

  const container = scene.add.container(MENU_PAGE_X, MENU_PAGE_Y);
  container.setMask(new Phaser.Display.Masks.GeometryMask(scene, mask));
  container.setScrollFactor(0, 0);

  container.visible = false;
  container.setDepth(MENU_DEPTH);

  return container;
};

export const createAboutPage = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Graphics
) => {
  const width =
    scene.cameras.main.width - MENU_VERTICAL_SEPARATOR_X - MENU_PAGE_MARGIN_X;
  const container = createPageContainer(scene, box);
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
    scene.add.sprite(250, 0, "portrait").setOrigin(0, 0),

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

  return container;
};

export const createSkillsPage = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Graphics
) => {
  const container = createPageContainer(scene, box);

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

  return container;
};

export const createItemsPage = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Graphics
) => {
  const container = createPageContainer(scene, box);
  createInventory(scene, container);
  scene.events.addListener(INVENTORY_UPDATED_EVENT, () =>
    createInventory(scene, container)
  );

  return container;
};

export const createExperiencePage = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Graphics
) => {
  const container = createPageContainer(scene, box);
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

  return container;
};

export const createProjectsPage = (
  scene: Phaser.Scene,
  box: Phaser.GameObjects.Graphics
) => {
  const container = createPageContainer(scene, box);
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

  return container;
};

const createInventory = (
  scene: Phaser.Scene,
  container: Phaser.GameObjects.Container
) => {
  const nameTitle = createMenuText({
    scene,
    textKey: "name",
    x: 0,
    y: 0,
    visible: true,
  });
  const quantityTitle = createMenuText({
    scene,
    textKey: "quantity",
    x: 260,
    y: 0,
    visible: true,
  });

  container.removeAll(true);

  container.add([
    nameTitle,
    quantityTitle,
    ...Object.values(getState().inventory).flatMap((item, index) => [
      createMenuText({
        scene,
        textKey: item.key,
        x: 0,
        y: 50 * (index + 1),
        fontSize: MENU_BOX_FONT_SIZE_S,
        visible: true,
      }),
      createMenuText({
        scene,
        text: item.quantity + "",
        x: quantityTitle.width + 240,
        y: 50 * (index + 1),
        fontSize: MENU_BOX_FONT_SIZE_S,
        visible: true,
      }),
    ]),
  ]);
};

const calculateAge = () => {
  const birthday = new Date("1986-02-13");

  return new Date(Date.now() - birthday.getTime()).getUTCFullYear() - 1970;
};
