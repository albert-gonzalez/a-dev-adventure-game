import { GameState, getState } from "../../../state/state";
import { Image, loadImages, SpriteSheet } from "../map/images";
import { Audio, loadAudio } from "../map/audio";
import { SceneMap } from "../map/sceneMap";
import { DynamicObjectInfo } from "../map/objects";
import { SceneActions } from "../map/actions";
import { TITLE_BACKGROUND } from "../../title/images";
import { COMBAT_BACKGROUND_KEY } from "./images";
import { createEnemyAnimations, playStill } from "./animation";

export interface CreateCombatSceneInput {
  initialCutScene: (state: GameState) => boolean;
  images: Image[];
  spriteSheets: SpriteSheet[];
  audios: Audio[];
  music?: string;
  enemy: string;
}

export const createSceneMethods = ({
  initialCutScene,
  images,
  spriteSheets,
  audios,
  music,
  enemy,
}: CreateCombatSceneInput) => {
  function preload(this: Phaser.Scene) {
    const state = getState();
    state.scene.phaser = this;
    state.cutScene = initialCutScene;
    loadImages(this, images, spriteSheets);
    loadAudio(this, audios);
  }

  function create(this: Phaser.Scene) {
    createEnemyAnimations(this, enemy);
    const background = this.add.sprite(0, 0, COMBAT_BACKGROUND_KEY);
    background.setOrigin(0, 0);
    const enemySprite = this.add.sprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2.5,
      enemy
    );

    playStill(enemySprite);
  }

  function update(this: Phaser.Scene) {}

  return { preload, create, update };
};
