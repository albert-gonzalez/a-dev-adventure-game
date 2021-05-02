import roomImage from "../../../assets/tilemaps/room.png";
import portrait from "../../../assets/sprites/portrait.png";
import steam from "../../../assets/sprites/steam.png";
import albertImage from "../../../assets/sprites/albert.png";
import sleepyAlbertImage from "../../../assets/sprites/sleepyAlbert.png";
import { createTileSetLayer } from "../../../tileSets/tileSets";
import { ALBERT_KEY, HUMAN_FRAME_SIZE, SLEEPY_ALBERT_KEY } from "./characters";

const ROOM_IMAGE_KEY = "room";
const OBJECTS_IMAGE_KEY = "objects";
const FOREGROUND_LAYER_ID = "foreground";
const GROUND_LAYER_ID = "ground";
const OBJECTS_LAYER_ID = "objects";
const OBJECTS_OVER_LAYER_ID = "objectsOver";
const MIDDLE_GROUND_LAYER_ID = "middleGround";

export const PORTRAIT_KEY = "portrait";
export const STEAM_KEY = "steam";
export const TILE_HEIGHT = 32;
export const TILE_WIDTH = 32;
export const ENEMY_WIDTH = 256;
export const ENEMY_HEIGHT = 256;

export interface Image {
  key: string;
  image: string;
}

export interface SpriteSheet {
  key: string;
  image: string;
  frame?: number;
  size: {
    frameWidth: number;
    frameHeight: number;
  };
  boundingBox?: {
    height: number;
    offset: number;
  };
  animated?: boolean;
}

export type SpriteSheetSet = Record<string, SpriteSheet>;

export const COMMON_IMAGES: Image[] = [
  { key: ROOM_IMAGE_KEY, image: roomImage },
  { key: PORTRAIT_KEY, image: portrait },
  { key: STEAM_KEY, image: steam },
];

export const COMMON_SPRITE_SHEETS: SpriteSheet[] = [
  {
    key: OBJECTS_IMAGE_KEY,
    image: roomImage,
    size: { frameWidth: TILE_WIDTH, frameHeight: TILE_HEIGHT },
  },
  {
    key: ALBERT_KEY,
    image: albertImage,
    size: HUMAN_FRAME_SIZE,
    animated: true,
  },
  {
    key: SLEEPY_ALBERT_KEY,
    image: sleepyAlbertImage,
    size: HUMAN_FRAME_SIZE,
    animated: true,
  },
];

export const loadImages = (
  scene: Phaser.Scene,
  imagesToLoad: Image[],
  spriteSheetsToLoad: SpriteSheet[]
): void => {
  imagesToLoad.forEach((image) => scene.load.image(image.key, image.image));
  spriteSheetsToLoad.forEach((spriteSheet) => {
    scene.load.spritesheet(spriteSheet.key, spriteSheet.image, {
      ...spriteSheet.size,
    });
  });
};

export const createImageObjects = (
  map: Phaser.Tilemaps.Tilemap
): Record<string, Phaser.Tilemaps.TilemapLayer> => {
  return {
    ground: createTileSetLayer(
      map,
      ROOM_IMAGE_KEY,
      ROOM_IMAGE_KEY,
      GROUND_LAYER_ID
    ),
    foreground: createTileSetLayer(
      map,
      ROOM_IMAGE_KEY,
      ROOM_IMAGE_KEY,
      FOREGROUND_LAYER_ID
    ),
    middleGround: createTileSetLayer(
      map,
      ROOM_IMAGE_KEY,
      ROOM_IMAGE_KEY,
      MIDDLE_GROUND_LAYER_ID
    ),
    objects: createTileSetLayer(
      map,
      ROOM_IMAGE_KEY,
      ROOM_IMAGE_KEY,
      OBJECTS_LAYER_ID
    ),
    objectsOver: createTileSetLayer(
      map,
      ROOM_IMAGE_KEY,
      ROOM_IMAGE_KEY,
      OBJECTS_OVER_LAYER_ID
    ),
  };
};
