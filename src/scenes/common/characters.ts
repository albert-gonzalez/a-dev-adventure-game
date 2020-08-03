import { GameState } from "../../state/state";
import { createObjectsFromMap } from "../../tileSets/objects";
import {
  ANIMATION_STILL_DOWN,
  createCharacterAnimations,
} from "../../characters/common/animation/animation";
import {
  SLEEPY_ALBERT_KEY,
  SLEEPY_PREFIX,
} from "../../characters/main/creation";
import { ActionCallback, ColliderWithCallback } from "../scene1/scene";

export const HUMAN_FRAME_SIZE = {
  frameWidth: 32,
  frameHeight: 64,
};

export const DOG_FRAME_SIZE = {
  frameWidth: 32,
  frameHeight: 32,
};

const BOUNDING_BOX_HEIGHT = 20;
const BOUNDING_BOX_OFFSET = 45;

export const ALBERT_KEY = "albert";

export interface Character {
  key: string;
  image: string;
  frame: number;
  size: {
    frameWidth: number;
    frameHeight: number;
  };
}

export const insertCharactersIntoScene = (
  map: Phaser.Tilemaps.Tilemap,
  state: GameState,
  characters: Character[]
) => {
  characters.forEach((character) => {
    state.scene.characters[character.key] = createObjectsFromMap(
      map,
      "characters",
      character.key,
      {
        key: character.key,
        frame: character.frame,
      }
    )[0];

    createCharacterAnimations(
      state.scene.phaser as Phaser.Scene,
      character.key,
      character.key
    );
  });
};

export const loadCharactersSprites = (
  scene: Phaser.Scene,
  characters: Character[]
) => {
  characters.forEach((character) => {
    scene.load.spritesheet(character.key, character.image, {
      ...character.size,
    });
  });
};

export const createMainCharacters = (
  scene: Phaser.Scene,
  map: Phaser.Tilemaps.Tilemap,
  ground: Phaser.Tilemaps.StaticTilemapLayer,
  objects: Phaser.Tilemaps.StaticTilemapLayer,
  actions: Phaser.GameObjects.Sprite[],
  actionCallback: ActionCallback
) => {
  createCharacterAnimations(scene, SLEEPY_ALBERT_KEY, "SLEEPY_");
  createCharacterAnimations(scene, ALBERT_KEY);

  const collidesWithAlbert: ColliderWithCallback[] = [
    {
      object: ground,
    },
    {
      object: objects,
    },
  ];

  const overlapsWithAlbert: ColliderWithCallback[] = [
    {
      object: actions,
      callback: actionCallback,
    },
  ];

  const sleepyAlbert = createObjectsFromMap(map, "characters", "albert", {
    key: SLEEPY_ALBERT_KEY,
    frame: 2,
  })[0];

  initCollisions(scene, sleepyAlbert, collidesWithAlbert, overlapsWithAlbert);

  sleepyAlbert.anims.play(`${SLEEPY_PREFIX}${ANIMATION_STILL_DOWN}`);

  return sleepyAlbert;
};

const initCollisions = (
  scene: Phaser.Scene,
  albert: Phaser.GameObjects.Sprite,
  collidesWith: ColliderWithCallback[],
  overlapsWith: ColliderWithCallback[]
) => {
  const body = albert.body as Phaser.Physics.Arcade.Body;

  collidesWith.forEach((colliderWithCallback) => {
    scene.physics.add.collider(
      albert,
      colliderWithCallback.object,
      colliderWithCallback.callback
    );
  });

  overlapsWith.forEach((colliderWithCallback) => {
    scene.physics.add.overlap(
      albert,
      colliderWithCallback.object,
      colliderWithCallback.callback
    );
  });

  body.setSize(albert.width, BOUNDING_BOX_HEIGHT);
  body.offset.y = BOUNDING_BOX_OFFSET;
};
