import {
  createEnemy,
  Enemy,
} from "../../../../../src/game/scenes/common/combat/enemy";
import { DEFENSE_POWER_UP_KEY } from "../../../../../src/game/scenes/common/combat/skills";
import { getEnemyConfig } from "../../../../../src/game/scenes/scene3/enemy";
import {
  GameState,
  getState,
  initState,
} from "../../../../../src/game/state/state";

jest.mock("../../../../../src/game/scenes/common/combat/enemyEffects");
jest.mock("../../../../../src/game/scenes/common/events");

describe("enemy", () => {
  let enemy: Enemy;
  let state: GameState;

  beforeEach(() => {
    initState();
    state = getState();
    enemy = createEnemy(getEnemyConfig(), new Phaser.Scene(""));
  });
  describe("createEnemy function", () => {
    test("should return an Enemy configured with the given config", () => {
      expect(enemy).toBeDefined();
    });
  });

  describe("attack function", () => {
    test("should deal damage to the player in the state", async () => {
      const playerHp = state.albert.hp;

      await enemy.attack();

      expect(state.albert.hp).toBeLessThan(playerHp);
    });

    test("should deal half of the damage to the player in the state if the player has a defense power up with a multiplier of 2", async () => {
      const randomFn = Math.random;
      Math.random = () => 0.5;

      const playerHp = state.albert.hp;

      state.albert.addPowerUp({
        key: DEFENSE_POWER_UP_KEY,
        turnsLeft: 2,
        description: "defensePowerUpDescription",
        value: 2,
      });

      await enemy.attack();

      expect(state.albert.hp).toEqual(playerHp - 5);

      Math.random = randomFn;
    });
  });

  describe("getHp function", () => {
    test("should return enemy hp", () => {
      expect(enemy.getHp()).toEqual(getEnemyConfig().hp);
    });
  });

  describe("updateHp function", () => {
    test("should update the enemy hp", () => {
      const hp = enemy.getHp();
      enemy.updateHp(-1);
      expect(enemy.getHp()).toEqual(hp - 1);
    });

    test("should not update the hp below 0", () => {
      const hp = enemy.getHp();
      enemy.updateHp(-hp - 1);
      expect(enemy.getHp()).toEqual(0);
    });

    test("should do nothing if the hp is 0", () => {
      const hp = enemy.getHp();
      enemy.updateHp(-hp);
      enemy.updateHp(-hp);
      expect(enemy.getHp()).toEqual(0);
    });
  });

  describe("isHpEmpty function", () => {
    test("should return false if the hp is greater than 0", () => {
      expect(enemy.isHpEmpty()).toBeFalsy();
    });

    test("should return true if the hp is 0", () => {
      const hp = enemy.getHp();
      enemy.updateHp(-hp);
      expect(enemy.isHpEmpty()).toBeTruthy();
    });
  });
});
