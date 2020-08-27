import { controlMenu, createMenu, Menu } from "../../menus/menu";
import { GameState, getState } from "../../state/state";
import {
  createImageObjects,
  Image,
  loadImages,
  SpriteSheet,
  TILE_HEIGHT,
} from "./images";
import { createMap, loadMap, SceneMap } from "./sceneMap";
import { Audio, loadAudio } from "./audio";
import { createObjectsFromMap } from "../../tileSets/objects";
import {
  createCharacterAnimations,
  updateAnimation,
} from "../../characters/common/animation/animation";
import {
  ALBERT_KEY,
  SLEEPY_ALBERT_KEY,
  SLEEPY_PREFIX,
} from "../../characters/main/creation";
import {
  createMainCharacters,
  insertCharactersIntoScene,
  lookAtMainCharacter,
} from "./characters";
import { actionCallback, SceneActions, transformAction } from "./actions";
import { DynamicObjectInfo, insertDynamicObjectsIntoScene } from "./objects";
import { controlDialog, createDialogBox, Dialog } from "../../menus/dialog";
import { createTouchButtons } from "../../input/touchInput";
import {
  getCharacterDirections,
  isActionButtonJustPressed,
  isMenuButtonJustPressed,
  isToggleFullScreenButtonJustPressed,
  isToggleSoundButtonJustPressed,
  updateCharacterVelocity,
} from "../../input/input";
import { BOSS_KEY } from "../scene2/characters";

export interface CreateSceneInput {
  initialCutScene: (state: GameState) => boolean;
  images: Image[];
  spriteSheets: SpriteSheet[];
  audios: Audio[];
  map: SceneMap;
  dynamicObjects: DynamicObjectInfo[];
  characters: { [key: string]: SpriteSheet };
  initialAnimationPrefix?: string;
  actions: SceneActions;
}

export const createSceneMethods = ({
  initialCutScene,
  images,
  spriteSheets,
  map,
  audios,
  initialAnimationPrefix = "",
  dynamicObjects,
  characters,
  actions,
}: CreateSceneInput) => {
  let menu: Menu;
  let groundCanvas: Phaser.GameObjects.RenderTexture;
  let foregroundCanvas: Phaser.GameObjects.RenderTexture;
  let middleGroundCanvas: Phaser.GameObjects.RenderTexture;
  let ground: Phaser.Tilemaps.StaticTilemapLayer,
    foreground: Phaser.Tilemaps.StaticTilemapLayer,
    middleGround: Phaser.Tilemaps.StaticTilemapLayer,
    objects: Phaser.Tilemaps.StaticTilemapLayer,
    objectsOver: Phaser.Tilemaps.StaticTilemapLayer;

  function preload(this: Phaser.Scene): void {
    const state = getState();
    state.scene.phaser = this;
    state.cutScene = initialCutScene;
    loadImages(this, images, spriteSheets);
    loadMap(this, map);
    loadAudio(this, audios);
  }

  function create(this: Phaser.Scene): void {
    const state = getState();
    state.scene.actions = actions;
    state.scene.charactersData = characters;
    state.scene.currentActionStates = {};

    let tilemap: Phaser.Tilemaps.Tilemap;
    ({
      map: tilemap,
      groundCanvas,
      middleGroundCanvas,
      foregroundCanvas,
    } = createMap(map.key, this));

    ({
      ground,
      foreground,
      middleGround,
      objects,
      objectsOver,
    } = createImageObjects(tilemap));

    const actionSprites = createObjectsFromMap(
      tilemap,
      "actions",
      "action",
      undefined,
      undefined,
      transformAction
    );

    createCharacterAnimations(this, SLEEPY_ALBERT_KEY, SLEEPY_PREFIX);
    createCharacterAnimations(this, ALBERT_KEY);

    insertDynamicObjectsIntoScene(tilemap, state, dynamicObjects);
    const characterSprites = insertCharactersIntoScene(
      tilemap,
      state,
      Object.values(characters)
    );

    const albert = createMainCharacters(
      this,
      tilemap,
      ground,
      objects,
      characterSprites,
      actionSprites,
      (albert, object) => actionCallback(albert, object, getState()),
      initialAnimationPrefix
    );
    state.albert.sprite = albert;
    state.albert.animationPrefix = initialAnimationPrefix;

    this.cameras.main.setBounds(
      0,
      0,
      tilemap.widthInPixels,
      tilemap.heightInPixels,
      true
    );
    this.cameras.main.startFollow(albert, true);

    menu = createMenu(this);

    state.dialog = createDialogBox(this);
    createTouchButtons(this, state);
    //document.addEventListener("pointerup", () => this.scale.startFullscreen());
  }

  function update(this: Phaser.Scene): void {
    let directionX = 0,
      directionY = 0;

    const state = getState();
    const isDownEscapeJustPressed = isMenuButtonJustPressed(this, state);
    const albertSprite = state.albert.sprite as Phaser.GameObjects.Sprite;
    const albertAnimationPrefix = state.albert.animationPrefix;
    const dialog = state.dialog as Dialog;
    const actionButtonJustPressed = isActionButtonJustPressed(this, state);
    state.input.isActionJustPressed = actionButtonJustPressed;

    groundCanvas.clear();
    groundCanvas.draw([ground, objects, objectsOver]);
    middleGroundCanvas.clear();
    middleGroundCanvas.draw(middleGround);
    foregroundCanvas.clear();
    foregroundCanvas.draw(foreground);

    if (isToggleSoundButtonJustPressed(this, state)) {
      this.sound.mute = !this.sound.mute;
    }

    if (isToggleFullScreenButtonJustPressed(this, state)) {
      this.scale.toggleFullscreen();
    }

    if (dialog.isDialogOpen()) {
      controlDialog(dialog, actionButtonJustPressed);
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
      controlMenu(
        this,
        menu,
        isDownEscapeJustPressed,
        actionButtonJustPressed,
        state
      );
      updateAnimation(albertSprite, 0, 0, albertAnimationPrefix);
      updateCharacterVelocity(albertSprite, 0, 0);

      return;
    }

    if (isDownEscapeJustPressed) {
      menu.show();
    }

    ({ directionX, directionY } = getCharacterDirections(this, state));

    updateAnimation(
      albertSprite,
      directionX,
      directionY,
      albertAnimationPrefix
    );

    updateCharacterVelocity(albertSprite, directionX, directionY);
    albertSprite.setDepth(Math.ceil(albertSprite.y / TILE_HEIGHT));
    Object.values(state.scene.characterSprites).forEach((character) =>
      character.setDepth(Math.ceil(character.y / TILE_HEIGHT))
    );
  }

  return { preload, update, create };
};
