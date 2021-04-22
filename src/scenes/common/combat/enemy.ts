import { getState } from "../../../state/state";
import { pause } from "../../../utils/pause";
import { WIN_MUSIC } from "../../scene3/audio";
import { playMusic } from "../audio";
import { createEnemyAnimations, playAttack, playStill } from "./animation";
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
  sprite: Phaser.GameObjects.Sprite;
  show(): Promise<void>;
  updateHp(points: number): void;
  attack(): Promise<void>;
  isHpEmpty(): boolean;
  die(): void;
}

export const createEnemy = (scene: Phaser.Scene, enemy: EnemyConfig): Enemy => {
  let hp = enemy.hp;
  let isDying = false;
  let isVisible = false;

  createEnemyAnimations(scene, enemy.key);
  const enemySprite = scene.add.sprite(
    scene.cameras.main.width / 2,
    scene.cameras.main.height / 2.5,
    enemy.key
  );

  enemySprite.alpha = 0;
  enemySprite.scale = 0.3;

  playStill(enemySprite);

  return {
    sprite: enemySprite,
    async show() {
      if (isVisible) {
        return;
      }

      isVisible = true;

      const showTween = scene.tweens.add({
        targets: enemySprite,
        duration: 3000,
        scale: 1,
        alpha: enemySprite.alpha + 1,
      });

      const showTweenPromise = new Promise((resolve) =>
        showTween.on("complete", resolve)
      );

      await showTweenPromise;
    },
    updateHp(points) {
      hp = Math.max(0, hp + points);
    },
    async attack(): Promise<void> {
      const state = getState();
      const scene = state.scene.phaser as Phaser.Scene;
      const player = state.albert;
      const enemySprite = state.combat.enemy
        ?.sprite as Phaser.GameObjects.Sprite;

      await pause(200);

      playAttack(enemySprite);

      const tweenUp = scene.tweens.add({
        targets: enemySprite,
        duration: 150,
        yoyo: true,
        y: enemySprite.y - 20,
      });

      const tweenUpPromise = new Promise((resolve) =>
        tweenUp.on("complete", resolve)
      );

      await tweenUpPromise;

      const tweenDown = scene.tweens.add({
        targets: enemySprite,
        duration: 100,
        yoyo: true,
        y: enemySprite.y + 10,
      });

      const attackSound = scene.sound.add(enemy.audio.attack);
      attackSound.play();

      const tweenDownPromise = new Promise((resolve) =>
        tweenDown.on("complete", resolve)
      );

      await tweenDownPromise;
      playStill(enemySprite);

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

      scene.sound.stopAll();
      playMusic(scene, WIN_MUSIC, { loop: false });
      deathSound.play();
    },
  };
};

const calculateDamage = (base: number, variable: number) =>
  Math.floor(base + variable * Math.random());
