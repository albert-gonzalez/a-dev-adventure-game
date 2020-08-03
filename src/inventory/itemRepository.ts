export interface Item {
  key: string;
  name: string;
  description: string;
}

interface ItemRepository {
  [key: string]: Item;
}

const itemRepository: ItemRepository = {
  clothes: {
    key: "clothes",
    name: "Some fancy clothes",
    description: "bla bla",
  },
  coffee_cup: {
    key: "coffee_cup",
    name: "Some fancy clothes",
    description: "bla bla",
  },
  notebook: {
    key: "notebook",
    name: "Notebook",
  },
};

export const getItemFromRepository = (key: string) => itemRepository[key];
