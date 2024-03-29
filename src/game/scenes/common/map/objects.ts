import { GameState } from "../../../state/state";
import { createObjectsFromMap } from "../../../tileSets/objects";

const DYNAMIC_OBJECT_LAYER = "dynamicObjects";

export interface DynamicObjectInfo {
  objectId: string;
  frame: number;
  tileMapKey: string;
  depth?: number;
}

export const insertDynamicObjectsIntoScene = (
  map: Phaser.Tilemaps.Tilemap,
  state: GameState,
  objects: DynamicObjectInfo[]
): void => {
  objects.forEach((object) => {
    state.scene.objectSprites[object.objectId] = createObjectsFromMap(
      map,
      DYNAMIC_OBJECT_LAYER,
      {
        frame: object.frame,
        key: object.tileMapKey,
        name: object.objectId,
      },
      undefined,
      transformObject(object)
    )[0];
  });
};

const transformObject = (object: DynamicObjectInfo) => {
  return (sprite: Phaser.GameObjects.Sprite) => {
    if (object.depth) {
      sprite.setDepth(object.depth);
    }
  };
};
