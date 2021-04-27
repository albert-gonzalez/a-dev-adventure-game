import {
  getItemFromRepository,
  NOTEBOOK_KEY,
} from "../../../src/game/inventory/itemRepository";

describe("itemRepository", () => {
  describe("getItemFromRepository function", () => {
    test("should return an existing item", () => {
      const item = getItemFromRepository(NOTEBOOK_KEY);
      expect(item).toBeDefined();
      expect(item.key).toEqual(NOTEBOOK_KEY);
    });

    test("should return undefined if the key does not exist", () => {
      expect(getItemFromRepository("notExisting")).toBeUndefined();
    });
  });
});
