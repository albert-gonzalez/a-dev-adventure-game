import { DialogText } from "./actions";
import { GameState } from "../../../state/state";
import { STEAM_KEY } from "./images";
import { FOREGROUND_DEPTH } from "../constants";
import { COFFEE_EFFECT } from "../audio";

export const createCoffeeCutScene = (
  afterTexts: DialogText[],
  x: number,
  y: number
): ((state: GameState) => boolean) => {
  let finished = false;

  let timeout: Phaser.Time.TimerEvent;

  return (state: GameState) => {
    if (!timeout) {
      const scene = state.scene.phaser as Phaser.Scene;
      const particles = scene.add.particles(STEAM_KEY);

      const emitter = particles.createEmitter({
        x,
        y,
        lifespan: 200,
        speed: { min: 50, max: 100 },
        angle: { min: -105, max: -85 },
        gravityY: 0,
        bounce: 100,
        frequency: 100,
      });

      particles.setDepth(FOREGROUND_DEPTH);

      emitter.setAlpha((p: unknown, k: unknown, t: number) => {
        return 1 - 2 * Math.abs(t - 0.5);
      });

      emitter.setScale(0.5);

      scene.sound.play(COFFEE_EFFECT);

      timeout = scene.time.delayedCall(2500, () => {
        emitter.stop();
        afterTexts.length && state.dialog?.showDialogBox(afterTexts);
        finished = true;
      });
    }
    return finished;
  };
};
