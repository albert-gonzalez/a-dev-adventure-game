import { createSceneMethods } from "../common/scene";
import { getImages, getSpriteSheets } from "./images";
import officeJson from "url:../../assets/tilemaps/office.json";
import { getCharacters } from "./characters";
import { getActions } from "./actions";
import { getAudios } from "../scene1/audio";

const MAP_KEY = "office";
export const SCENE_2_KEY = "scene2";

const createSceneConfig = () => {
  return createSceneMethods({
    initialCutScene: () => true,
    audios: getAudios(),
    spriteSheets: getSpriteSheets(),
    images: getImages(),
    map: { key: MAP_KEY, data: officeJson },
    characters: getCharacters(),
    dynamicObjects: [],
    actions: getActions(),
  });
};

export const scene2Config = createSceneConfig();
