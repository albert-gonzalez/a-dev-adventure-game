import {
  CombatSkillSet,
  createDefaultCombatSkillSet,
  FUNCTIONAL_PROGRAMMING_KEY,
  getCombatSkillFromRepository,
} from "../../../../../src/game/scenes/common/combat/skills";

jest.mock("../../../../../src/game/scenes/common/events");

describe("Combat Skills", () => {
  describe("SkillSet", () => {
    let skillSet: CombatSkillSet;

    beforeEach(() => {
      skillSet = createDefaultCombatSkillSet();
    });
    describe("createDefaultCombatSkillSet function", () => {
      test("should return a combat skill set", () => {
        expect(skillSet).toBeDefined();
        expect(typeof skillSet).toEqual("object");
      });
    });

    describe("get function", () => {
      test("should return the skill of the given position", () => {
        const skill = skillSet.get(0);
        expect(skill).toBeDefined();
        expect(skill?.key).toBeDefined();
      });

      test("should return undefined if the given position does not exist", () => {
        const skill = skillSet.get(-1);
        expect(skill).toBeUndefined();
      });
    });

    describe("getAll function", () => {
      test("should return all the skills", () => {
        const skills = skillSet.getAll();

        expect(skills.length).toBeGreaterThan(0);
        expect(skills[0].key).toBeDefined();
      });
    });

    describe("add function", () => {
      test("should add a skill to the repository", () => {
        const skillCount = skillSet.getAll().length;

        skillSet.add(
          getCombatSkillFromRepository(FUNCTIONAL_PROGRAMMING_KEY),
          new Phaser.Scene("")
        );

        expect(skillSet.getAll().length).toEqual(skillCount + 1);
        expect(skillSet.get(skillCount)?.key).toEqual(
          FUNCTIONAL_PROGRAMMING_KEY
        );
      });
    });

    describe("has function", () => {
      test("should return true if the given position exists", () => {
        expect(skillSet.has(0)).toBeTruthy();
      });

      test("should return false if the given position does not exist", () => {
        expect(skillSet.has(-1)).toBeFalsy();
      });
    });

    describe("decreaseQuantity function", () => {
      test("should decrease the quantity of the skill in the given position", () => {
        const skillQuantity = skillSet.get(0)?.quantity as number;

        const isSkillDisabled = skillSet.decreaseQuantity(
          0,
          new Phaser.Scene("")
        );

        expect(skillSet.get(0)?.quantity).toEqual(skillQuantity - 1);
        expect(isSkillDisabled).toBeFalsy();
      });

      test("should return true if the quantity reaches 0 after decreasing it", () => {
        const skillQuantity = skillSet.get(0)?.quantity as number;
        const scene = new Phaser.Scene("");
        let isSkillDisabled = false;

        for (let i = 0; i < skillQuantity; i++) {
          isSkillDisabled = skillSet.decreaseQuantity(0, scene);
        }

        expect(skillSet.get(0)?.quantity).toEqual(0);
        expect(isSkillDisabled).toBeTruthy();
      });

      test("should do nothing if the quantity of the skill in the given position is already 0", () => {
        const skillQuantity = skillSet.get(0)?.quantity as number;
        const scene = new Phaser.Scene("");

        for (let i = 0; i <= skillQuantity; i++) {
          skillSet.decreaseQuantity(0, scene);
        }

        expect(skillSet.get(0)?.quantity).toEqual(0);
      });

      test("should do nothing if the given position does not exist", () => {
        expect(skillSet.decreaseQuantity(-1, new Phaser.Scene(""))).toBeFalsy();
      });
    });
  });
});
