import "phaser";

import { init } from "./i18n/i18n";
import { preload, create, update } from "./scenes/scene1/scene";

export const TILE_HEIGHT = 32;
export const TILE_WIDTH = 32;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  debug: false,
  physics: {
    default: "arcade",
  },
  audio: {
    disableWebAudio: true,
  },
  scene: {
    preload,
    create,
    update,
  },
  scale: {
    parent: "game",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

init();

const game = new Phaser.Game(config);
