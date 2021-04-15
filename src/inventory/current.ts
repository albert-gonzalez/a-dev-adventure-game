import { getState } from "../state/state";
import { Item } from "./itemRepository";

export const INVENTORY_UPDATED_EVENT = "inventoryUpdated";

export interface CurrentItem extends Item {
  quantity: number;
}

export type Inventory = CurrentItem[];

export const addItem = (
  inventory: Inventory,
  item: Item,
  scene: Phaser.Scene
): void => {
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

  getState().inventory = inventory;
  scene.events.emit(INVENTORY_UPDATED_EVENT);
};

export const decreaseItemQuantity = (
  inventory: Inventory,
  itemIndex: number,
  scene: Phaser.Scene
): boolean => {
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

  getState().inventory = inventory;
  scene.events.emit(INVENTORY_UPDATED_EVENT);

  return removed;
};
