import { isActionButtonJustPressed } from "../../input/input";
import { SCENE_1_KEY } from "../scene1/config";
import { GameState, getState } from "../../state/state";
import { INTRO_MUSIC, loadAudio } from "./audio";
import { loadImages } from "./images";
import { addPressToStartText, addTitleText, deleteLetters } from "./texts";
import { addParticleEmitters } from "./particles";
import { addBackground } from "./background";
import { playMusic } from "../common/map/audio";
import { writeText } from "../common/map/texts";
import { startSceneTransition } from "../common/map/scene";

const START_DELAY = 1000;

let continueTransition: (state: GameState) => boolean;
let isInputEnabled = false;
let background: Phaser.GameObjects.Sprite;

export function preload(this: Phaser.Scene) {
  loadAudio(this);
  loadImages(this);
}

export function create(this: Phaser.Scene) {
  background = addBackground(this);
  getState().scene.phaser = this;
  this.time.delayedCall(START_DELAY, async () => {
    const titleText = addTitleText(this);
    await writeText(titleText, "A Dev's\nAdvetnure", this);
    await deleteLetters(titleText, 5, this);
    await writeText(titleText, "nture", this);

    addPressToStartText(this);
    addParticleEmitters(this);

    playMusic(this, INTRO_MUSIC);
    isInputEnabled = true;
  });
}

export function update(this: Phaser.Scene): void {
  moveBackground(this);

  if (!isInputEnabled) {
    return;
  }

  if (!continueTransition && isActionButtonJustPressed(this, getState())) {
    continueTransition = startSceneTransition(SCENE_1_KEY);
  }

  if (continueTransition) {
    continueTransition(getState());
  }
}

const moveBackground = (scene: Phaser.Scene) => {
  if (background.x > -background.width + scene.cameras.main.width) {
    background.x = background.x - 0.3;
  }
};
