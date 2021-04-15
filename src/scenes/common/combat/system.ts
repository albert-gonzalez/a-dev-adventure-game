import { getState } from "../../../state/state";

enum States {
  WAITING,
  RUNNING_ACTION,
  ENEMY_ATTACK,
  ENEMY_ATTACKING,
}

export const createTurnFunction = (): (() => boolean) => {
  let currentCombatState: States = States.WAITING;

  return (): boolean => {
    const state = getState();

    if (currentCombatState === States.WAITING) {
      if (!state.combat.pendingAction) {
        return false;
      }

      state.combat
        .pendingAction()
        .then(() => (currentCombatState = States.ENEMY_ATTACK));

      state.combat.pendingAction = undefined;
      currentCombatState = States.RUNNING_ACTION;

      return true;
    }

    if (currentCombatState === States.RUNNING_ACTION) {
      return true;
    }

    if (currentCombatState === States.ENEMY_ATTACK) {
      if (state.dialog?.isDialogOpen() || state.combat.enemy?.isHpEmpty()) {
        return false;
      }

      state.combat.enemy
        ?.attack()
        .then(() => (currentCombatState = States.WAITING));
      currentCombatState = States.ENEMY_ATTACKING;

      return true;
    }

    if (currentCombatState === States.ENEMY_ATTACKING) {
      return true;
    }

    return false;
  };
};

export const attackEnemy = async (): Promise<void> => {
  await getState().albert.attack();
};

export const setPendingAction = (action: () => Promise<void>): void => {
  getState().combat.pendingAction = action;
};
