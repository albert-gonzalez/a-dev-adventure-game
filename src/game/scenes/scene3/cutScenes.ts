import { Dialog } from "../../menus/dialog";
import { getState } from "../../state/state";
import { isIos } from "../../utils/browser";
import { playMusic } from "../common/audio";
import { BATTLE_MUSIC, EXPLOSION_EFFECT } from "./audio";

const FIRST_SHAKE_DURATION = 1500;
const SECOND_SHAKE_DURATION = 3000;

export const createInitScene = (): (() => boolean) => {
  let sceneState = 0;
  let explosionSoundPlayed = false;

  return () => {
    const state = getState();
    const dialog = state.dialog as Dialog;
    const scene = state.scene.phaser as Phaser.Scene;

    if (sceneState === 0) {
      dialog.showDialogBox([
        { text: "battleTimeToWork" },
        { text: "battleTimeToWork2" },
        { text: "battleSomethingIsWrong" },
      ]);

      sceneState++;

      return false;
    }

    if (sceneState === 1) {
      scene.cameras.main.shake(
        FIRST_SHAKE_DURATION,
        0.015,
        false,
        (_: Phaser.Cameras.Scene2D.Camera, progress: number) => {
          if (progress === 1) {
            sceneState++;
          }
        }
      );

      if (!explosionSoundPlayed) {
        if (!isIos()) {
          navigator.vibrate?.(FIRST_SHAKE_DURATION);
        }
        scene.sound.play(EXPLOSION_EFFECT);

        explosionSoundPlayed = true;
      }

      return false;
    }

    if (sceneState === 2) {
      dialog.showDialogBox([{ text: "battleBugFound" }]);

      sceneState++;

      return false;
    }

    if (sceneState === 3) {
      scene.cameras.main.shake(SECOND_SHAKE_DURATION, 0.015);
      if (!isIos()) {
        navigator.vibrate?.(SECOND_SHAKE_DURATION);
      }

      state.combat.enemy?.show().then(() => sceneState++);
      playMusic(scene, BATTLE_MUSIC);

      sceneState++;

      return false;
    }

    if (sceneState === 4) {
      return false;
    }

    if (sceneState === 5) {
      dialog.showDialogBox([{ text: "battleTutorial" }]);

      sceneState++;

      return false;
    }

    return true;
  };
};
