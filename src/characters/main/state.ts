import { GameState } from "../../state/state";

export const HP_UPDATED_EVENT = "HPUpdated";

export const updateHP = (state: GameState, value: number) => {
  state.albert.hp += value;
  state.scene.phaser?.events.emit(HP_UPDATED_EVENT);
};
