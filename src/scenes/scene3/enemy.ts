import { EnemyConfig } from "../common/combat/enemy";
import { MONSTER_ATTACK_EFFECT, MONSTER_DEATH_EFFECT } from "./audio";

const BUG_KEY = "bug";

const ENEMY_CONFIG = {
  key: BUG_KEY,
  hp: 300,
  audio: {
    death: MONSTER_DEATH_EFFECT,
    attack: MONSTER_ATTACK_EFFECT,
  },
};

export const getEnemyConfig = (): EnemyConfig => ENEMY_CONFIG;
