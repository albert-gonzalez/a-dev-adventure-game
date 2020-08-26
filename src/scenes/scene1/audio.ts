import homeMusic from "url:../../assets/audio/music/home.ogg";
import selectEffect from "url:../../assets/audio/effects/select.ogg";
import waterEffect from "url:../../assets/audio/effects/water.ogg";
import coffeeEffect from "url:../../assets/audio/effects/coffee.ogg";
import { Audio } from "../common/audio";

export const HOME_MUSIC = "home";
export const HOME_SELECT_EFFECT = "select";
export const HOME_WATER_EFFECT = "water";
export const HOME_COFFEE_EFFECT = "coffee";

const AUDIOS: Audio[] = [
  { key: HOME_MUSIC, url: homeMusic },
  { key: HOME_SELECT_EFFECT, url: selectEffect },
  { key: HOME_WATER_EFFECT, url: waterEffect },
  { key: HOME_COFFEE_EFFECT, url: coffeeEffect },
];

export const getAudios = () => AUDIOS;
