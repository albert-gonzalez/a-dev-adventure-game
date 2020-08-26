import { isActionButtonJustPressed } from "../../input/input";
import { SCENE_1_KEY } from "../scene1/config";
import { getState } from "../../state/state";
import { INTRO_MUSIC, loadAudio } from "./audio";
import { loadImages } from "./images";
import {
  addPressToStartText,
  addTitleText,
  deleteLetters,
  writeText,
} from "./texts";
import { addParticleEmitters } from "./particles";
import { addBackground } from "./background";
import { addFadeIn } from "../common/transitionEffect";
import { MUSIC_VOLUME } from "../common/constants";

const START_DELAY = 1000;

let showFadeIn: () => boolean;
let isInputEnabled = false;

export function preload(this: Phaser.Scene) {
  loadAudio(this);
  loadImages(this);
}

export function create(this: Phaser.Scene) {
  addBackground(this);
  this.time.delayedCall(START_DELAY, async () => {
    const titleText = addTitleText(this);
    await writeText(titleText, "A Dev's\nAdvetnure", this);
    await deleteLetters(titleText, 5, this);
    await writeText(titleText, "nture", this);

    addPressToStartText(this);
    addParticleEmitters(this);

    this.sound.play(INTRO_MUSIC, { volume: MUSIC_VOLUME, loop: true });
    isInputEnabled = true;
  });
}

export function update(this: Phaser.Scene): void {
  if (!isInputEnabled) {
    return;
  }

  if (isActionButtonJustPressed(this, getState())) {
    showFadeIn = addFadeIn(this);
  }

  if (showFadeIn) {
    const fadeFinished = showFadeIn();

    if (fadeFinished) {
      this.sound.stopAll();
      this.scene.start(SCENE_1_KEY);
      isInputEnabled = false;
    }

    return;
  }
}
