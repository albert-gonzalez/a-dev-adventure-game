import {
  ENEMY_HEIGHT,
  ENEMY_WIDTH,
  Image,
  SpriteSheet,
} from "../common/map/images";

import bugImage from "url:../../assets/sprites/bug.png";
import combatBackground from "url:../../assets/sprites/battleBackground.png";
import { COMBAT_BACKGROUND_KEY } from "../common/combat/images";

export const BUG_KEY = "bug";

const IMAGES: Image[] = [
  { key: COMBAT_BACKGROUND_KEY, image: combatBackground },
];

const SPRITE_SHEETS: SpriteSheet[] = [
  {
    key: BUG_KEY,
    image: bugImage,
    size: { frameWidth: ENEMY_WIDTH, frameHeight: ENEMY_HEIGHT },
  },
];

export const getImages = () => IMAGES;

export const getSpriteSheets = () => SPRITE_SHEETS;
