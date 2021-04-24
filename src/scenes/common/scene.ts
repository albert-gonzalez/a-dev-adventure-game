import { getText } from "../../i18n/i18n";
import { createMenuText } from "../../menus/texts";

export interface SceneMethods {
  preload: (this: Phaser.Scene) => void;
  create: (this: Phaser.Scene) => void;
  update: (this: Phaser.Scene) => void;
}

export const initLoadingScreen = (scene: Phaser.Scene): void => {
  const loadingText = createMenuText({
    x: scene.cameras.main.width - 250,
    y: scene.cameras.main.height - 50,
    textKey: "loading",
    scene,
    visible: true,
  });

  let periodCount = 1;
  const period = ".";

  const intervalId = setInterval(() => {
    loadingText.setText(getText("loading") + period.repeat(periodCount));
    periodCount = (periodCount + 1) % 4;
  }, 500);

  scene.load.on("complete", () => {
    clearInterval(intervalId);
    loadingText.destroy();
  });
};
