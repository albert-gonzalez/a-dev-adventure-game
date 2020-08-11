import { Inventory } from "../inventory/current";
import { Dialog } from "../menus/dialog";

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
    objects: { [key: string]: Phaser.GameObjects.Sprite };
    characters: { [key: string]: Phaser.GameObjects.Sprite };
    events: { [key: string]: boolean };
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
    objects: {},
    characters: {},
    events: {},
  },
};

export const getState = (): GameState => {
  return state;
};
