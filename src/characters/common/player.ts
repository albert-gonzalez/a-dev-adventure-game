import { KEY_PRESS_EFFECT } from "../../scenes/common/audio";
import { HIT_EFFECT } from "../../scenes/scene3/audio";
import { getState } from "../../state/state";
import { pause } from "../../utils/pause";

export const HP_UPDATED_EVENT = "HPUpdated";
const INIT_HP = 50;
const MAX_HP = 100;
const BASE_ATTACK_PLAYER = 15;
const VARIABLE_ATTACK_PLAYER = 15;

export interface Player {
  hp: number;
  previousHp: number;
  maxHp: number;
  sprite?: Phaser.GameObjects.Sprite;
  animationPrefix: string;
  attack(): Promise<void>;
  updateHp(value: number): void;
}

export const createPlayer = (): Player => {
  return {
    hp: INIT_HP,
    previousHp: INIT_HP,
    maxHp: MAX_HP,
    animationPrefix: "",
    async attack() {
      const state = getState();
      const scene = state.scene.phaser as Phaser.Scene;
      const enemySprite = state.combat.enemy
        ?.sprite as Phaser.GameObjects.Sprite;

      for (let i = 0; i < 4; i++) {
        scene.sound.play(KEY_PRESS_EFFECT);
        await pause(150);
      }

      await pause(200);

      scene.sound.play(HIT_EFFECT);

      const tween = scene.tweens.add({
        targets: enemySprite,
        duration: 40,
        yoyo: true,
        repeat: 5,
        x: enemySprite.x + 10,
      });

      const tweenPromise = new Promise((resolve) =>
        tween.on("complete", resolve)
      );

      await tweenPromise;

      const damage = calculateDamage(
        BASE_ATTACK_PLAYER,
        VARIABLE_ATTACK_PLAYER
      );

      state.combat.enemy?.updateHp(damage);
      state.dialog?.showDialogBox([
        { text: "enemyDamaged", options: { damage: -damage } },
      ]);
    },
    updateHp(value: number): void {
      const state = getState();

      state.albert.previousHp = state.albert.hp;
      state.albert.hp += value;
      state.albert.hp = Math.max(
        Math.min(state.albert.hp, state.albert.maxHp),
        0
      );
      state.scene.phaser?.events.emit(HP_UPDATED_EVENT);
    },
  };
};

const calculateDamage = (base: number, variable: number) =>
  Math.floor(-base - variable * Math.random());
