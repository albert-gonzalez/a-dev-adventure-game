import { createSceneMethods } from "../common/scene";
import { getImages, getSpriteSheets } from "./images";
import officeJson from "url:../../assets/tilemaps/office.json";
import { getCharacters } from "./characters";
import { getActions } from "./actions";
import { getAudios, getMusic } from "./audio";
import { createInitScene } from "./cutScenes";

const MAP_KEY = "office";
export const SCENE_2_KEY = "scene2";

const createSceneConfig = () => {
  return createSceneMethods({
    initialCutScene: createInitScene(),
    audios: getAudios(),
    music: getMusic(),
    spriteSheets: getSpriteSheets(),
    images: getImages(),
    map: { key: MAP_KEY, data: officeJson },
    characters: getCharacters(),
    dynamicObjects: [],
    actions: getActions(),
  });
};

export const scene2Config = createSceneConfig();
