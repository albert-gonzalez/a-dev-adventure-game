import coffeeIcon from "url:../../assets/sprites/coffee.png";
import titleBackground from "url:../../assets/sprites/titleBackground.png";

export const COFFEE_IMAGE = "coffee";
export const TITLE_BACKGROUND = "titleBackground";

export const loadImages = (scene: Phaser.Scene) => {
  scene.load.image(COFFEE_IMAGE, coffeeIcon);
  scene.load.image(TITLE_BACKGROUND, titleBackground);
};
