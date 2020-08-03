import homeMusic from "url:../../assets/audio/music/home.ogg";
import selectEffect from "url:../../assets/audio/effects/select.ogg";
import waterEffect from "url:../../assets/audio/effects/water.ogg";
import coffeeEffect from "url:../../assets/audio/effects/coffee.ogg";

export const HOME_AUDIO_KEY = "home";
export const HOME_SELECT_KEY = "select";
export const HOME_WATER_KEY = "water";
export const HOME_COFFEE_KEY = "coffee";

export const loadAudio = (scene: Phaser.Scene) => {
  scene.load.audio(HOME_AUDIO_KEY, homeMusic);
  scene.load.audio(HOME_SELECT_KEY, selectEffect);
  scene.load.audio(HOME_WATER_KEY, waterEffect);
  scene.load.audio(HOME_COFFEE_KEY, coffeeEffect);
};
