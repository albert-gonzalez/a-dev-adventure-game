import {
  ENEMY_HEIGHT,
  ENEMY_WIDTH,
  Image,
  SpriteSheet,
} from "../common/map/images";

import bugImage from "../../assets/sprites/bug.png";
import combatBackground from "../../assets/sprites/battleBackground.png";
import gameOverImage from "../../assets/sprites/gameOver.png";
import endingImage from "../../assets/sprites/ending.png";
import {
  COMBAT_BACKGROUND_KEY,
  ENDING_KEY,
  GAME_OVER_KEY,
} from "../common/combat/images";
import { getEnemyConfig } from "./enemy";

const IMAGES: Image[] = [
  { key: COMBAT_BACKGROUND_KEY, image: combatBackground },
  { key: GAME_OVER_KEY, image: gameOverImage },
  { key: ENDING_KEY, image: endingImage },
];

const SPRITE_SHEETS: SpriteSheet[] = [
  {
    key: getEnemyConfig().key,
    image: bugImage,
    size: { frameWidth: ENEMY_WIDTH, frameHeight: ENEMY_HEIGHT },
  },
];

export const getImages = () => IMAGES;

export const getSpriteSheets = () => SPRITE_SHEETS;
