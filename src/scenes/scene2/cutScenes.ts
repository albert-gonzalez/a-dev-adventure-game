import { GameState } from "../../state/state";
import { BOSS_KEY, MF_KEY, MF_SITTING_KEY } from "./characters";
import {
  DOWN_DIRECTION,
  LEFT_DIRECTION,
  RIGHT_DIRECTION,
  UP_DIRECTION,
} from "../../input/input";
import { updateVelocityWithAnimation } from "../common/characters";
import { updateAnimation } from "../../characters/common/animation/animation";
import { addFadeOut } from "../common/transitionEffect";
import { createMenuText } from "../../menus/texts";
import { writeText } from "../common/texts";
import { getText } from "../../i18n/i18n";
import { getAction } from "../common/actions";

export const createInitScene = (): ((state: GameState) => boolean) => {
  let csState = 0;
  let continueFadeOut: () => boolean;
  let title: Phaser.GameObjects.Text;

  return (state: GameState) => {
    const scene = state.scene.phaser as Phaser.Scene;

    if (csState === 0) {
      continueFadeOut = addFadeOut(scene);
      title = createMenuText({
        scene,
        x: scene.cameras.main.width / 2,
        y: scene.cameras.main.height / 2,
        visible: true,
      });

      title.setOrigin(0.5, 0.5);

      writeText(title, getText("office_intro"), scene, 100, false).then(() => {
        scene.time.delayedCall(1000, () => {
          csState++;
          title.destroy(true);
        });
      });

      csState++;
      return false;
    }

    if (csState === 1) return false;

    if (csState === 2) {
      const fadeOutFinished = continueFadeOut();

      if (fadeOutFinished) {
        csState++;
      }

      return false;
    }

    return true;
  };
};

export const createArcadeCutscene = (): ((state: GameState) => boolean) => {
  let csState = 0;

  return (state: GameState): boolean => {
    const scene = state.scene.phaser as Phaser.Scene;
    const mf = state.scene.characterSprites[MF_KEY];
    const boss = state.scene.characterSprites[BOSS_KEY];

    if (csState === 0) {
      scene.time.delayedCall(500, () => csState++);
      updateAnimation(boss, LEFT_DIRECTION, 0, BOSS_KEY, true);
      csState++;

      return false;
    }

    if (csState === 1) {
      return false;
    }

    if (csState === 2) {
      const mfWon = Math.random() > 0.5;
      state.dialog?.showDialogBox([
        { text: "ellipsis" },
        { text: "ellipsis_x2" },
        { text: mfWon ? "mf_won" : "mf_lost", who: "Miquel" },
      ]);
      csState++;

      return false;
    }

    if (csState === 3) {
      updateVelocityWithAnimation(mf, 0, DOWN_DIRECTION, MF_KEY);

      if (mf.y > 140) {
        csState++;
      }

      return false;
    }

    if (csState === 4) {
      updateVelocityWithAnimation(mf, RIGHT_DIRECTION, 0, MF_KEY);

      if (mf.x > 250) {
        csState++;
      }

      return false;
    }

    if (csState === 5) {
      updateVelocityWithAnimation(mf, 0, DOWN_DIRECTION, MF_KEY);

      if (mf.y > 300) {
        csState++;
      }

      return false;
    }

    if (csState === 6) {
      updateVelocityWithAnimation(mf, RIGHT_DIRECTION, 0, MF_KEY);

      if (mf.x > 580) {
        csState++;
      }

      return false;
    }

    if (csState === 7) {
      updateVelocityWithAnimation(mf, 0, UP_DIRECTION, MF_KEY);

      if (mf.y < 272) {
        csState++;
      }

      return false;
    }

    if (csState === 8) {
      updateVelocityWithAnimation(mf, RIGHT_DIRECTION, 0, MF_KEY);

      if (mf.x > 615) {
        csState++;
      }

      return false;
    }

    if (csState === 9) {
      updateVelocityWithAnimation(mf, 0, 0, MF_KEY);
      updateAnimation(mf, 0, UP_DIRECTION, MF_KEY, true);
      updateAnimation(boss, 0, UP_DIRECTION, BOSS_KEY, true);
      getAction(state.scene.actions, MF_KEY).disabled = true;
      getAction(state.scene.actions, MF_SITTING_KEY).disabled = false;
      mf.y = 264;
      mf.x = 621;
      csState++;
    }

    return true;
  };
};
