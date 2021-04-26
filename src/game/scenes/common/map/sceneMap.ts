import { FOREGROUND_DEPTH, MIDDLE_GROUND_DEPTH } from "../constants";

export interface SceneMap {
  key: string;
  data: string;
}

interface MapData {
  map: Phaser.Tilemaps.Tilemap;
  groundCanvas: Phaser.GameObjects.RenderTexture;
  middleGroundCanvas: Phaser.GameObjects.RenderTexture;
  foregroundCanvas: Phaser.GameObjects.RenderTexture;
}

export const loadMap = (scene: Phaser.Scene, { key, data }: SceneMap): void => {
  scene.load.tilemapTiledJSON(key, data);
};

export const createMap = (key: string, scene: Phaser.Scene): MapData => {
  const map = scene.make.tilemap({ key });
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
