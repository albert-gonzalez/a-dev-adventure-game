import { DOG_FRAME_SIZE, HUMAN_FRAME_SIZE } from "../common/map/characters";
import noeImage from "../../assets/sprites/noe.png";
import cobiImage from "../../assets/sprites/cobi.png";
import { SpriteSheetSet } from "../common/map/images";

export const NOE_KEY = "noe";
export const COBI_KEY = "cobi";

const characters: SpriteSheetSet = {
  [NOE_KEY]: {
    key: NOE_KEY,
    frame: 10,
    image: noeImage,
    size: HUMAN_FRAME_SIZE,
    animated: true,
  },
  [COBI_KEY]: {
    key: COBI_KEY,
    frame: 5,
    image: cobiImage,
    size: DOG_FRAME_SIZE,
    animated: true,
  },
};

export const getCharacters = (): SpriteSheetSet => characters;
