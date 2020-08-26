import "phaser";
import { findPropertyByName } from "../gameObjects/properties";
import {
  STANDING_NPC_BOUNDING_BOX_HEIGHT,
  STANDING_NPC_BOUNDING_BOX_OFFSET,
} from "../scenes/common/characters";

export interface TileSetGameObjectConfig
  extends Phaser.Types.GameObjects.GameObjectConfig {
  key?: string;
  frame?: number | string;
}

export const createObjectsFromMap = (
  map: Phaser.Tilemaps.Tilemap,
  layerName: string,
  objectId: string | number,
  spriteConfig: TileSetGameObjectConfig = {},
  bodyType?: number,
  transformationFn?: (object: Phaser.GameObjects.Sprite) => void
) => {
  const objects = map.createFromObjects(layerName, objectId, spriteConfig);
  map.scene.physics.world.enable(objects, bodyType);

  transformationFn && objects.forEach(transformationFn);

  return objects;
};
