import hitEffect from "../../assets/audio/effects/hit.ogg";
import monsterDeathEffect from "../../assets/audio/effects/monsterDeath.ogg";
import monsterAttackEffect from "../../assets/audio/effects/monsterAttack.ogg";
import replenishHpEffect from "../../assets/audio/effects/replenish.ogg";
import explosionEffect from "../../assets/audio/effects/explosion.ogg";
import bookEffect from "../../assets/audio/effects/book.ogg";
import powerUpEffect from "../../assets/audio/effects/powerUp.ogg";
import battleMusic from "../../assets/audio/music/battle.ogg";
import gameOverMusic from "../../assets/audio/music/gameOver.ogg";
import winMusic from "../../assets/audio/music/win.ogg";
import endingMusic from "../../assets/audio/music/ending.ogg";
import { Audio, COMMON_AUDIOS } from "../common/audio";

export const BATTLE_MUSIC = "battle";
export const GAME_OVER_MUSIC = "gameOver";
export const ENDING_MUSIC = "ending";
export const WIN_MUSIC = "win";

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
  { key: GAME_OVER_MUSIC, url: gameOverMusic },
  { key: ENDING_MUSIC, url: endingMusic },
  { key: WIN_MUSIC, url: winMusic },
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
