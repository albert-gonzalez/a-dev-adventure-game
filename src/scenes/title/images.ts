import coffeeIcon from "url:../../assets/sprites/coffee.png";

export const COFFEE_IMAGE = "coffee";

export const loadImages = (scene: Phaser.Scene) => {
  scene.load.image(COFFEE_IMAGE, coffeeIcon);
};
