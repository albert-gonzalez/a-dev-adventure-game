import { Item } from "./itemRepository";

export const INVENTORY_UPDATED_EVENT = "inventoryUpdated";

export interface CurrentItem extends Item {
  quantity: number;
}

export interface Inventory {
  add(item: Item, scene: Phaser.Scene): void;
  getAll(): CurrentItem[];
  decreaseQuantity(itemIndex: number, scene: Phaser.Scene): boolean;
  get(index: number): CurrentItem | undefined;
  getByKey(key: string): CurrentItem | undefined;
  getIndexByKey(key: string): number;
}

export const createInventory = (initItems: CurrentItem[] = []): Inventory => {
  let inventory: CurrentItem[] = [...initItems];

  return {
    get(index) {
      return { ...inventory[index] };
    },
    getAll() {
      return [...inventory];
    },
    getByKey(key) {
      const item = inventory.find((item) => item.key === key);

      return item ? { ...item } : undefined;
    },
    getIndexByKey(key) {
      return inventory.findIndex((item) => item.key === key);
    },
    add(item, scene) {
      let itemIndex = -1;

      inventory = [...inventory];

      const itemInInventory = inventory.find((itemInInventory, index) => {
        itemIndex = index;
        return itemInInventory.key === item.key;
      });

      if (itemInInventory) {
        inventory[itemIndex] = {
          ...item,
          quantity: itemInInventory.quantity + 1,
        };

        return;
      }

      inventory.push({
        ...item,
        quantity: 1,
      });

      scene.events.emit(INVENTORY_UPDATED_EVENT);
    },
    decreaseQuantity(itemIndex, scene) {
      let removed = false;
      let itemInInventory = inventory[itemIndex];

      inventory = [...inventory];

      if (!itemInInventory) {
        return false;
      }

      itemInInventory = {
        ...itemInInventory,
        quantity: itemInInventory.quantity - 1,
      };

      if (itemInInventory.quantity > 0) {
        inventory[itemIndex] = itemInInventory;
      } else {
        inventory = inventory.filter((item, index) => index !== itemIndex);
        removed = true;
      }

      scene.events.emit(INVENTORY_UPDATED_EVENT);

      return removed;
    },
  };
};
