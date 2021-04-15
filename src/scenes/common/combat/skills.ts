import { getState } from "../../../state/state";

export const COMBAT_SKILLS_UPDATED = "combatSkillsUpdated";

export interface CombatSkill {
  key: string;
  name: string;
  quantity: number;
}

export type CombatSkillSet = CombatSkill[];

export const decreaseSkillQuantity = (
  skillSet: CombatSkillSet,
  itemIndex: number,
  scene: Phaser.Scene
): boolean => {
  let skillInSet = skillSet[itemIndex];

  skillSet = [...skillSet];

  if (!skillInSet || skillInSet.quantity === 0) {
    return false;
  }

  skillInSet = {
    ...skillInSet,
    quantity: skillInSet.quantity - 1,
  };

  skillSet[itemIndex] = skillInSet;

  getState().combat.skills = skillSet;
  scene.events.emit(COMBAT_SKILLS_UPDATED);

  const disabled = skillInSet.quantity === 0;

  return disabled;
};
