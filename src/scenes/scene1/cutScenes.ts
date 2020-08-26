import { GameState } from "../../state/state";
import { updateAnimation } from "../../characters/common/animation/animation";
import {
  DOWN_DIRECTION,
  LEFT_DIRECTION,
  MOVEMENT_SPEED_SLOW,
  updateCharacterVelocity,
} from "../../input/input";
import { FOREGROUND_DEPTH, MUSIC_VOLUME } from "../common/constants";
import { COBI_KEY, NOE_KEY } from "./characters";
import { ALBERT_KEY } from "../common/characters";
import { DialogText } from "../common/actions";
import { SHOWER_EVENT } from "./events";
import { addFadeOut } from "../common/transitionEffect";
import { HOME_MUSIC } from "./audio";
import { STEAM_KEY } from "../common/images";

export const createShowerCutScene = () => {
  let finished = false;

  let timeout: Phaser.Time.TimerEvent;

  return (state: GameState) => {
    if (!timeout) {
      const scene = state.scene.phaser as Phaser.Scene;
      const particles = scene.add.particles(STEAM_KEY);
      state.scene.events[SHOWER_EVENT] = true;

      const emitter = particles.createEmitter({
        x: 384,
        y: 240,
        lifespan: 1500,
        speed: { min: 50, max: 100 },
        angle: { min: -110, max: -80 },
        gravityY: 0,
        bounce: 100,
        frequency: 75,
      });

      const waterSound = scene.sound.add("water");
      scene.tweens.add({ targets: waterSound, volume: 0, duration: 3800 });
      waterSound.play();

      emitter.setAlpha((p: any, k: any, t: number) => {
        return 1 - 2 * Math.abs(t - 0.5);
      });

      emitter.setScale((p: any, k: any, t: number) => {
        return 1 + 2 * t;
      });

      state.albert.sprite?.setVisible(false);
      state.albert.animationPrefix = "";

      scene.time.delayedCall(4000, () => {
        emitter.stop();
      });

      timeout = scene.time.delayedCall(6000, () => {
        finished = true;
        state.albert.sprite?.setVisible(true);

        updateAnimation(
          state.albert.sprite as Phaser.GameObjects.Sprite,
          0,
          DOWN_DIRECTION
        );
        emitter.remove();

        state.dialog?.showDialogBox([{ text: "like_new" }]);
      });
    }
    return finished;
  };
};

export const createCoffeeCutScene = (afterTexts: DialogText[]) => {
  let finished = false;

  let timeout: Phaser.Time.TimerEvent;

  return (state: GameState) => {
    if (!timeout) {
      const scene = state.scene.phaser as Phaser.Scene;
      const particles = scene.add.particles(STEAM_KEY);

      const emitter = particles.createEmitter({
        x: 370,
        y: 765,
        lifespan: 200,
        speed: { min: 50, max: 100 },
        angle: { min: -105, max: -85 },
        gravityY: 0,
        bounce: 100,
        frequency: 100,
      });

      particles.setDepth(FOREGROUND_DEPTH);

      emitter.setAlpha((p: any, k: any, t: number) => {
        return 1 - 2 * Math.abs(t - 0.5);
      });

      emitter.setScale(0.5);

      scene.sound.play("coffee");

      timeout = scene.time.delayedCall(2500, () => {
        emitter.stop();
        afterTexts.length && state.dialog?.showDialogBox(afterTexts);
        finished = true;
      });
    }
    return finished;
  };
};

export const noteBookCutscene = (state: GameState) => {
  state.scene.objectSprites["albert_notebook"].destroy(true);
  return true;
};

export const createInitialCutscene = () => {
  let continueFadeOut: () => boolean;
  let csState = 0;
  return (state: GameState): boolean => {
    const scene = state.scene.phaser as Phaser.Scene;

    if (csState === 0) {
      const graphics = scene.add.graphics();
      graphics.fillStyle(0);
      continueFadeOut = addFadeOut(scene);

      state.dialog?.showDialogBox([
        { who: NOE_KEY, text: "wake_up_freeman" },
        { who: NOE_KEY, text: "wake_up_albert" },
        { who: ALBERT_KEY, text: "ellipsis" },
        { who: ALBERT_KEY, text: "right_now" },
      ]);
      csState++;

      return false;
    }

    if (csState === 1) {
      scene.sound.play(HOME_MUSIC, { loop: true, volume: MUSIC_VOLUME });

      csState++;

      return false;
    }

    if (csState === 2) {
      const fadeOutFinished = continueFadeOut();

      if (fadeOutFinished) {
        csState++;
      }

      return false;
    }

    if (csState === 3) {
      state.dialog?.showDialogBox([
        { who: NOE_KEY, text: "walk_cobi" },
        { who: COBI_KEY, text: "bark" },
      ]);
      csState++;
      return false;
    }

    if (csState === 4) {
      const noeSprite = state.scene.characterSprites[NOE_KEY];
      const cobiSprite = state.scene.characterSprites[COBI_KEY];
      updateAnimation(noeSprite, LEFT_DIRECTION, 0, NOE_KEY);
      updateAnimation(cobiSprite, LEFT_DIRECTION, 0, COBI_KEY);
      updateCharacterVelocity(
        noeSprite,
        LEFT_DIRECTION,
        0,
        MOVEMENT_SPEED_SLOW
      );
      updateCharacterVelocity(
        cobiSprite,
        LEFT_DIRECTION,
        0,
        MOVEMENT_SPEED_SLOW
      );

      if (noeSprite.x <= 360) {
        csState++;
      }
      return false;
    }

    if (csState === 5) {
      const noeSprite = state.scene.characterSprites[NOE_KEY];
      const cobiSprite = state.scene.characterSprites[COBI_KEY];

      updateAnimation(noeSprite, 0, DOWN_DIRECTION, NOE_KEY);
      updateCharacterVelocity(
        noeSprite,
        0,
        DOWN_DIRECTION,
        MOVEMENT_SPEED_SLOW
      );

      if (cobiSprite.x <= 360) {
        csState++;
      }

      return false;
    }

    if (csState === 6) {
      const noeSprite = state.scene.characterSprites[NOE_KEY];
      const cobiSprite = state.scene.characterSprites[COBI_KEY];

      updateAnimation(noeSprite, 0, DOWN_DIRECTION, NOE_KEY);
      updateCharacterVelocity(
        noeSprite,
        0,
        DOWN_DIRECTION,
        MOVEMENT_SPEED_SLOW
      );
      updateAnimation(cobiSprite, 0, DOWN_DIRECTION, COBI_KEY);
      updateCharacterVelocity(
        cobiSprite,
        0,
        DOWN_DIRECTION,
        MOVEMENT_SPEED_SLOW
      );

      if (cobiSprite.y >= 650) {
        state.dialog?.showDialogBox([{ who: ALBERT_KEY, text: "prepare" }]);
        delete state.scene.characterSprites[NOE_KEY];
        delete state.scene.characterSprites[COBI_KEY];
        noeSprite.destroy(true);
        cobiSprite.destroy(true);
        csState++;
      }

      return false;
    }

    return true;
  };
};
