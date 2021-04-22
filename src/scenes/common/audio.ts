import selectEffect from "url:../../assets/audio/effects/select.ogg";
import coffeeEffect from "url:../../assets/audio/effects/coffee.ogg";
import keyPressEffect from "url:../../assets/audio/effects/keyPress.ogg";

import { MUSIC_VOLUME } from "./constants";

export interface Audio {
  key: string;
  url: string;
}

interface MusicOptions {
  loop?: boolean;
  volume?: number;
}

export const SELECT_EFFECT = "select";
export const KEY_PRESS_EFFECT = "keyPress";
export const COFFEE_EFFECT = "coffee";

export const COMMON_AUDIOS = [
  { key: SELECT_EFFECT, url: selectEffect },
  { key: KEY_PRESS_EFFECT, url: keyPressEffect },
  { key: COFFEE_EFFECT, url: coffeeEffect },
];

export const loadAudio = (scene: Phaser.Scene, audiosToLoad: Audio[]) => {
  audiosToLoad.forEach((audio) => scene.load.audio(audio.key, audio.url));
};

export const playMusic = (
  scene: Phaser.Scene,
  musicKey: string,
  options: MusicOptions = {}
): void => {
  scene.sound.play(musicKey, {
    volume: options.volume ?? MUSIC_VOLUME,
    loop: options.loop ?? true,
  });
};
