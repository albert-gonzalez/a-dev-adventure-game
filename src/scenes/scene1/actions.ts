import { SceneActions } from "../common/actions";
import { GameState } from "../../state/state";
import { createShowerCutScene, noteBookCutscene } from "./cutScenes";
import { DOWN, LEFT, UP } from "../../input/input";
import { updateHP } from "../../characters/main/state";
import { SHOWER_EVENT } from "./events";
import {
  CLOTHES_KEY,
  COFFEE_CUP_KEY,
  NOTEBOOK_KEY,
} from "../../inventory/itemRepository";
import { createCoffeeCutScene } from "../common/cutScenes";
import { startSceneTransition } from "../common/scene";
import { SCENE_2_KEY } from "../scene2/config";

const COFFEE_MACHINE_X = 370;
const COFFEE_MACHINE_Y = 765;

const actions: SceneActions = {
  wardrobe: {
    activationDirections: [DOWN],
    states: [
      {
        texts: [{ text: "wardrobe_1" }],
      },
      {
        texts: [{ text: "wardrobe_2" }],
        itemKeys: ["clothes"],
      },
      {
        texts: [{ text: "wardrobe_3" }],
      },
    ],
  },
  wardrobe_no_up: {
    activationDirections: [UP],
    states: [
      {
        texts: [{ text: "wardrobe_no_clothes" }],
      },
    ],
  },
  wardrobe_no_down: {
    activationDirections: [DOWN],
    states: [
      {
        texts: [{ text: "wardrobe_no_clothes" }],
      },
    ],
  },
  bathroom: {
    activationDirections: [UP],
    states: [
      {
        texts: [{ text: "bathroom_1" }],
        textsFailure: [{ text: "bathroom_fail_1" }],
        condition: (state: GameState) => CLOTHES_KEY in state.inventory,
        updateState: (state: GameState) => updateHP(state, 25),
        cutScene: createShowerCutScene(),
      },
    ],
    removeAfterLastState: true,
  },
  noe_desktop: {
    activationDirections: [UP, LEFT],
    states: [
      {
        texts: [{ text: "noe_desktop" }],
      },
    ],
  },
  albert_desktop: {
    activationDirections: [DOWN, LEFT],
    states: [
      {
        texts: [{ text: "albert_desktop" }],
        textsFailure: [{ text: "albert_desktop_fail" }],
        itemKeys: ["notebook"],
        condition: (state: GameState) => SHOWER_EVENT in state.scene.events,
        cutScene: noteBookCutscene,
      },
      {
        texts: [{ text: "albert_desktop_2" }],
      },
    ],
  },
  shelves_1: {
    activationDirections: [UP],
    states: [
      {
        texts: [{ text: "shelves_1" }],
      },
    ],
  },
  shelves_2: {
    activationDirections: [UP],
    states: [
      {
        texts: [{ text: "shelves_2" }],
      },
    ],
  },
  shelves_3: {
    activationDirections: [DOWN],
    states: [
      {
        texts: [{ text: "shelves_3" }],
      },
    ],
  },
  shelves_4: {
    activationDirections: [DOWN],
    states: [
      {
        texts: [{ text: "shelves_4" }],
      },
    ],
  },
  tv: {
    activationDirections: [DOWN],
    states: [
      {
        texts: [{ text: "tv" }],
      },
    ],
  },
  couch: {
    activationDirections: [UP],
    states: [
      {
        texts: [{ text: "couch" }],
      },
    ],
  },
  door: {
    activationDirections: [LEFT],
    states: [
      {
        texts: [{ text: "door" }],
        textsFailure: [{ text: "door_fail" }],
        condition: (state: GameState) => NOTEBOOK_KEY in state.inventory,
        cutScene: startSceneTransition(SCENE_2_KEY),
      },
    ],
  },
  microwave: {
    activationDirections: [UP],
    states: [
      {
        texts: [{ text: "microwave" }],
      },
    ],
  },
  coffee_machine: {
    activationDirections: [UP],
    states: [
      {
        texts: [{ text: "coffee_machine_1" }],
        updateState: (state: GameState) => updateHP(state, 25),
        cutScene: createCoffeeCutScene(
          [{ text: "ellipsis" }, { text: "coffee_machine_2" }],
          COFFEE_MACHINE_X,
          COFFEE_MACHINE_Y
        ),
      },
      {
        texts: [{ text: "coffee_machine_3" }],
        itemKeys: [COFFEE_CUP_KEY],
        cutScene: createCoffeeCutScene([], COFFEE_MACHINE_X, COFFEE_MACHINE_Y),
      },
      {
        texts: [{ text: "coffee_machine_4" }],
      },
    ],
  },
  fridge: {
    activationDirections: [DOWN],
    states: [
      {
        texts: [{ text: "fridge" }],
      },
    ],
  },
};

export const getActions = () => actions;
