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
        texts: [{ text: "rr_1", who: BOSS_KEY }],
      },
    ],
  },
  [MF_KEY]: {
    characterKey: MF_KEY,
    states: [
      {
        texts: [{ text: "mf_1", who: MF_KEY }],
      },
      {
        texts: [{ text: "mf_2", who: MF_KEY }],
      },
    ],
  },
  [MF_SITTING_KEY]: {
    characterKey: MF_SITTING_KEY,
    states: [
      {
        texts: [
          { text: "mf_3", who: MF_KEY },
          { text: "mf_4", who: MF_KEY },
        ],
      },
    ],
    disabled: true,
  },
  [RS_KEY]: {
    states: [
      {
        texts: [
          { text: "rs_1", who: RS_KEY },
          { text: "rs_2", who: RS_KEY },
        ],
      },
    ],
  },
  [CC_KEY]: {
    states: [
      {
        texts: [
          { text: "cc_1", who: CC_KEY },
          { text: "cc_2", who: CC_KEY },
        ],
      },
    ],
  },
  [SN_KEY]: {
    states: [
      {
        texts: [
          { text: "sn_1", who: SN_KEY },
          { text: "sn_2", who: SN_KEY },
        ],
      },
    ],
  },
  [SE_KEY]: {
    states: [
      {
        texts: [{ text: "se_1", who: SE_KEY }],
      },
    ],
  },
  [RM_KEY]: {
    states: [
      {
        texts: [{ text: "rm_1", who: RM_KEY }],
      },
    ],
  },
  [EF_KEY]: {
    states: [
      {
        texts: [
          { text: "ef_1", who: EF_KEY },
          { text: "ef_2", who: EF_KEY },
        ],
      },
    ],
  },
  [EJ_KEY]: {
    states: [
      {
        texts: [
          { text: "ej_1", who: EJ_KEY },
          { text: "ej_2", who: EJ_KEY },
        ],
      },
    ],
  },
  [FS_KEY]: {
    states: [
      {
        texts: [{ text: "fs_1", who: FS_KEY }],
      },
    ],
  },
  [WG_KEY]: {
    states: [
      {
        texts: [
          { text: "wg_1", who: WG_KEY },
          { text: "wg_2", who: WG_KEY },
        ],
      },
    ],
  },
  [JA_KEY]: {
    states: [
      {
        texts: [{ text: "ja_1", who: JA_KEY }],
      },
    ],
  },
  [YF_KEY]: {
    states: [
      {
        texts: [{ text: "yf_1", who: YF_KEY }],
      },
    ],
  },
  tv: {
    states: [
      {
        texts: [{ text: "tv_1" }],
      },
    ],
  },
  arcade: {
    states: [
      {
        texts: [{ text: "arcade_1", who: MF_KEY }],
        cutScene: createArcadeCutscene(),
        updateState: (state: GameState) =>
          state.combat.skills.add(
            pairProgrammingSkill,
            state.scene.phaser as Phaser.Scene
          ),
      },
      {
        texts: [{ text: "arcade_2" }],
      },
    ],
  },
  library: {
    states: [
      {
        texts: [{ text: "library_1" }],
      },
      {
        texts: [{ text: "library_2" }],
        itemKeys: [FLJ_BOOK_KEY],
      },
      {
        texts: [{ text: "library_3" }],
      },
    ],
  },
  lockers: {
    states: [
      {
        texts: [{ text: "lockers_1" }],
      },
    ],
  },
  bathroom: {
    states: [
      {
        texts: [{ text: "office_bathroom_1" }],
      },
    ],
  },
  office_stuff: {
    states: [
      {
        texts: [{ text: "office_stuff_1" }],
      },
    ],
  },
  dining_table: {
    states: [
      {
        texts: [{ text: "dining_table_1" }],
      },
    ],
  },
  coffee_machine: {
    states: [
      {
        texts: [{ text: "office_coffee_machine_1" }],
        itemKeys: [COFFEE_CUP_KEY],
        cutScene: createCoffeeCutScene([], 1136, 410),
      },
      {
        texts: [{ text: "office_coffee_machine_2" }],
      },
    ],
  },
  microwave: {
    states: [
      {
        texts: [{ text: "office_microwave_1" }],
      },
    ],
  },
  fridge: {
    states: [
      {
        texts: [{ text: "office_fridge_1" }],
      },
      {
        texts: [{ text: "office_fridge_2" }],
        itemKeys: [DONUT_KEY],
      },
      {
        texts: [{ text: "office_fridge_1" }],
      },
    ],
  },
  meeting_room: {
    states: [
      {
        texts: [{ text: "meeting_room_1" }],
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
