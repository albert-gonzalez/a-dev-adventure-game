import {
  HUMAN_FRAME_SIZE,
  SITTING_NPC_BOUNDING_BOX,
} from "../common/characters";
import bossImage from "url:../../assets/sprites/boss.png";
import ccImage from "url:../../assets/sprites/cc.png";
import rsImage from "url:../../assets/sprites/rs.png";
import snImage from "url:../../assets/sprites/sn.png";
import efImage from "url:../../assets/sprites/ef.png";
import ejImage from "url:../../assets/sprites/ej.png";
import fsImage from "url:../../assets/sprites/fs.png";
import rmImage from "url:../../assets/sprites/rm.png";
import seImage from "url:../../assets/sprites/se.png";
import wgImage from "url:../../assets/sprites/wg.png";
import jaImage from "url:../../assets/sprites/ja.png";
import mfImage from "url:../../assets/sprites/mf.png";
import yfImage from "url:../../assets/sprites/yf.png";
import emptyChairImage from "url:../../assets/sprites/emptyChair.png";
import { SpriteSheet } from "../common/images";

export const BOSS_KEY = "boss";
export const CC_KEY = "cc";
export const RS_KEY = "rs";
export const SN_KEY = "sn";
export const EF_KEY = "ef";
export const EJ_KEY = "ej";
export const FS_KEY = "fs";
export const RM_KEY = "rm";
export const SE_KEY = "se";
export const WG_KEY = "wg";
export const JA_KEY = "ja";
export const MF_KEY = "mf";
export const MF_SITTING_KEY = "mf_sitting";
export const YF_KEY = "yf";
export const EMPTY_CHAIR_KEY = "emptyChair";

const characters: { [key: string]: SpriteSheet } = {
  [BOSS_KEY]: {
    key: BOSS_KEY,
    frame: 10,
    image: bossImage,
    size: HUMAN_FRAME_SIZE,
  },
  [MF_KEY]: {
    key: MF_KEY,
    frame: 10,
    image: mfImage,
    size: HUMAN_FRAME_SIZE,
  },
  [CC_KEY]: {
    key: CC_KEY,
    frame: 1,
    image: ccImage,
    size: HUMAN_FRAME_SIZE,
    boundingBox: SITTING_NPC_BOUNDING_BOX,
  },
  [RS_KEY]: {
    key: RS_KEY,
    frame: 1,
    image: rsImage,
    size: HUMAN_FRAME_SIZE,
    boundingBox: SITTING_NPC_BOUNDING_BOX,
  },
  [SN_KEY]: {
    key: SN_KEY,
    frame: 1,
    image: snImage,
    size: HUMAN_FRAME_SIZE,
    boundingBox: SITTING_NPC_BOUNDING_BOX,
  },
  [EF_KEY]: {
    key: EF_KEY,
    frame: 1,
    image: efImage,
    size: HUMAN_FRAME_SIZE,
    boundingBox: SITTING_NPC_BOUNDING_BOX,
  },
  [EJ_KEY]: {
    key: EJ_KEY,
    frame: 1,
    image: ejImage,
    size: HUMAN_FRAME_SIZE,
    boundingBox: SITTING_NPC_BOUNDING_BOX,
  },
  [FS_KEY]: {
    key: FS_KEY,
    frame: 1,
    image: fsImage,
    size: HUMAN_FRAME_SIZE,
    boundingBox: SITTING_NPC_BOUNDING_BOX,
  },
  [RM_KEY]: {
    key: RM_KEY,
    frame: 1,
    image: rmImage,
    size: HUMAN_FRAME_SIZE,
    boundingBox: SITTING_NPC_BOUNDING_BOX,
  },
  [SE_KEY]: {
    key: SE_KEY,
    frame: 1,
    image: seImage,
    size: HUMAN_FRAME_SIZE,
    boundingBox: SITTING_NPC_BOUNDING_BOX,
  },
  [WG_KEY]: {
    key: WG_KEY,
    frame: 1,
    image: wgImage,
    size: HUMAN_FRAME_SIZE,
    boundingBox: SITTING_NPC_BOUNDING_BOX,
  },
  [JA_KEY]: {
    key: JA_KEY,
    frame: 1,
    image: jaImage,
    size: HUMAN_FRAME_SIZE,
    boundingBox: SITTING_NPC_BOUNDING_BOX,
  },
  [YF_KEY]: {
    key: YF_KEY,
    frame: 1,
    image: yfImage,
    size: HUMAN_FRAME_SIZE,
    boundingBox: SITTING_NPC_BOUNDING_BOX,
  },
  [EMPTY_CHAIR_KEY]: {
    key: EMPTY_CHAIR_KEY,
    frame: 1,
    image: emptyChairImage,
    size: HUMAN_FRAME_SIZE,
    boundingBox: SITTING_NPC_BOUNDING_BOX,
  },
};

export const getCharacters = () => characters;
