import {
  Character,
  DOG_FRAME_SIZE,
  HUMAN_FRAME_SIZE,
} from "../common/characters";
import noeImage from "url:../../assets/sprites/noe.png";
import cobiImage from "url:../../assets/sprites/cobi.png";

export const NOE_KEY = "noe";
export const COBI_KEY = "cobi";

const characters: Character[] = [
  {
    key: NOE_KEY,
    frame: 10,
    image: noeImage,
    size: HUMAN_FRAME_SIZE,
  },
  {
    key: COBI_KEY,
    frame: 5,
    image: cobiImage,
    size: DOG_FRAME_SIZE,
  },
];

export const getCharacters = () => characters;
