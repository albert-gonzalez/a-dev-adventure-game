import "phaser";

import "regenerator-runtime/runtime";
import { init } from "./i18n/i18n";
import { titleSceneConfig } from "./scenes/title/titleSceneConfig";
import { scene1Config, SCENE_1_KEY } from "./scenes/scene1/config";
import { scene2Config, SCENE_2_KEY } from "./scenes/scene2/config";

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

init();

const game = new Phaser.Game({
  ...gameConfig,
  scene: titleSceneConfig,
});

game.scene.add(SCENE_1_KEY, scene1Config);
game.scene.add(SCENE_2_KEY, scene2Config);
