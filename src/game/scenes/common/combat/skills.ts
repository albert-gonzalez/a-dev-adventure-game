import { getState } from "../../../state/state";
import { POWER_UP_EFFECT } from "../../scene3/audio";

export const COMBAT_SKILLS_UPDATED = "combatSkillsUpdated";

export interface CombatSkill {
  key: string;
  name: string;
  description: string;
  quantity: number;
  effect?: () => Promise<void>;
}

export interface CombatSkillSet {
  get(index: number): CombatSkill;
  getAll(): CombatSkill[];
  has(index: number): boolean;
  add(skill: CombatSkill, scene: Phaser.Scene): void;
  decreaseQuantity(itemIndex: number, scene: Phaser.Scene): boolean;
}

export interface PowerUp {
  key: string;
  value: number;
  description: string;
  turnsLeft: number;
}

export type PowerUps = Record<string, PowerUp>;

const DEBUG_KEY = "debug";
const PAIR_PROGRAMMING_KEY = "pairProgramming";
const UNIT_TESTING_KEY = "unitTesting";
export const FUNCTIONAL_PROGRAMMING_KEY = "functionalProgramming";

export const ATTACK_POWER_UP_KEY = "attackPowerUp";
export const DEFENSE_POWER_UP_KEY = "defensePowerUp";
export const EXTRA_TURN_POWER_UP_KEY = "extraTurnPowerUp";

const FUNCTIONAL_PROGRAMMING_ATTACK_DAMAGE = 40;

const createPowerUpMethod = (powerUp: PowerUp) => {
  return () => {
    const state = getState();

    state.scene.phaser?.sound.play(POWER_UP_EFFECT);
    state.albert.addPowerUp(powerUp);
    state.dialog?.showDialogBox([{ text: powerUp.description }]);

    return Promise.resolve();
  };
};

const debugSkill = {
  key: DEBUG_KEY,
  name: DEBUG_KEY,
  description: "debugDescription",
  quantity: 2,
  effect: createPowerUpMethod({
    key: ATTACK_POWER_UP_KEY,
    turnsLeft: 2,
    description: "attackPowerUpDescription",
    value: 2,
  }),
};

export const pairProgrammingSkill = {
  key: PAIR_PROGRAMMING_KEY,
  name: PAIR_PROGRAMMING_KEY,
  description: "pairProgrammingDescription",
  quantity: 1,
  effect: createPowerUpMethod({
    key: DEFENSE_POWER_UP_KEY,
    turnsLeft: 2,
    description: "defensePowerUpDescription",
    value: 2,
  }),
};

const unitTestingSkill = {
  key: UNIT_TESTING_KEY,
  name: UNIT_TESTING_KEY,
  description: "unitTestingDescription",
  quantity: 1,
  effect: createPowerUpMethod({
    key: EXTRA_TURN_POWER_UP_KEY,
    turnsLeft: 2,
    description: "extraTurnPowerUpDescription",
    value: 1,
  }),
};

const functionalProgrammingSkill = {
  key: FUNCTIONAL_PROGRAMMING_KEY,
  name: FUNCTIONAL_PROGRAMMING_KEY,
  description: "functionalProgrammingDescription",
  quantity: 1,
  effect: () => {
    const player = getState().albert;

    return player.attack(FUNCTIONAL_PROGRAMMING_ATTACK_DAMAGE);
  },
};

const combatSkillRepository: Record<string, CombatSkill> = {
  [FUNCTIONAL_PROGRAMMING_KEY]: functionalProgrammingSkill,
  [PAIR_PROGRAMMING_KEY]: pairProgrammingSkill,
  [DEBUG_KEY]: debugSkill,
  [UNIT_TESTING_KEY]: unitTestingSkill,
};

export const getCombatSkillFromRepository = (key: string): CombatSkill => ({
  ...combatSkillRepository[key],
});

export const createDefaultCombatSkillSet = (): CombatSkillSet => {
  let combatSkills: CombatSkill[] = [
    { ...debugSkill },
    { ...unitTestingSkill },
  ];
  return {
    getAll() {
      return [...combatSkills];
    },
    get(index) {
      return { ...combatSkills[index] };
    },
    has(index) {
      const skillInSet = combatSkills[index];

      return skillInSet && skillInSet.quantity > 0;
    },
    add(skill, scene) {
      let itemIndex = -1;

      combatSkills = [...combatSkills];

      const skillInSet = combatSkills.find((itemInInventory, index) => {
        itemIndex = index;
        return itemInInventory.key === skill.key;
      });

      if (skillInSet) {
        combatSkills[itemIndex] = {
          ...skill,
          quantity: skillInSet.quantity + 1,
        };

        return;
      }

      combatSkills.push({
        ...skill,
        quantity: 1,
      });

      scene.events.emit(COMBAT_SKILLS_UPDATED);
    },
    decreaseQuantity(itemIndex, scene) {
      let skillInSet = combatSkills[itemIndex];

      if (!this.has(itemIndex)) {
        return false;
      }

      combatSkills = [...combatSkills];

      skillInSet = {
        ...skillInSet,
        quantity: skillInSet.quantity - 1,
      };

      combatSkills[itemIndex] = skillInSet;

      scene.events.emit(COMBAT_SKILLS_UPDATED);

      const disabled = skillInSet.quantity === 0;

      return disabled;
    },
  };
};
