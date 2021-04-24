import { SceneActions } from "../common/map/actions";
import {
  BOSS_KEY,
  CC_KEY,
  EF_KEY,
  EJ_KEY,
  FS_KEY,
  JA_KEY,
  MF_KEY,
  MF_SITTING_KEY,
  RM_KEY,
  RS_KEY,
  SE_KEY,
  SN_KEY,
  WG_KEY,
  YF_KEY,
} from "./characters";
import { createArcadeCutscene } from "./cutScenes";
import {
  COFFEE_CUP_KEY,
  DONUT_KEY,
  FLJ_BOOK_KEY,
  NOTEBOOK_KEY,
} from "../../inventory/itemRepository";
import { createCoffeeCutScene } from "../common/map/cutScenes";
import { GameState } from "../../state/state";
import { startSceneTransition } from "../common/map/scene";
import { SCENE_3_KEY } from "../scene3/config";
import { pairProgrammingSkill } from "../common/combat/skills";

const actions: SceneActions = {
  [BOSS_KEY]: {
    characterKey: BOSS_KEY,
    states: [
      {
        texts: [{ text: "rr1", who: BOSS_KEY }],
      },
    ],
  },
  [MF_KEY]: {
    characterKey: MF_KEY,
    states: [
      {
        texts: [{ text: "mf1", who: MF_KEY }],
      },
      {
        texts: [{ text: "mf2", who: MF_KEY }],
      },
    ],
  },
  [MF_SITTING_KEY]: {
    characterKey: MF_SITTING_KEY,
    states: [
      {
        texts: [
          { text: "mf3", who: MF_KEY },
          { text: "mf4", who: MF_KEY },
        ],
      },
    ],
    disabled: true,
  },
  [RS_KEY]: {
    states: [
      {
        texts: [
          { text: "rs1", who: RS_KEY },
          { text: "rs2", who: RS_KEY },
        ],
      },
    ],
  },
  [CC_KEY]: {
    states: [
      {
        texts: [
          { text: "cc1", who: CC_KEY },
          { text: "cc2", who: CC_KEY },
        ],
      },
    ],
  },
  [SN_KEY]: {
    states: [
      {
        texts: [
          { text: "sn1", who: SN_KEY },
          { text: "sn2", who: SN_KEY },
        ],
      },
    ],
  },
  [SE_KEY]: {
    states: [
      {
        texts: [{ text: "se1", who: SE_KEY }],
      },
    ],
  },
  [RM_KEY]: {
    states: [
      {
        texts: [{ text: "rm1", who: RM_KEY }],
      },
    ],
  },
  [EF_KEY]: {
    states: [
      {
        texts: [
          { text: "ef1", who: EF_KEY },
          { text: "ef2", who: EF_KEY },
        ],
      },
    ],
  },
  [EJ_KEY]: {
    states: [
      {
        texts: [
          { text: "ej1", who: EJ_KEY },
          { text: "ej2", who: EJ_KEY },
        ],
      },
    ],
  },
  [FS_KEY]: {
    states: [
      {
        texts: [{ text: "fs1", who: FS_KEY }],
      },
    ],
  },
  [WG_KEY]: {
    states: [
      {
        texts: [
          { text: "wg1", who: WG_KEY },
          { text: "wg2", who: WG_KEY },
        ],
      },
    ],
  },
  [JA_KEY]: {
    states: [
      {
        texts: [{ text: "ja1", who: JA_KEY }],
      },
    ],
  },
  [YF_KEY]: {
    states: [
      {
        texts: [{ text: "yf1", who: YF_KEY }],
      },
    ],
  },
  tv: {
    states: [
      {
        texts: [{ text: "tv1" }],
      },
    ],
  },
  arcade: {
    states: [
      {
        texts: [{ text: "arcade1", who: MF_KEY }],
        cutScene: createArcadeCutscene(),
        updateState: (state: GameState) =>
          state.combat.skills.add(
            pairProgrammingSkill,
            state.scene.phaser as Phaser.Scene
          ),
      },
      {
        texts: [{ text: "arcade2" }],
      },
    ],
  },
  library: {
    states: [
      {
        texts: [{ text: "library1" }],
      },
      {
        texts: [{ text: "library2" }],
        itemKeys: [FLJ_BOOK_KEY],
      },
      {
        texts: [{ text: "library3" }],
      },
    ],
  },
  lockers: {
    states: [
      {
        texts: [{ text: "lockers1" }],
      },
    ],
  },
  bathroom: {
    states: [
      {
        texts: [{ text: "officeBathroom1" }],
      },
    ],
  },
  office_stuff: {
    states: [
      {
        texts: [{ text: "officeStuff1" }],
      },
    ],
  },
  dining_table: {
    states: [
      {
        texts: [{ text: "diningTable1" }],
      },
    ],
  },
  coffee_machine: {
    states: [
      {
        texts: [{ text: "officeCoffeeMachine1" }],
        itemKeys: [COFFEE_CUP_KEY],
        cutScene: createCoffeeCutScene([], 1136, 410),
      },
      {
        texts: [{ text: "officeCoffeeMachine2" }],
      },
    ],
  },
  microwave: {
    states: [
      {
        texts: [{ text: "officeMicrowave1" }],
      },
    ],
  },
  fridge: {
    states: [
      {
        texts: [{ text: "officeFridge1" }],
      },
      {
        texts: [{ text: "officeFridge2" }],
        itemKeys: [DONUT_KEY],
      },
      {
        texts: [{ text: "officeFridge1" }],
      },
    ],
  },
  meeting_room: {
    states: [
      {
        texts: [{ text: "meetingRoom1" }],
      },
    ],
  },
  desk: {
    states: [
      {
        texts: [{ text: "myDesk1" }],
      },
      {
        texts: [{ text: "myDesk2" }],
        updateState: (state: GameState) =>
          state.inventory.decreaseQuantity(
            state.inventory.getIndexByKey(NOTEBOOK_KEY),
            state.scene.phaser as Phaser.Scene
          ),
        cutScene: startSceneTransition(SCENE_3_KEY),
      },
    ],
  },
};

export const getActions = () => actions;
