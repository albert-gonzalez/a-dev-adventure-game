import { Dialog } from "../../menus/dialog";
import { getState } from "../../state/state";
import { playMusic } from "../common/audio";
import { BATTLE_MUSIC, EXPLOSION_EFFECT } from "./audio";

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
        1500,
        0.015,
        false,
        (_: Phaser.Cameras.Scene2D.Camera, progress: number) => {
          if (progress === 1) {
            sceneState++;
          }
        }
      );

      if (!explosionSoundPlayed) {
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
      scene.cameras.main.shake(3000, 0.015);

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
