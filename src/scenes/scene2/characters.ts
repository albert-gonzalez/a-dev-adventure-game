import { HUMAN_FRAME_SIZE } from "../common/characters";
import bossImage from "url:../../assets/sprites/boss.png";
import ccImage from "url:../../assets/sprites/cc.png";
import rsImage from "url:../../assets/sprites/rs.png";
import snImage from "url:../../assets/sprites/sn.png";
import efImage from "url:../../assets/sprites/ef.png";
import ejImage from "url:../../assets/sprites/ej.png";
import { SpriteSheet } from "../common/images";

export const BOSS_KEY = "boss";
export const CC_KEY = "cc";
export const RS_KEY = "rs";
export const SN_KEY = "sn";
export const EF_KEY = "ef";
export const EJ_KEY = "ej";

const characters: { [key: string]: SpriteSheet } = {
  [BOSS_KEY]: {
    key: BOSS_KEY,
    frame: 10,
    image: bossImage,
    size: HUMAN_FRAME_SIZE,
  },
  [CC_KEY]: {
    key: CC_KEY,
    frame: 1,
    image: ccImage,
    size: HUMAN_FRAME_SIZE,
  },
  [RS_KEY]: {
    key: RS_KEY,
    frame: 1,
    image: rsImage,
    size: HUMAN_FRAME_SIZE,
  },
  [SN_KEY]: {
    key: SN_KEY,
    frame: 1,
    image: snImage,
    size: HUMAN_FRAME_SIZE,
  },
  [EF_KEY]: {
    key: EF_KEY,
    frame: 1,
    image: efImage,
    size: HUMAN_FRAME_SIZE,
  },
  [EJ_KEY]: {
    key: EJ_KEY,
    frame: 1,
    image: ejImage,
    size: HUMAN_FRAME_SIZE,
  },
};

export const getCharacters = () => characters;
