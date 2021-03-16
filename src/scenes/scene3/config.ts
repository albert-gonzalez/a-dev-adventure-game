import { BUG_KEY, getImages, getSpriteSheets } from "./images";
import { getAudios, getMusic } from "./audio";
import { createInitScene } from "./cutScenes";
import { createSceneMethods } from "../common/combat/scene";

export const SCENE_3_KEY = "scene3";

const createSceneConfig = () => {
  return createSceneMethods({
    initialCutScene: createInitScene(),
    audios: getAudios(),
    music: getMusic(),
    spriteSheets: getSpriteSheets(),
    images: getImages(),
    enemy: BUG_KEY,
  });
};

export const scene3Config = createSceneConfig();
