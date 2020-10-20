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
export const FLJ_BOOK_KEY = "flj_book";
export const DONUT_KEY = "donut";

const itemRepository: ItemRepository = {
  [CLOTHES_KEY]: {
    key: CLOTHES_KEY,
    name: "clothes",
  },
  [COFFEE_CUP_KEY]: {
    key: COFFEE_CUP_KEY,
    name: "coffee",
  },
  [NOTEBOOK_KEY]: {
    key: NOTEBOOK_KEY,
    name: "notebook",
  },
  [FLJ_BOOK_KEY]: {
    key: FLJ_BOOK_KEY,
    name: "flj_book",
  },
  [DONUT_KEY]: {
    key: DONUT_KEY,
    name: "donut",
  },
};

export const getItemFromRepository = (key: string) => itemRepository[key];
