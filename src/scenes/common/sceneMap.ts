import { FOREGROUND_DEPTH, MIDDLE_GROUND_DEPTH } from "./constants";

export interface SceneMap {
  key: string;
  data: string;
}

export const loadMap = (scene: Phaser.Scene, { key, data }: SceneMap) => {
  scene.load.tilemapTiledJSON(key, data);
};

export const createMap = (key: string, scene: Phaser.Scene) => {
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
