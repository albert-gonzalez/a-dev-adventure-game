import homeMusic from "url:../../assets/audio/music/home.ogg";
import waterEffect from "url:../../assets/audio/effects/water.ogg";
import { Audio, COMMON_AUDIOS } from "../common/map/audio";

export const HOME_MUSIC = "home";
export const HOME_WATER_EFFECT = "water";

const AUDIOS: Audio[] = [
  ...COMMON_AUDIOS,
  { key: HOME_MUSIC, url: homeMusic },
  { key: HOME_WATER_EFFECT, url: waterEffect },
];

export const getAudios = () => AUDIOS;
