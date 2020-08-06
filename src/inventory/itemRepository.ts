export interface Item {
  key: string;
  name: string;
}

interface ItemRepository {
  [key: string]: Item;
}

export const CLOTHES_KEY = "clothes";
export const COFFEE_CUP_KEY = "coffee_cup";
export const NOTEBOOK_KEY = "notebook";

const itemRepository: ItemRepository = {
  [CLOTHES_KEY]: {
    key: CLOTHES_KEY,
    name: "Some fancy clothes",
  },
  [COFFEE_CUP_KEY]: {
    key: COFFEE_CUP_KEY,
    name: "Some fancy clothes",
  },
  [NOTEBOOK_KEY]: {
    key: NOTEBOOK_KEY,
    name: "Notebook",
  },
};

export const getItemFromRepository = (key: string) => itemRepository[key];
