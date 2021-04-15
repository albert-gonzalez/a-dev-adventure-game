import { getState } from "../../../state/state";
import { pause } from "../../../utils/pause";
import { createEnemyAnimations, playStill } from "./animation";

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
  sprite: Phaser.GameObjects.Sprite;
  updateHp(points: number): void;
  attack(): Promise<void>;
  isHpEmpty(): boolean;
  die(): void;
}

export const createEnemy = (scene: Phaser.Scene, enemy: EnemyConfig): Enemy => {
  let hp = enemy.hp;
  let isDying = false;

  createEnemyAnimations(scene, enemy.key);
  const enemySprite = scene.add.sprite(
    scene.cameras.main.width / 2,
    scene.cameras.main.height / 2.5,
    enemy.key
  );

  playStill(enemySprite);

  return {
    sprite: enemySprite,
    updateHp(points) {
      hp = Math.max(0, hp + points);
    },
    async attack(): Promise<void> {
      const state = getState();
      const scene = state.scene.phaser as Phaser.Scene;
      const enemySprite = state.combat.enemy
        ?.sprite as Phaser.GameObjects.Sprite;

      await pause(200);

      const tween = scene.tweens.add({
        targets: enemySprite,
        duration: 100,
        yoyo: true,
        y: enemySprite.y - 20,
      });

      const attackSound = scene.sound.add(enemy.audio.attack);
      attackSound.play();

      const tweenPromise = new Promise((resolve) =>
        tween.on("complete", resolve)
      );

      await tweenPromise;

      const damage = calculateDamage(BASE_ATTACK_ENEMY, VARIABLE_ATTACK_ENEMY);

      state.albert.updateHp(damage);

      state.dialog?.showDialogBox([
        { text: "playerDamaged", options: { damage: -damage } },
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

      scene.tweens.add({
        targets: enemySprite,
        duration: 40,
        yoyo: true,
        repeat: 20,
        x: enemySprite.x + 10,
        onRepeat() {
          enemySprite.alpha -= 0.05;
        },
      });

      const deathSound = scene.sound.add(enemy.audio.death);
      scene.tweens.add({
        targets: deathSound,
        duration: 400,
        rate: 0.3,
      });
      deathSound.play();
    },
  };
};

const calculateDamage = (base: number, variable: number) =>
  Math.floor(-base - variable * Math.random());
