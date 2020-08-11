import "phaser";

import { init } from "./i18n/i18n";
import { titleSceneConfig } from "./scenes/title/titleSceneConfig";
import { scene1Config, SCENE_1_KEY } from "./scenes/scene1/config";

const gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  debug: false,
  physics: {
    default: "arcade",
  },
  scale: {
    parent: "game",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  input: {
    activePointers: 2,
  },
};

export const TILE_HEIGHT = 32;
export const TILE_WIDTH = 32;

init();

const game = new Phaser.Game({
  ...gameConfig,
  scene: titleSceneConfig,
});

game.scene.add(SCENE_1_KEY, scene1Config);
