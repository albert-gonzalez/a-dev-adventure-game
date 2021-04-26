import { getImages, getSpriteSheets } from "./images";
import { getAudios, getMusic } from "./audio";
import { createInitScene } from "./cutScenes";
import { createSceneMethods } from "../common/combat/scene";
import { getEnemyConfig } from "./enemy";

export const SCENE_3_KEY = "scene3";

const createSceneConfig = () => {
  return createSceneMethods({
    initialCutScene: createInitScene(),
    audios: getAudios(),
    music: getMusic(),
    spriteSheets: getSpriteSheets(),
    images: getImages(),
    enemy: getEnemyConfig(),
  });
};

export const scene3Config = createSceneConfig();
