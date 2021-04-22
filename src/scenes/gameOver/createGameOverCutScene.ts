import { MENU_BOX_FONT_SIZE_XL } from "../../menus/style";
import { createMenuText } from "../../menus/texts";
import { playMusic } from "../common/audio";
import { GAME_OVER_KEY } from "../common/combat/images";
import { MENU_DEPTH } from "../common/constants";
import { addFadeIn, Transition } from "../common/map/transitionEffect";
import { GAME_OVER_MUSIC } from "../scene3/audio";

const BG_FADE_IN_DURATION = 3000;
const TITLE_FADE_IN_DURATION = 2000;
const IMAGE_DELAY = TITLE_FADE_IN_DURATION / 2;
const IMAGE_FADE_IN_DURATION = 2000;
const IMAGE_FADE_IN_OUT_REPEAT_DELAY =
  IMAGE_DELAY + IMAGE_FADE_IN_DURATION + 1000;
const IMAGE_FADE_IN_OUT_DURATION = 2000;
const REFRESH_TEXT_DELAY = IMAGE_FADE_IN_OUT_REPEAT_DELAY;

export const createGameOverCutScene = (
  scene: Phaser.Scene
): (() => boolean) => {
  let getTransition: () => Transition;
  let csState = 0;

  return () => {
    if (csState === 0) {
      getTransition = addFadeIn(scene, {
        depth: MENU_DEPTH,
        duration: BG_FADE_IN_DURATION,
      });

      scene.sound.stopAll();
      playMusic(scene, GAME_OVER_MUSIC, { loop: false });

      csState++;
    }

    if (csState === 1) {
      if (getTransition().isFinished) {
        createTexts(scene);
        createImage(scene);

        csState++;
      }
    }

    return false;
  };
};

const createTexts = (scene: Phaser.Scene) => {
  const firedText = createMenuText({
    scene,
    textKey: "fired",
    x: scene.cameras.main.width / 2,
    y: 100,
    visible: true,
    fontSize: MENU_BOX_FONT_SIZE_XL,
  });

  firedText.alpha = 0;
  firedText.setOrigin(0.5);

  scene.tweens.add({
    targets: firedText,
    alpha: 1,
    duration: TITLE_FADE_IN_DURATION,
  });

  const refreshText = createMenuText({
    scene,
    textKey: "refresh",
    x: scene.cameras.main.width / 2,
    y: 500,
    visible: true,
    width: scene.cameras.main.width,
  });

  refreshText.alpha = 0;
  refreshText.setOrigin(0.5);
  refreshText.setAlign("center");

  scene.tweens.add({
    targets: refreshText,
    alpha: 1,
    delay: REFRESH_TEXT_DELAY,
  });
};

const createImage = (scene: Phaser.Scene) => {
  const image = scene.add.sprite(
    scene.cameras.main.width / 2,
    scene.cameras.main.height / 2,
    GAME_OVER_KEY
  );

  image.alpha = 0;
  image.setOrigin(0.5);
  image.depth = MENU_DEPTH;

  scene.tweens.add({
    targets: image,
    alpha: 1,
    delay: IMAGE_DELAY,
    duration: IMAGE_FADE_IN_DURATION,
  });

  scene.tweens.add({
    targets: image,
    alpha: 0.6,
    delay: IMAGE_FADE_IN_OUT_REPEAT_DELAY,
    duration: IMAGE_FADE_IN_OUT_DURATION,
    repeat: -1,
    yoyo: true,
  });
};
