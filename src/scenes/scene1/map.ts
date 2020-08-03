import roomJson from "url:../../assets/tilemaps/home.json";
import { FOREGROUND_DEPTH, MIDDLE_GROUND_DEPTH } from "../common/constants";

const MAP_KEY = "map";

export const loadMap = (scene: Phaser.Scene) => {
  scene.load.tilemapTiledJSON(MAP_KEY, roomJson);
};

export const createMap = (scene: Phaser.Scene) => {
  const map = scene.make.tilemap({ key: MAP_KEY });
  const groundCanvas = scene.add.renderTexture(
    0,
    0,
    map.widthInPixels,
    map.heightInPixels
  );
  const foregroundCanvas = scene.add.renderTexture(
    0,
    0,
    map.widthInPixels,
    map.heightInPixels
  );
  const middleGroundCanvas = scene.add.renderTexture(
    0,
    0,
    map.widthInPixels,
    map.heightInPixels
  );
  middleGroundCanvas.setDepth(MIDDLE_GROUND_DEPTH);
  foregroundCanvas.setDepth(FOREGROUND_DEPTH);

  return {
    map,
    groundCanvas,
    middleGroundCanvas,
    foregroundCanvas,
  };
};
