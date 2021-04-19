import hitEffect from "url:../../assets/audio/effects/hit.ogg";
import monsterDeathEffect from "url:../../assets/audio/effects/monsterDeath.ogg";
import monsterAttackEffect from "url:../../assets/audio/effects/monsterAttack.ogg";
import replenishHpEffect from "url:../../assets/audio/effects/replenish.ogg";
import explosionEffect from "url:../../assets/audio/effects/explosion.ogg";
import bookEffect from "url:../../assets/audio/effects/book.ogg";
import powerUpEffect from "url:../../assets/audio/effects/powerUp.ogg";
import battleMusic from "url:../../assets/audio/music/battle.ogg";
import { Audio, COMMON_AUDIOS } from "../common/audio";

export const BATTLE_MUSIC = "battle";
export const HIT_EFFECT = "hitEffect";
export const MONSTER_DEATH_EFFECT = "monsterDeath";
export const MONSTER_ATTACK_EFFECT = "monsterAttack";
export const REPLENISH_HP_EFFECT = "replenishHp";
export const BOOK_EFFECT = "bookPage";
export const POWER_UP_EFFECT = "powerUp";
export const EXPLOSION_EFFECT = "explosion";

const AUDIOS: Audio[] = [
  ...COMMON_AUDIOS,
  { key: BATTLE_MUSIC, url: battleMusic },
  { key: HIT_EFFECT, url: hitEffect },
  { key: MONSTER_DEATH_EFFECT, url: monsterDeathEffect },
  { key: MONSTER_ATTACK_EFFECT, url: monsterAttackEffect },
  { key: REPLENISH_HP_EFFECT, url: replenishHpEffect },
  { key: BOOK_EFFECT, url: bookEffect },
  { key: POWER_UP_EFFECT, url: powerUpEffect },
  { key: EXPLOSION_EFFECT, url: explosionEffect },
];

export const getAudios = () => AUDIOS;

export const getMusic = () => BATTLE_MUSIC;
