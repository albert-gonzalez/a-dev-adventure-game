import selectEffectOgg from "../../assets/audio/effects/select.ogg";
import selectEffectMp3 from "../../assets/audio/effects/select.mp3";
import coffeeEffectOgg from "../../assets/audio/effects/coffee.ogg";
import coffeeEffectMp3 from "../../assets/audio/effects/coffee.mp3";
import keyPressEffectOgg from "../../assets/audio/effects/keyPress.ogg";
import keyPressEffectMp3 from "../../assets/audio/effects/keyPress.mp3";

import { MUSIC_VOLUME } from "./constants";

export interface Audio {
  key: string;
  url: string | string[];
}

interface MusicOptions {
  loop?: boolean;
  volume?: number;
}

const GAME_SOUND_MUTED_KEY = "gameSoundMuted";

export const SELECT_EFFECT = "select";
export const KEY_PRESS_EFFECT = "keyPress";
export const COFFEE_EFFECT = "coffee";

export const COMMON_AUDIOS = [
  { key: SELECT_EFFECT, url: [selectEffectOgg, selectEffectMp3] },
  { key: KEY_PRESS_EFFECT, url: [keyPressEffectOgg, keyPressEffectMp3] },
  { key: COFFEE_EFFECT, url: [coffeeEffectOgg, coffeeEffectMp3] },
];

export const loadAudio = (scene: Phaser.Scene, audiosToLoad: Audio[]): void => {
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

export const isSoundMuted = (): boolean => {
  return localStorage?.getItem(GAME_SOUND_MUTED_KEY) === "true";
};

export const toggleSound = (scene: Phaser.Scene): void => {
  const isMuted = !scene.sound.mute;

  scene.sound.mute = isMuted;

  localStorage?.setItem(GAME_SOUND_MUTED_KEY, isMuted + "");
};
