import { SceneActions } from "../common/map/actions";
import { GameState } from "../../state/state";
import { createShowerCutScene, noteBookCutscene } from "./cutScenes";
import { DOWN, LEFT, UP } from "../../input/input";
import { SHOWER_EVENT } from "./events";
import {
  CLOTHES_KEY,
  COFFEE_CUP_KEY,
  NOTEBOOK_KEY,
} from "../../inventory/itemRepository";
import { createCoffeeCutScene } from "../common/map/cutScenes";
import { startSceneTransition } from "../common/map/scene";
import { SCENE_2_KEY } from "../scene2/config";

const COFFEE_MACHINE_X = 370;
const COFFEE_MACHINE_Y = 765;

const actions: SceneActions = {
  wardrobe: {
    activationDirections: [DOWN],
    states: [
      {
        texts: [{ text: "wardrobe1" }],
      },
      {
        texts: [{ text: "wardrobe2" }],
        itemKeys: ["clothes"],
      },
      {
        texts: [{ text: "wardrobe3" }],
      },
    ],
  },
  wardrobe_no_up: {
    activationDirections: [UP],
    states: [
      {
        texts: [{ text: "wardrobeNoClothes" }],
      },
    ],
  },
  wardrobe_no_down: {
    activationDirections: [DOWN],
    states: [
      {
        texts: [{ text: "wardrobeNoClothes" }],
      },
    ],
  },
  bathroom: {
    activationDirections: [UP],
    states: [
      {
        texts: [{ text: "bathroom1" }],
        textsFailure: [{ text: "bathroomFail1" }],
        condition: (state: GameState) =>
          !!state.inventory.getByKey(CLOTHES_KEY),
        updateState: (state: GameState) => {
          state.albert.updateHp(25);
          state.inventory.decreaseQuantity(
            state.inventory.getIndexByKey(CLOTHES_KEY),
            state.scene.phaser as Phaser.Scene
          );
        },
        cutScene: createShowerCutScene(),
      },
    ],
    removeAfterLastState: true,
  },
  noe_desktop: {
    activationDirections: [UP, LEFT],
    states: [
      {
        texts: [{ text: "noeDesktop" }],
      },
    ],
  },
  albert_desktop: {
    activationDirections: [DOWN, LEFT],
    states: [
      {
        texts: [{ text: "albertDesktop" }],
        textsFailure: [{ text: "albertDesktopFail" }],
        itemKeys: ["notebook"],
        condition: (state: GameState) => SHOWER_EVENT in state.scene.events,
        cutScene: noteBookCutscene,
      },
      {
        texts: [{ text: "albertDesktop2" }],
      },
    ],
  },
  shelves_1: {
    activationDirections: [UP],
    states: [
      {
        texts: [{ text: "shelves1" }],
      },
    ],
  },
  shelves_2: {
    activationDirections: [UP],
    states: [
      {
        texts: [{ text: "shelves2" }],
      },
    ],
  },
  shelves_3: {
    activationDirections: [DOWN],
    states: [
      {
        texts: [{ text: "shelves3" }],
      },
    ],
  },
  shelves_4: {
    activationDirections: [DOWN],
    states: [
      {
        texts: [{ text: "shelves4" }],
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
        textsFailure: [{ text: "doorFail" }],
        condition: (state: GameState) =>
          !!state.inventory.getByKey(NOTEBOOK_KEY),
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
        texts: [{ text: "coffeeMachine1" }],
        updateState: (state: GameState) => state.albert.updateHp(25),
        cutScene: createCoffeeCutScene(
          [{ text: "ellipsis" }, { text: "coffeeMachine2" }],
          COFFEE_MACHINE_X,
          COFFEE_MACHINE_Y
        ),
      },
      {
        texts: [{ text: "coffeeMachine3" }],
        itemKeys: [COFFEE_CUP_KEY],
        cutScene: createCoffeeCutScene([], COFFEE_MACHINE_X, COFFEE_MACHINE_Y),
      },
      {
        texts: [{ text: "coffeeMachine4" }],
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

export const getActions = (): SceneActions => actions;
