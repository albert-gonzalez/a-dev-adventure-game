import { createSceneMethods } from "../common/map/scene";
import { createInitialCutscene } from "./cutScenes";
import { getAudios } from "./audio";
import { getImages, getSpriteSheets } from "./images";
import homeJson from "../../assets/tilemaps/home.jsonc";
import { getObjects } from "./objects";
import { getCharacters } from "./characters";
import { getActions } from "./actions";
import { SLEEPY_PREFIX } from "../common/map/characters";

const MAP_KEY = "home";
export const SCENE_1_KEY = "scene1";

const createSceneConfig = () => {
  return createSceneMethods({
    initialCutScene: createInitialCutscene(),
    audios: getAudios(),
    spriteSheets: getSpriteSheets(),
    images: getImages(),
    initialAnimationPrefix: SLEEPY_PREFIX,
    map: { key: MAP_KEY, data: homeJson },
    dynamicObjects: getObjects(),
    characters: getCharacters(),
    actions: getActions(),
  });
};

export const scene1Config = createSceneConfig();
