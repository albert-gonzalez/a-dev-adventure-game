import {
  createInventory,
  Inventory,
} from "../../../src/game/inventory/current";
import {
  CLOTHES_KEY,
  getItemFromRepository,
  NOTEBOOK_KEY,
} from "../../../src/game/inventory/itemRepository";

jest.mock("../../../src/game/scenes/common/events");

describe("current items", () => {
  let inventory: Inventory;
  let scene: Phaser.Scene;

  beforeEach(() => {
    inventory = createInventory([
      { ...getItemFromRepository(CLOTHES_KEY), quantity: 2 },
    ]);
    scene = new Phaser.Scene("");
  });
  describe("createInventory function", () => {
    test("should return an object", () => {
      expect(inventory).toBeDefined();
      expect(typeof inventory).toEqual("object");
    });
  });

  describe("inventory object", () => {
    describe("get function", () => {
      test("should return an item if it exists in the given position", () => {
        expect(inventory.get(0)?.key).toEqual(CLOTHES_KEY);
      });

      test("should return an item if it does not exist in the given position", () => {
        expect(inventory.get(1)?.key).toBeUndefined();
      });
    });

    describe("getByKey function", () => {
      test("should return an item if it exists", () => {
        expect(inventory.getByKey(CLOTHES_KEY)?.key).toEqual(CLOTHES_KEY);
      });

      test("should return an item if it does not exist", () => {
        expect(inventory.getByKey(NOTEBOOK_KEY)?.key).toBeUndefined();
      });
    });

    describe("getIndexByKey function", () => {
      test("should return the index of an item if it exists", () => {
        expect(inventory.getIndexByKey(CLOTHES_KEY)).toEqual(0);
      });

      test("should return -1 if it does not exist", () => {
        expect(inventory.getIndexByKey(NOTEBOOK_KEY)).toEqual(-1);
      });
    });

    describe("getAll function", () => {
      test("should return all the items", () => {
        expect(inventory.getAll().length).toEqual(1);
      });
    });
    describe("add function", () => {
      test("should add an item to the inventory", () => {
        expect(inventory.getByKey(NOTEBOOK_KEY)).toBeUndefined();
        inventory.add(getItemFromRepository(NOTEBOOK_KEY), scene);
        expect(inventory.getByKey(NOTEBOOK_KEY)?.key).toEqual(NOTEBOOK_KEY);
      });
    });

    describe("decreaseQuantity function", () => {
      test("should decrease the quantity of the item in the given index", () => {
        inventory.decreaseQuantity(0, scene);

        expect(inventory.get(0)?.quantity).toEqual(1);
      });

      test("should decrease the quantity of the item in the given index and remove it if quantity is 0", () => {
        inventory.decreaseQuantity(0, scene);
        inventory.decreaseQuantity(0, scene);

        expect(inventory.get(0)).toBeUndefined();
      });
    });
  });
});
