import { controlDialog, createDialogBox, Dialog } from "../../menus/dialog";
import { controlMenu, createMenu, Menu } from "../../menus/menu";
import {
  createCharacterAnimations,
  updateAnimation,
} from "../../characters/common/animation/animation";
import {
  ALBERT_KEY,
  SLEEPY_ALBERT_KEY,
  SLEEPY_PREFIX,
} from "../../characters/main/creation";
import { createObjectsFromMap } from "../../tileSets/objects";
import {
  getCharacterDirections,
  isActionButtonPressed,
  isDownEscapePressed,
  updateCharacterVelocity,
} from "../../characters/main/control";

import { TILE_HEIGHT } from "../../init";
import { getState } from "../../state/state";
import { insertDynamicObjectsIntoScene } from "../common/objects";
import { getObjects } from "./objects";
import { createInitialCutscene } from "./cutScenes";
import {
  createMainCharacters,
  insertCharactersIntoScene,
} from "../common/characters";
import { getCharacters } from "./characters";
import { createImageObjects, loadImages } from "./images";
import { createMap, loadMap } from "./map";
import { loadAudio } from "./audio";
import { actionCallback } from "../common/actions";

let dialog: Dialog;
let menu: Menu;
let groundCanvas: Phaser.GameObjects.RenderTexture;
let foregroundCanvas: Phaser.GameObjects.RenderTexture;
let middleGroundCanvas: Phaser.GameObjects.RenderTexture;
let ground: Phaser.Tilemaps.StaticTilemapLayer,
  foreground: Phaser.Tilemaps.StaticTilemapLayer,
  middleGround: Phaser.Tilemaps.StaticTilemapLayer,
  objects: Phaser.Tilemaps.StaticTilemapLayer;

export type ActionCallback = (
  object: Phaser.GameObjects.GameObject,
  anotherObject: Phaser.GameObjects.GameObject
) => void;

export interface ColliderWithCallback {
  object: Phaser.GameObjects.GameObject[] | Phaser.Tilemaps.StaticTilemapLayer;
  callback?: ActionCallback;
}

export function preload(this: Phaser.Scene): void {
  getState().scene.phaser = this;
  getState().cutScene = createInitialCutscene();
  loadImages(this);
  loadMap(this);
  loadAudio(this);
}

export function create(this: Phaser.Scene): void {
  let map: Phaser.Tilemaps.Tilemap;
  ({ map, groundCanvas, middleGroundCanvas, foregroundCanvas } = createMap(
    this
  ));

  ({ ground, foreground, middleGround, objects } = createImageObjects(map));

  const actions = createObjectsFromMap(map, "actions", "action");

  createCharacterAnimations(this, SLEEPY_ALBERT_KEY, "SLEEPY_");
  createCharacterAnimations(this, ALBERT_KEY);

  const sleepyAlbert = createMainCharacters(
    this,
    map,
    ground,
    objects,
    actions,
    (albert, object) => actionCallback(albert, object, getState())
  );
  getState().albert.sprite = sleepyAlbert;
  getState().albert.animationPrefix = SLEEPY_PREFIX;

  insertDynamicObjectsIntoScene(map, getState(), getObjects());
  insertCharactersIntoScene(map, getState(), getCharacters());

  this.cameras.main.startFollow(sleepyAlbert, false);
  this.cameras.main.roundPixels = true;

  menu = createMenu(this);

  getState().dialog = createDialogBox(this);

  //document.addEventListener("pointerup", () => this.scale.startFullscreen());
}

export function update(this: Phaser.Scene): void {
  let directionX = 0,
    directionY = 0;

  const isDownEscapeJustPressed = isDownEscapePressed(this);
  const state = getState();
  const albertSprite = getState().albert.sprite as Phaser.GameObjects.Sprite;
  const albertAnimationPrefix = getState().albert.animationPrefix;
  const dialog = state.dialog as Dialog;
  const isActionButtonJustPressed = isActionButtonPressed(this);
  state.controls.isActionJustPressed = isActionButtonJustPressed;

  groundCanvas.clear();
  groundCanvas.draw([ground, objects]);
  middleGroundCanvas.clear();
  middleGroundCanvas.draw(middleGround);
  foregroundCanvas.clear();
  foregroundCanvas.draw(foreground);

  if (dialog.isDialogOpen()) {
    controlDialog(dialog, isActionButtonJustPressed);
    updateAnimation(albertSprite, 0, 0, albertAnimationPrefix);
    updateCharacterVelocity(albertSprite, 0, 0);

    return;
  }

  if (state.cutScene) {
    const isFinished = state.cutScene(state);

    if (isFinished) {
      state.cutScene = undefined;
    }

    return;
  }

  if (menu.isMenuOpen()) {
    controlMenu(this, menu, isDownEscapeJustPressed, isActionButtonJustPressed);
    updateAnimation(albertSprite, 0, 0, albertAnimationPrefix);
    updateCharacterVelocity(albertSprite, 0, 0);

    return;
  }

  if (isDownEscapeJustPressed) {
    menu.show();
  }

  ({ directionX, directionY } = getCharacterDirections(this));

  updateAnimation(albertSprite, directionX, directionY, albertAnimationPrefix);
  updateCharacterVelocity(albertSprite, directionX, directionY);
  albertSprite.setDepth(Math.ceil(albertSprite.y / TILE_HEIGHT));
  Object.values(state.scene.characters).forEach((character) =>
    character.setDepth(Math.ceil(character.y / TILE_HEIGHT))
  );
}
