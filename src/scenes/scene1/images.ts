import { loadCharactersSprites } from "../common/characters";
import { TILE_HEIGHT, TILE_WIDTH } from "../../init";
import roomImage from "url:../../assets/tilemaps/room.png";
import portrait from "url:../../assets/sprites/portrait.png";
import steam from "url:../../assets/sprites/steam.png";
import { loadMainCharacterSprite } from "../../characters/main/creation";
import { getCharacters } from "./characters";
import { createTileSetLayer } from "../../tileSets/tileSets";

const ROOM_IMAGE_KEY = "room";
const OBJECTS_IMAGE_KEY = "objects";
const FOREGROUND_LAYER_ID = "foreground";
const GROUND_LAYER_ID = "ground";
const OBJECTS_LAYER_ID = "objects";
const MIDDLE_GROUND_LAYER_ID = "middleGround";

export const loadImages = (scene: Phaser.Scene) => {
  scene.load.image(ROOM_IMAGE_KEY, roomImage);
  scene.load.spritesheet(OBJECTS_IMAGE_KEY, roomImage, {
    frameWidth: TILE_WIDTH,
    frameHeight: TILE_HEIGHT,
  });
  scene.load.image("portrait", portrait);
  scene.load.image("steam", steam);
  loadMainCharacterSprite(scene);
  loadCharactersSprites(scene, getCharacters());
};

export const createImageObjects = (map: Phaser.Tilemaps.Tilemap) => {
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
  };
};
