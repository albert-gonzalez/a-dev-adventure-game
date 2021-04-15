import { createPlayer, Player } from "../characters/common/player";
import { Inventory } from "../inventory/current";
import { Dialog } from "../menus/dialog";
import { Enemy } from "../scenes/common/combat/enemy";
import { CombatSkillSet } from "../scenes/common/combat/skills";
import {
  CurrentActionStates,
  SceneActions,
} from "../scenes/common/map/actions";
import { SpriteSheet } from "../scenes/common/map/images";

export interface GameState {
  inventory: Inventory;
  combat: {
    skills: CombatSkillSet;
    pendingAction?: () => Promise<void>;
    enemy?: Enemy;
  };
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
  albert: Player;
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
  inventory: [
    {
      key: "a",
      name: "a",
      quantity: 1,
    },
    {
      key: "b",
      name: "b",
      quantity: 2,
    },
  ],
  combat: {
    skills: [
      {
        key: "debug",
        name: "debug",
        quantity: 0,
      },
      {
        key: "pairProgramming",
        name: "pairProgramming",
        quantity: 2,
      },
    ],
  },
  albert: createPlayer(),
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
      toggleFullScreen: false,
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
