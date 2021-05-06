import hitEffectOgg from "../../assets/audio/effects/hit.ogg";
import monsterDeathEffectOgg from "../../assets/audio/effects/monsterDeath.ogg";
import monsterAttackEffectOgg from "../../assets/audio/effects/monsterAttack.ogg";
import replenishHpEffectOgg from "../../assets/audio/effects/replenish.ogg";
import explosionEffectOgg from "../../assets/audio/effects/explosion.ogg";
import bookEffectOgg from "../../assets/audio/effects/book.ogg";
import powerUpEffectOgg from "../../assets/audio/effects/powerUp.ogg";
import battleMusicOgg from "../../assets/audio/music/battle.ogg";
import gameOverMusicOgg from "../../assets/audio/music/gameOver.ogg";
import winMusicOgg from "../../assets/audio/music/win.ogg";
import endingMusicOgg from "../../assets/audio/music/ending.ogg";
import hitEffectMp3 from "../../assets/audio/effects/hit.ogg";
import monsterDeathEffectMp3 from "../../assets/audio/effects/monsterDeath.mp3";
import monsterAttackEffectMp3 from "../../assets/audio/effects/monsterAttack.mp3";
import replenishHpEffectMp3 from "../../assets/audio/effects/replenish.mp3";
import explosionEffectMp3 from "../../assets/audio/effects/explosion.mp3";
import bookEffectMp3 from "../../assets/audio/effects/book.mp3";
import powerUpEffectMp3 from "../../assets/audio/effects/powerUp.mp3";
import battleMusicMp3 from "../../assets/audio/music/battle.mp3";
import gameOverMusicMp3 from "../../assets/audio/music/gameOver.mp3";
import winMusicMp3 from "../../assets/audio/music/win.mp3";
import endingMusicMp3 from "../../assets/audio/music/ending.mp3";
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
  { key: BATTLE_MUSIC, url: [battleMusicOgg, battleMusicMp3] },
  { key: GAME_OVER_MUSIC, url: [gameOverMusicOgg, gameOverMusicMp3] },
  { key: ENDING_MUSIC, url: [endingMusicOgg, endingMusicMp3] },
  { key: WIN_MUSIC, url: [winMusicOgg, winMusicMp3] },
  { key: HIT_EFFECT, url: [hitEffectOgg, hitEffectMp3] },
  {
    key: MONSTER_DEATH_EFFECT,
    url: [monsterDeathEffectOgg, monsterDeathEffectMp3],
  },
  {
    key: MONSTER_ATTACK_EFFECT,
    url: [monsterAttackEffectOgg, monsterAttackEffectMp3],
  },
  {
    key: REPLENISH_HP_EFFECT,
    url: [replenishHpEffectOgg, replenishHpEffectMp3],
  },
  { key: BOOK_EFFECT, url: [bookEffectOgg, bookEffectMp3] },
  { key: POWER_UP_EFFECT, url: [powerUpEffectOgg, powerUpEffectMp3] },
  { key: EXPLOSION_EFFECT, url: [explosionEffectOgg, explosionEffectMp3] },
];

export const getAudios = (): Audio[] => AUDIOS;

export const getMusic = (): string => BATTLE_MUSIC;
