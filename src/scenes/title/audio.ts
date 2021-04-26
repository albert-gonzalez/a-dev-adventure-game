import keyPressEffect from "../../assets/audio/effects/keyPress.ogg";
import introMusic from "../../assets/audio/music/intro.ogg";
import backspacePressEffect from "../../assets/audio/effects/backspacePress.ogg";
import { KEY_PRESS_EFFECT } from "../common/audio";

export const BACKSPACE_PRESS_EFFECT = "backspacePress";
export const INTRO_MUSIC = "intro";

export const loadAudio = (scene: Phaser.Scene) => {
  scene.load.audio(KEY_PRESS_EFFECT, keyPressEffect);
  scene.load.audio(BACKSPACE_PRESS_EFFECT, backspacePressEffect);
  scene.load.audio(INTRO_MUSIC, introMusic);
};
