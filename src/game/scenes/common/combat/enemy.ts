import { getState } from "../../../state/state";
import {
  createEnemySprite,
  runAttackAnimation,
  runDeathAnimation,
  showEnemySprite,
} from "./enemyEffects";
import { DEFENSE_POWER_UP_KEY } from "./skills";

const BASE_ATTACK_ENEMY = 5;
const VARIABLE_ATTACK_ENEMY = 10;

export interface EnemyConfig {
  key: string;
  hp: number;
  audio: {
    death: string;
    attack: string;
  };
}

export interface Enemy {
  sprite?: Phaser.GameObjects.Sprite;
  show(): Promise<void>;
  updateHp(points: number): void;
  attack(): Promise<void>;
  isHpEmpty(): boolean;
  die(): void;
  getHp(): number;
}

export const createEnemy = (enemy: EnemyConfig, scene: Phaser.Scene): Enemy => {
  let hp = enemy.hp;
  let isDying = false;
  let isVisible = false;
  const enemySprite = createEnemySprite(scene, enemy);

  return {
    sprite: enemySprite,
    async show() {
      if (isVisible) {
        return;
      }

      isVisible = true;

      await showEnemySprite(scene, enemySprite);
    },
    updateHp(points) {
      hp = Math.max(0, hp + points);
    },
    getHp() {
      return hp;
    },
    async attack(): Promise<void> {
      const state = getState();
      const scene = state.scene.phaser as Phaser.Scene;
      const player = state.albert;
      const enemySprite = state.combat.enemy
        ?.sprite as Phaser.GameObjects.Sprite;

      await runAttackAnimation(scene, enemySprite, enemy);

      const defenseMultiplier = player.usePowerUp(DEFENSE_POWER_UP_KEY) || 1;
      const damage = Math.floor(
        calculateDamage(BASE_ATTACK_ENEMY, VARIABLE_ATTACK_ENEMY) /
          defenseMultiplier
      );

      player.updateHp(-damage);

      state.dialog?.showDialogBox([
        { text: "playerDamaged", options: { damage } },
      ]);
    },
    isHpEmpty() {
      return hp === 0;
    },
    die() {
      if (isDying) {
        return;
      }

      isDying = true;

      runDeathAnimation(scene, enemySprite, enemy);
    },
  };
};

const calculateDamage = (base: number, variable: number) =>
  Math.floor(base + variable * Math.random());
