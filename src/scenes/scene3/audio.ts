import combatMusic from "url:../../assets/audio/music/home.ogg";
import { Audio, COMMON_AUDIOS } from "../common/map/audio";

export const COMBAT_MUSIC = "combat";

const AUDIOS: Audio[] = [
  ...COMMON_AUDIOS,
  { key: COMBAT_MUSIC, url: combatMusic },
];

export const getAudios = () => AUDIOS;

export const getMusic = () => COMBAT_MUSIC;
