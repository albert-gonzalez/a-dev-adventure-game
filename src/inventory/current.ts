import { Item } from "./itemRepository";

export const INVENTORY_UPDATED_EVENT = "inventoryUpdated";

export interface CurrentItem extends Item {
  quantity: number;
}

export interface Inventory {
  [key: string]: CurrentItem;
}

export const addItem = (
  inventory: Inventory,
  item: Item,
  scene: Phaser.Scene
) => {
  const itemInInventory = inventory[item.key];
  if (itemInInventory) {
    inventory[item.key] = {
      ...item,
      quantity: itemInInventory.quantity + 1,
    };

    return;
  }

  inventory[item.key] = {
    ...item,
    quantity: 1,
  };

  scene.events.emit(INVENTORY_UPDATED_EVENT);
};

export const decreaseItemQuantity = (
  inventory: Inventory,
  itemKey: number,
  scene: Phaser.Scene
) => {
  let itemInInventory = inventory[itemKey];

  if (!itemInInventory) {
    return;
  }

  itemInInventory = {
    ...itemInInventory,
    quantity: itemInInventory.quantity - 1,
  };

  if (itemInInventory.quantity > 0) {
    inventory[itemKey] = itemInInventory;
  } else {
    delete inventory[itemKey];
  }

  scene.events.emit(INVENTORY_UPDATED_EVENT);
};
