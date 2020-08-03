import { FOREGROUND_DEPTH, MIDDLE_GROUND_DEPTH } from "../common/constants";

const NOTEBOOK_KEY = "albert_notebook";

const objects = [
  {
    objectId: NOTEBOOK_KEY,
    frame: 150,
    tilemapKey: "objects",
    depth: MIDDLE_GROUND_DEPTH,
  },
  {
    objectId: "noe_notebook",
    frame: 151,
    tilemapKey: "objects",
  },
];

export const getObjects = () => objects;
