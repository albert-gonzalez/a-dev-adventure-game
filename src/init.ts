import "phaser";

import "regenerator-runtime/runtime";
import { init } from "./game/i18n/i18n";
import { titleSceneConfig } from "./game/scenes/title/titleSceneConfig";
import { scene1Config, SCENE_1_KEY } from "./game/scenes/scene1/config";
import { scene2Config, SCENE_2_KEY } from "./game/scenes/scene2/config";
import { scene3Config, SCENE_3_KEY } from "./game/scenes/scene3/config";
import { isSoundMuted } from "./game/scenes/common/audio";
import initDropdown from "./web/ts/dropdown";

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  scale: {
    parent: "game",
    max: { width: 1024, height: 768 },
    expandParent: false,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    fullscreenTarget: "game",
  },
  input: {
    activePointers: 2,
  },
};

init();
initDropdown();

const game = new Phaser.Game({
  ...gameConfig,
  scene: titleSceneConfig,
});

game.sound.mute = isSoundMuted();
game.scene.add(SCENE_1_KEY, scene1Config);
game.scene.add(SCENE_2_KEY, scene2Config);
game.scene.add(SCENE_3_KEY, scene3Config);
