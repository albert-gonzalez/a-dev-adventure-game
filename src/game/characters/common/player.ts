import { startEnemyEffects } from "../../scenes/common/combat/enemyEffects";
import {
  ATTACK_POWER_UP_KEY,
  PowerUp,
  PowerUps,
} from "../../scenes/common/combat/skills";
import { emit } from "../../scenes/common/events";
import { getState } from "../../state/state";

export const HP_UPDATED_EVENT = "HPUpdated";
const INIT_HP = 50;
const MAX_HP = 100;
const BASE_ATTACK_PLAYER = 15;
const VARIABLE_ATTACK_PLAYER = 15;
const NO_POWER_UP = 0;

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
  const powerUps: PowerUps = {};

  return {
    hp: INIT_HP,
    previousHp: INIT_HP,
    maxHp: MAX_HP,
    animationPrefix: "",
    addPowerUp(powerUp) {
      powerUps[powerUp.key] = { ...powerUp };
    },
    usePowerUp(key) {
      const effect = powerUps[key];

      if (!effect) {
        return NO_POWER_UP;
      }

      effect.turnsLeft--;

      if (effect.turnsLeft === 0) {
        delete powerUps[effect.key];
      }

      return effect.value;
    },
    async attack(fixedDamage) {
      const state = getState();
      const scene = state.scene.phaser as Phaser.Scene;
      const enemySprite = state.combat.enemy
        ?.sprite as Phaser.GameObjects.Sprite;

      await startEnemyEffects(scene, enemySprite);

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
      emit(state.scene.phaser as Phaser.Scene, HP_UPDATED_EVENT);

      return this.hp - this.previousHp;
    },
    isDead(): boolean {
      return this.hp === 0;
    },
  };
};

const calculateDamage = (base: number, variable: number) =>
  Math.floor(base + variable * Math.random());
