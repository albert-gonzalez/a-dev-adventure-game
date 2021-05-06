import homeMusicOgg from "../../assets/audio/music/home.ogg";
import homeMusicMp3 from "../../assets/audio/music/home.mp3";
import waterEffectOgg from "../../assets/audio/effects/water.ogg";
import waterEffectMp3 from "../../assets/audio/effects/water.mp3";
import { Audio, COMMON_AUDIOS } from "../common/audio";

export const HOME_MUSIC = "home";
export const HOME_WATER_EFFECT = "water";

const AUDIOS: Audio[] = [
  ...COMMON_AUDIOS,
  { key: HOME_MUSIC, url: [homeMusicOgg, homeMusicMp3] },
  { key: HOME_WATER_EFFECT, url: [waterEffectOgg, waterEffectMp3] },
];

export const getAudios = (): Audio[] => AUDIOS;
