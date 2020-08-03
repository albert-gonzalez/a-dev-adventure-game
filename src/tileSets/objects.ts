import "phaser";
import { findPropertyByName } from "../gameObjects/properties";

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
  bodyType?: number
) => {
  const objects = map.createFromObjects(layerName, objectId, spriteConfig);
  map.scene.physics.world.enable(objects, bodyType);

  objects.forEach((object) => {
    if (findPropertyByName(object, "action")) {
      object.setVisible(false);
      object.y += (object.body as Phaser.Physics.Arcade.Body).height;
    }
  });

  return objects;
};
