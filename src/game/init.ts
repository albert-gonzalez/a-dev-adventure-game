import "phaser";

import "regenerator-runtime/runtime";
import { init as initI18n } from "./i18n/i18n";
import { titleSceneConfig } from "./scenes/title/titleSceneConfig";
import { scene1Config, SCENE_1_KEY } from "./scenes/scene1/config";
import { scene2Config, SCENE_2_KEY } from "./scenes/scene2/config";
import { scene3Config, SCENE_3_KEY } from "./scenes/scene3/config";
import { isSoundMuted } from "./scenes/common/audio";
import { initState } from "./state/state";

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
  },
  scale: {
    parent: "game",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    fullscreenTarget: "game",
    expandParent: false,
    width: 800,
    height: 600,
  },
  input: {
    activePointers: 2,
  },
};

export default (): void => {
  initI18n();
  initState();
  initGame();
};

const initGame = () => {
  const game = new Phaser.Game({
    ...gameConfig,
    scene: titleSceneConfig,
  });

  game.sound.mute = isSoundMuted();
  game.scene.add(SCENE_1_KEY, scene1Config);
  game.scene.add(SCENE_2_KEY, scene2Config);
  game.scene.add(SCENE_3_KEY, scene3Config);
};
