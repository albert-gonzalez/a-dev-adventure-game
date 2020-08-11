import homeMusic from "url:../../assets/audio/music/home.ogg";
import selectEffect from "url:../../assets/audio/effects/select.ogg";
import waterEffect from "url:../../assets/audio/effects/water.ogg";
import coffeeEffect from "url:../../assets/audio/effects/coffee.ogg";

export const HOME_MUSIC = "home";
export const HOME_SELECT_EFFECT = "select";
export const HOME_WATER_EFFECT = "water";
export const HOME_COFFEE_EFFECT = "coffee";

export const loadAudio = (scene: Phaser.Scene) => {
  scene.load.audio(HOME_MUSIC, homeMusic);
  scene.load.audio(HOME_SELECT_EFFECT, selectEffect);
  scene.load.audio(HOME_WATER_EFFECT, waterEffect);
  scene.load.audio(HOME_COFFEE_EFFECT, coffeeEffect);
};
