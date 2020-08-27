import { Inventory } from "../inventory/current";
import { Dialog } from "../menus/dialog";
import { CurrentActionStates, SceneActions } from "../scenes/common/actions";
import { SpriteSheet } from "../scenes/common/images";

interface AlbertState {
  hp: number;
  sprite?: Phaser.GameObjects.Sprite;
  animationPrefix: string;
}

export interface GameState {
  inventory: Inventory;
  cutScene?: (state: GameState) => boolean;
  scene: {
    phaser?: Phaser.Scene;
    objectSprites: { [key: string]: Phaser.GameObjects.Sprite };
    characterSprites: { [key: string]: Phaser.GameObjects.Sprite };
    charactersData: { [key: string]: SpriteSheet };
    events: { [key: string]: boolean };
    actions: SceneActions;
    currentActionStates: CurrentActionStates;
  };
  albert: AlbertState;
  dialog?: Dialog;
  input: {
    isActionJustPressed: boolean;
    touch: {
      action: boolean;
      up: boolean;
      down: boolean;
      left: boolean;
      right: boolean;
      toggleSound: boolean;
      toggleFullScreen: boolean;
      menu: boolean;
    };
  };
}

const state: GameState = {
  inventory: {},
  albert: {
    hp: 50,
    animationPrefix: "",
  },
  input: {
    isActionJustPressed: false,
    touch: {
      action: false,
      up: false,
      down: false,
      right: false,
      left: false,
      toggleSound: false,
      menu: false,
    },
  },
  scene: {
    objectSprites: {},
    characterSprites: {},
    events: {},
    actions: {},
    currentActionStates: {},
    charactersData: {},
  },
};

export const getState = (): GameState => {
  return state;
};
