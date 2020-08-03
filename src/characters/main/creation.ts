import albertImage from "url:./../../assets/sprites/albert.png";
import sleepyAlbertImage from "url:./../../assets/sprites/sleepyAlbert.png";
import "phaser";
import { HUMAN_FRAME_SIZE } from "../../scenes/common/characters";

export const ALBERT_KEY = "albert";
export const SLEEPY_ALBERT_KEY = "sleepyAlbert";
export const SLEEPY_PREFIX = "SLEEPY_";

export const loadMainCharacterSprite = (scene: Phaser.Scene) => {
  scene.load.spritesheet(ALBERT_KEY, albertImage, {
    ...HUMAN_FRAME_SIZE,
  });

  scene.load.spritesheet(SLEEPY_ALBERT_KEY, sleepyAlbertImage, {
    ...HUMAN_FRAME_SIZE,
  });
};
