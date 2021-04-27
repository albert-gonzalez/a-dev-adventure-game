import { KEY_PRESS_EFFECT } from "../../scenes/common/audio";
import {
  ATTACK_POWER_UP_KEY,
  PowerUp,
  PowerUps,
} from "../../scenes/common/combat/skills";
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
  attack(fixedDamage?: number): Promise<void>;
  updateHp(value: number): number;
  addPowerUp(effect: PowerUp): void;
  usePowerUp(key: string): number;
  isDead(): boolean;
}

export const createPlayer = (): Player => {
  const effects: PowerUps = {};

  return {
    hp: INIT_HP,
    previousHp: INIT_HP,
    maxHp: MAX_HP,
    animationPrefix: "",
    addPowerUp(effect) {
      effects[effect.key] = effect;
    },
    usePowerUp(key) {
      const effect = effects[key];

      if (!effect) {
        return 0;
      }

      effect.turnsLeft--;

      if (effect.turnsLeft === 0) {
        delete effects[effect.key];
      }

      return effect.value;
    },
    async attack(fixedDamage) {
      const state = getState();
      const scene = state.scene.phaser as Phaser.Scene;
      const enemySprite = state.combat.enemy
        ?.sprite as Phaser.GameObjects.Sprite;

      if (scene) {
        for (let i = 0; i < 4; i++) {
          scene?.sound.play(KEY_PRESS_EFFECT);
          await pause(150);
        }

        await pause(200);

        scene.sound.play(HIT_EFFECT);

        const tween = scene?.tweens.add({
          targets: enemySprite,
          duration: 40,
          yoyo: true,
          repeat: 5,
          x: enemySprite.x + 10,
        });

        const tweenPromise = new Promise((resolve) =>
          tween?.on("complete", resolve)
        );

        await tweenPromise;
      }

      const bonusAttackMultiplier = this.usePowerUp(ATTACK_POWER_UP_KEY) || 1;
      const damage =
        (fixedDamage ??
          calculateDamage(BASE_ATTACK_PLAYER, VARIABLE_ATTACK_PLAYER)) *
        bonusAttackMultiplier;

      state.combat.enemy?.updateHp(-damage);
      state.dialog?.showDialogBox([
        { text: "enemyDamaged", options: { damage } },
      ]);
    },
    updateHp(value: number): number {
      const state = getState();

      this.previousHp = this.hp;
      this.hp += value;
      this.hp = Math.max(Math.min(this.hp, this.maxHp), 0);
      state.scene.phaser?.events.emit(HP_UPDATED_EVENT);

      return this.hp - this.previousHp;
    },
    isDead(): boolean {
      return this.hp === 0;
    },
  };
};

const calculateDamage = (base: number, variable: number) =>
  Math.floor(base + variable * Math.random());
