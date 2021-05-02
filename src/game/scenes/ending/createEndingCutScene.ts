import { MENU_BOX_FONT_SIZE_XL } from "../../menus/style";
import { createMenuText } from "../../menus/texts";
import { playMusic } from "../common/audio";
import { ENDING_KEY } from "../common/combat/images";
import { MENU_DEPTH } from "../common/constants";
import {
  addFadeIn,
  addFadeOut,
  Transition,
} from "../common/map/transitionEffect";
import { ENDING_MUSIC } from "../scene3/audio";

const BG_FADE_IN_DURATION = 8000;
const BG_FADE_OUT_DURATION = 10000;
const STORY_TEXT_DURATION = 40000;
const STORY_TEXT_MARGIN = 200;
const THANK_YOU_TEXT_DURATION = 10000;
const THANK_YOU_TEXT_DELAY = STORY_TEXT_DURATION;
const THANK_YOU_TEXT_MARGIN = 100;
const REFRESH_TEXT_DELAY = THANK_YOU_TEXT_DURATION + THANK_YOU_TEXT_DELAY;
const REFRESH_TEXT_Y = 500;

export const createEndingCutScene = (scene: Phaser.Scene): (() => boolean) => {
  let getFadeInTransition: () => Transition;
  let getFadeOutTransition: () => Transition;
  let bgImage: Phaser.GameObjects.Sprite;

  let csState = 0;

  return () => {
    if (csState === 0) {
      bgImage = scene.add.sprite(0, 0, ENDING_KEY);
      bgImage.setDepth(MENU_DEPTH);
      bgImage.setOrigin(0);
      bgImage.setVisible(false);

      getFadeInTransition = addFadeIn(scene, {
        depth: MENU_DEPTH,
        duration: BG_FADE_IN_DURATION,
      });

      csState++;
    }

    if (csState === 1) {
      if (getFadeInTransition().isFinished) {
        bgImage.visible = true;
        playMusic(scene, ENDING_MUSIC, { loop: false });

        getFadeOutTransition = addFadeOut(
          scene,
          getFadeInTransition().rectangle,
          {
            duration: BG_FADE_OUT_DURATION,
            alpha: 0.5,
          }
        );

        csState++;
      }
    }

    if (csState === 2) {
      if (getFadeOutTransition().isFinished) {
        createTexts(scene);

        csState++;
      }
    }

    return false;
  };
};

const createTexts = (scene: Phaser.Scene) => {
  const storyText = createMenuText({
    scene,
    textKey: "endingStory",
    x: scene.cameras.main.width / 2,
    y: scene.cameras.main.height,
    visible: true,
    width: scene.cameras.main.width - STORY_TEXT_MARGIN,
    origin: { x: 0.5, y: 0 },
    lineSpacing: 20,
    align: "justify",
  });

  const thankYouText = createMenuText({
    scene,
    textKey: "thankYou",
    x: scene.cameras.main.width / 2,
    y: scene.cameras.main.height,
    visible: true,
    width: scene.cameras.main.width - THANK_YOU_TEXT_MARGIN,
    origin: { x: 0.5, y: 0 },
    fontSize: MENU_BOX_FONT_SIZE_XL,
  });

  const refreshText = createMenuText({
    scene,
    textKey: "refresh",
    x: scene.cameras.main.width / 2,
    y: REFRESH_TEXT_Y,
    visible: true,
    width: scene.cameras.main.width,
    alpha: 0,
    origin: { x: 0.5, y: 0 },
    align: "center",
  });

  scene.tweens.add({
    targets: storyText,
    y: -storyText.height,
    duration: STORY_TEXT_DURATION,
  });

  scene.tweens.add({
    targets: thankYouText,
    y: scene.cameras.main.height / 2 - thankYouText.height,
    duration: THANK_YOU_TEXT_DURATION,
    delay: THANK_YOU_TEXT_DELAY,
  });

  scene.tweens.add({
    targets: refreshText,
    alpha: 1,
    delay: REFRESH_TEXT_DELAY,
  });
};
