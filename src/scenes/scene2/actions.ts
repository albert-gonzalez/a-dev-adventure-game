import { SceneActions } from "../common/actions";
import { BOSS_KEY } from "./characters";

const actions: SceneActions = {
  boss: {
    characterKey: BOSS_KEY,
    states: [
      {
        texts: [{ text: "hehe", who: "boss" }],
      },
    ],
  },
};

export const getActions = () => actions;
