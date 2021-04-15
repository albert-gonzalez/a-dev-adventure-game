import combatMusic from "url:../../assets/audio/music/home.ogg";
import hitEffect from "url:../../assets/audio/effects/hit.ogg";
import monsterDeathEffect from "url:../../assets/audio/effects/monsterDeath.ogg";
import monsterAttackEffect from "url:../../assets/audio/effects/monsterAttack.ogg";
import { Audio, COMMON_AUDIOS } from "../common/audio";

export const COMBAT_MUSIC = "combat";
export const HIT_EFFECT = "hitEffect";
export const MONSTER_DEATH_EFFECT = "monsterDeath";
export const MONSTER_ATTACK_EFFECT = "monsterAttack";

const AUDIOS: Audio[] = [
  ...COMMON_AUDIOS,
  { key: COMBAT_MUSIC, url: combatMusic },
  { key: HIT_EFFECT, url: hitEffect },
  { key: MONSTER_DEATH_EFFECT, url: monsterDeathEffect },
  { key: MONSTER_ATTACK_EFFECT, url: monsterAttackEffect },
];

export const getAudios = () => AUDIOS;

export const getMusic = () => COMBAT_MUSIC;
