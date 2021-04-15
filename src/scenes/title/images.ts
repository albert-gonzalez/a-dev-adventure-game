import coffeeIcon from "url:../../assets/sprites/coffee.png";
import JsIcon from "url:../../assets/sprites/logoJs.png";
import nodeIcon from "url:../../assets/sprites/logoNode.png";
import htmlIcon from "url:../../assets/sprites/logoHtml.png";
import cssIcon from "url:../../assets/sprites/logoCss.png";
import phpIcon from "url:../../assets/sprites/logoPhp.png";
import dockerIcon from "url:../../assets/sprites/logoDocker.png";
import titleBackground from "url:../../assets/sprites/titleBackground.png";

export const COFFEE_IMAGE = "coffee";
export const JS_IMAGE = "jsLogo";
export const NODE_IMAGE = "nodeLogo";
export const HTML_IMAGE = "htmlLogo";
export const CSS_IMAGE = "cssLogo";
export const PHP_IMAGE = "phpLogo";
export const DOCKER_IMAGE = "dockerLogo";
export const TITLE_BACKGROUND = "titleBackground";

export const loadImages = (scene: Phaser.Scene) => {
  scene.load.image(COFFEE_IMAGE, coffeeIcon);
  scene.load.image(JS_IMAGE, JsIcon);
  scene.load.image(NODE_IMAGE, nodeIcon);
  scene.load.image(HTML_IMAGE, htmlIcon);
  scene.load.image(CSS_IMAGE, cssIcon);
  scene.load.image(PHP_IMAGE, phpIcon);
  scene.load.image(DOCKER_IMAGE, dockerIcon);
  scene.load.image(TITLE_BACKGROUND, titleBackground);
};
