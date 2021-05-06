import officeMusicOgg from "../../assets/audio/music/office.ogg";
import officeMusicMp3 from "../../assets/audio/music/office.mp3";
import { Audio, COMMON_AUDIOS } from "../common/audio";

export const OFFICE_MUSIC = "office";

const AUDIOS: Audio[] = [
  ...COMMON_AUDIOS,
  { key: OFFICE_MUSIC, url: [officeMusicOgg, officeMusicMp3] },
];

export const getAudios = (): Audio[] => AUDIOS;

export const getMusic = (): string => OFFICE_MUSIC;
