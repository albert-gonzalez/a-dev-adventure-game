import { pause } from "../../../utils/pause";
import { HIT_EFFECT, WIN_MUSIC } from "../../scene3/audio";
import { KEY_PRESS_EFFECT, playMusic } from "../audio";
import { createEnemyAnimations, playAttack, playStill } from "./animation";
import { EnemyConfig } from "./enemy";

export const startEnemyEffects = async (
  scene: Phaser.Scene,
  enemySprite: Phaser.GameObjects.Sprite
): Promise<void> => {
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

  const tweenPromise = new Promise((resolve) => tween?.on("complete", resolve));

  await tweenPromise;
};

export const createEnemySprite = (
  scene: Phaser.Scene,
  enemy: EnemyConfig
): Phaser.GameObjects.Sprite => {
  createEnemyAnimations(scene, enemy.key);
  const enemySprite = scene.add.sprite(
    scene.cameras.main.width / 2,
    scene.cameras.main.height / 2.5,
    enemy.key
  );

  enemySprite.alpha = 0;
  enemySprite.scale = 0.3;

  playStill(enemySprite);

  return enemySprite;
};

export const showEnemySprite = async (
  scene: Phaser.Scene,
  enemySprite: Phaser.GameObjects.Sprite
): Promise<void> => {
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
};

export const runAttackAnimation = async (
  scene: Phaser.Scene,
  enemySprite: Phaser.GameObjects.Sprite,
  enemy: EnemyConfig
): Promise<void> => {
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
};

export const runDeathAnimation = (
  scene: Phaser.Scene,
  enemySprite: Phaser.GameObjects.Sprite,
  enemy: EnemyConfig
): void => {
  scene.tweens.add({
    targets: enemySprite,
    duration: 40,
    yoyo: true,
    repeat: 20,
    x: enemySprite.x + 10,
    onRepeat() {
      if (!enemySprite) {
        return;
      }

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
};
