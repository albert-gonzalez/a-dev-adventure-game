import { MIDDLE_GROUND_DEPTH } from "../common/map/constants";
import { DynamicObjectInfo } from "../common/map/objects";

const NOTEBOOK_KEY = "albert_notebook";

const objects: DynamicObjectInfo[] = [
  {
    objectId: NOTEBOOK_KEY,
    frame: 150,
    tileMapKey: "objects",
    depth: MIDDLE_GROUND_DEPTH,
  },
  {
    objectId: "noe_notebook",
    frame: 151,
    tileMapKey: "objects",
  },
];

export const getObjects = () => objects;
