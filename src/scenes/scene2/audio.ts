import homeMusic from "url:../../assets/audio/music/office.ogg";
import { Audio, COMMON_AUDIOS } from "../common/audio";

export const OFFICE_MUSIC = "office";

const AUDIOS: Audio[] = [
  ...COMMON_AUDIOS,
  { key: OFFICE_MUSIC, url: homeMusic },
];

export const getAudios = () => AUDIOS;

export const getMusic = () => OFFICE_MUSIC;
