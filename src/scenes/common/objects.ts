import { GameState } from "../../state/state";
import { createObjectsFromMap } from "../../tileSets/objects";

const DYNAMIC_OBJECT_LAYER = "dynamicObjects";

export interface DynamicObjectInfo {
  objectId: string;
  frame: number;
  tilemapKey: string;
  depth?: number;
}

export const insertDynamicObjectsIntoScene = (
  map: Phaser.Tilemaps.Tilemap,
  state: GameState,
  objects: DynamicObjectInfo[]
) => {
  objects.forEach((object) => {
    state.scene.objects[object.objectId] = createObjectsFromMap(
      map,
      DYNAMIC_OBJECT_LAYER,
      object.objectId,
      {
        frame: object.frame,
        key: object.tilemapKey,
      }
    )[0];

    if (object.depth) {
      state.scene.objects[object.objectId].setDepth(object.depth);
    }
  });
};
