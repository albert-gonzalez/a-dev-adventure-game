import keyPressEffectOgg from "../../assets/audio/effects/keyPress.ogg";
import introMusicOgg from "../../assets/audio/music/intro.ogg";
import backspacePressEffectOgg from "../../assets/audio/effects/backspacePress.ogg";
import keyPressEffectMp3 from "../../assets/audio/effects/keyPress.mp3";
import introMusicMp3 from "../../assets/audio/music/intro.mp3";
import backspacePressEffectMp3 from "../../assets/audio/effects/backspacePress.mp3";

import { KEY_PRESS_EFFECT } from "../common/audio";

export const BACKSPACE_PRESS_EFFECT = "backspacePress";
export const INTRO_MUSIC = "intro";

export const loadAudio = (scene: Phaser.Scene): void => {
  scene.load.audio(KEY_PRESS_EFFECT, [keyPressEffectOgg, keyPressEffectMp3]);
  scene.load.audio(BACKSPACE_PRESS_EFFECT, [
    backspacePressEffectOgg,
    backspacePressEffectMp3,
  ]);
  scene.load.audio(INTRO_MUSIC, [introMusicOgg, introMusicMp3]);
};
