import { isActionButtonJustPressed } from "../../input/input";
import { SCENE_1_KEY } from "../scene1/config";
import { GameState, getState } from "../../state/state";
import { INTRO_MUSIC, loadAudio } from "./audio";
import { loadImages } from "./images";
import {
  addPControlsTexts as addControlsTexts,
  addPressToStartText,
  addTitleText,
  deleteLetters,
} from "./texts";
import { addParticleEmitters } from "./particles";
import { addBackground } from "./background";
import { playMusic } from "../common/audio";
import { writeText } from "../common/map/texts";
import { startSceneTransition } from "../common/map/scene";

const START_DELAY = 1000;

let continueTransition: (state: GameState) => boolean;
let isInputEnabled = false;

export function preload(this: Phaser.Scene): void {
  loadAudio(this);
  loadImages(this);
}

export function create(this: Phaser.Scene): void {
  addBackground(this);
  getState().scene.phaser = this;
  this.time.delayedCall(START_DELAY, async () => {
    const titleText = addTitleText(this);
    try {
      await writeText(titleText, "A Dev's\nAdvetnure", this, true);
      await deleteLetters(titleText, 5, this, true);
      await writeText(titleText, "nture", this, true);
    } catch (e) {
      titleText.setText("A Dev's\nAdventure");
    }

    addPressToStartText(this);
    addControlsTexts(this);
    addParticleEmitters(this);

    playMusic(this, INTRO_MUSIC);
    this.time.delayedCall(500, () => (isInputEnabled = true));
  });
}

export function update(this: Phaser.Scene): void {
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
