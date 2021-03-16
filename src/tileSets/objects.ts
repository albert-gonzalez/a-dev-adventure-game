import "phaser";
import { findPropertyByName } from "../gameObjects/properties";
import {
  STANDING_NPC_BOUNDING_BOX_HEIGHT,
  STANDING_NPC_BOUNDING_BOX_OFFSET,
} from "../scenes/common/map/characters";

export interface TileSetGameObjectConfig
  extends Phaser.Types.Tilemaps.CreateFromObjectLayerConfig {
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
  const objects = map.createFromObjects(
    layerName,
    spriteConfig
  ) as Phaser.GameObjects.Sprite[];
  map.scene.physics.world.enable(objects, bodyType);

  transformationFn && objects.forEach(transformationFn);

  return objects;
};
