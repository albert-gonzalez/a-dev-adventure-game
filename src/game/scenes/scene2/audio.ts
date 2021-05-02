import homeMusic from "../../assets/audio/music/office.ogg";
import { Audio, COMMON_AUDIOS } from "../common/audio";

export const OFFICE_MUSIC = "office";

const AUDIOS: Audio[] = [
  ...COMMON_AUDIOS,
  { key: OFFICE_MUSIC, url: homeMusic },
];

export const getAudios = (): Audio[] => AUDIOS;

export const getMusic = (): string => OFFICE_MUSIC;
