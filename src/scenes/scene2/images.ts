import {
  COMMON_IMAGES,
  COMMON_SPRITE_SHEETS,
  Image,
  SpriteSheet,
} from "../common/map/images";
import { getCharacters } from "./characters";

export const IMAGES: Image[] = [...COMMON_IMAGES];

export const SPRITE_SHEETS: SpriteSheet[] = [
  ...COMMON_SPRITE_SHEETS,
  ...Object.values(getCharacters()),
];

export const getImages = () => IMAGES;

export const getSpriteSheets = () => SPRITE_SHEETS;
