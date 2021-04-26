import {
  getCombatSkillFromRepository,
  FUNCTIONAL_PROGRAMMING_KEY,
} from "../scenes/common/combat/skills";
import { BOOK_EFFECT, REPLENISH_HP_EFFECT } from "../scenes/scene3/audio";
import { getState } from "../state/state";

export interface Item {
  key: string;
  name: string;
  description?: string;
  effect?: () => Promise<void>;
}

interface ItemRepository {
  [key: string]: Item;
}

export const CLOTHES_KEY = "clothes";
export const COFFEE_CUP_KEY = "coffee_cup";
export const NOTEBOOK_KEY = "notebook";
export const FLJ_BOOK_KEY = "flj_book";
export const DONUT_KEY = "donut";

const COFFEE_HP_BONUS = 25;
const DONUT_HP_BONUS = 50;

const createRunHealingEffect = (
  hp: number,
  text: string
): (() => Promise<void>) => {
  return () => {
    const state = getState();
    const scene = state.scene.phaser as Phaser.Scene;
    const hpPointsHealed = state.albert.updateHp(hp);

    state.dialog?.showDialogBox([{ text, options: { hp: hpPointsHealed } }]);

    const replenishAudio = scene.sound.add(REPLENISH_HP_EFFECT);
    scene.tweens.add({
      targets: replenishAudio,
      rate: 2,
    });
    replenishAudio.play();

    return Promise.resolve();
  };
};

const runBookEffect = (): Promise<void> => {
  const state = getState();
  const scene = state.scene.phaser as Phaser.Scene;

  state.dialog?.showDialogBox([{ text: "bookEffect" }]);

  state.combat.skills.add(
    getCombatSkillFromRepository(FUNCTIONAL_PROGRAMMING_KEY),
    scene
  );

  const bookPageAudio = scene.sound.add(BOOK_EFFECT);
  scene.tweens.add({
    targets: bookPageAudio,
    rate: 1.1,
  });
  bookPageAudio.play();

  return Promise.resolve();
};

const itemRepository: ItemRepository = {
  [CLOTHES_KEY]: {
    key: CLOTHES_KEY,
    name: "clothes",
  },
  [COFFEE_CUP_KEY]: {
    key: COFFEE_CUP_KEY,
    name: "coffee",
    description: "coffeeDescription",
    effect: createRunHealingEffect(COFFEE_HP_BONUS, "coffeeEffect"),
  },
  [NOTEBOOK_KEY]: {
    key: NOTEBOOK_KEY,
    name: "notebook",
  },
  [FLJ_BOOK_KEY]: {
    key: FLJ_BOOK_KEY,
    name: "flj_book",
    description: "fljBookDescription",
    effect: runBookEffect,
  },
  [DONUT_KEY]: {
    key: DONUT_KEY,
    name: "donut",
    description: "donutDescription",
    effect: createRunHealingEffect(DONUT_HP_BONUS, "donutEffect"),
  },
};

export const getItemFromRepository = (key: string): Item => itemRepository[key];
