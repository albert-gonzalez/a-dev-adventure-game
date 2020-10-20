import selectEffect from "url:../../assets/audio/effects/select.ogg";
import coffeeEffect from "url:../../assets/audio/effects/coffee.ogg";
import { MUSIC_VOLUME } from "./constants";

export interface Audio {
  key: string;
  url: string;
}

export const SELECT_EFFECT = "select";
export const KEY_PRESS_EFFECT = "keyPress";
export const COFFEE_EFFECT = "coffee";

export const COMMON_AUDIOS = [
  { key: SELECT_EFFECT, url: selectEffect },
  { key: COFFEE_EFFECT, url: coffeeEffect },
];

export const loadAudio = (scene: Phaser.Scene, audiosToLoad: Audio[]) => {
  audiosToLoad.forEach((audio) => scene.load.audio(audio.key, audio.url));
};

export const playMusic = (scene: Phaser.Scene, musicKey: string) =>
  scene.sound.play(musicKey, { volume: MUSIC_VOLUME, loop: true });
