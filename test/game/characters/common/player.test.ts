import {
  createPlayer,
  Player,
} from "../../../../src/game/characters/common/player";
import { createEnemy } from "../../../../src/game/scenes/common/combat/enemy";
import { getEnemyConfig } from "../../../../src/game/scenes/scene3/enemy";
import {
  GameState,
  getState,
  initState,
} from "../../../../src/game/state/state";

describe("Player", () => {
  let player: Player;
  let state: GameState;

  beforeEach(() => {
    initState();
    state = getState();
    state.combat.enemy = createEnemy(getEnemyConfig());
    player = createPlayer();
  });
  test("should be created with createPlayer function", () => {
    expect(player).toBeDefined();
  });

  describe("updateHp function", () => {
    test("should update Player HP", () => {
      const hp = player.hp;

      player.updateHp(-10);

      expect(player.hp).toEqual(hp - 10);
    });

    test("should not update hp below 0", () => {
      player.updateHp(-player.hp - 10);

      expect(player.hp).toEqual(0);
    });

    test("should not update hp above maxHp", () => {
      player.updateHp(player.maxHp + 10);

      expect(player.hp).toEqual(player.maxHp);
    });
  });

  describe("attack function", () => {
    test("should damage enemy in the state", async () => {
      const initHp = state.combat.enemy?.getHp() as number;
      await player.attack();

      expect(initHp).toBeDefined();
      expect(state.combat.enemy?.getHp()).toBeLessThan(initHp);
    });
  });

  describe("addPowerUp and usePowerUp functions", () => {
    describe("userPowerUp", () => {
      test("should return 0 if the power up does not exist", () => {
        expect(player.usePowerUp("power")).toEqual(0);
      });
    });

    test("should add a power up and then use them. usePowerUp should return the power up value", () => {
      const expectedValue = 2;

      player.addPowerUp({
        key: "power",
        turnsLeft: 1,
        description: "attackPowerUpDescription",
        value: expectedValue,
      });

      expect(player.usePowerUp("power")).toEqual(expectedValue);
      expect(player.usePowerUp("power")).toEqual(0);
    });
  });

  describe("isDead function", () => {
    test("should return true if the hp is 0", () => {
      expect(player.isDead()).toBeFalsy();
      player.hp = 0;
      expect(player.isDead()).toBeTruthy();
    });
  });
});
