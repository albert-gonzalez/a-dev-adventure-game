import { GameState } from "../../state/state";
import { createObjectsFromMap } from "../../tileSets/objects";
import {
  ANIMATION_STILL_DOWN,
  createCharacterAnimations,
  updateAnimation,
} from "../../characters/common/animation/animation";
import {
  SLEEPY_ALBERT_KEY,
  SLEEPY_PREFIX,
} from "../../characters/main/creation";
import { ActionCallback, ColliderWithCallback } from "./actions";
import { SpriteSheet } from "./images";
import { MOVEMENT_SPEED, updateCharacterVelocity } from "../../input/input";

export const HUMAN_FRAME_SIZE = {
  frameWidth: 32,
  frameHeight: 64,
};

export const DOG_FRAME_SIZE = {
  frameWidth: 32,
  frameHeight: 32,
};

const MAIN_CHARACTER_BOUNDING_BOX_HEIGHT = 10;
const MAIN_CHARACTER_BOUNDING_BOX_OFFSET = 55;
export const STANDING_NPC_BOUNDING_BOX_HEIGHT = 45;
export const STANDING_NPC_BOUNDING_BOX_OFFSET = 30;

export const SITTING_NPC_BOUNDING_BOX = {
  height: 44,
  offset: 20,
};

export const ALBERT_KEY = "albert";

export const insertCharactersIntoScene = (
  map: Phaser.Tilemaps.Tilemap,
  state: GameState,
  characters: SpriteSheet[]
) => {
  return characters.reduce((acc, character) => {
    state.scene.characterSprites[character.key] = createObjectsFromMap(
      map,
      "characters",
      character.key,
      {
        key: character.key,
        frame: character.frame,
      },
      Phaser.Physics.Arcade.DYNAMIC_BODY,
      (sprite) => transformNPCCharacter(character, sprite)
    )[0];

    createCharacterAnimations(
      state.scene.phaser as Phaser.Scene,
      character.key,
      character.key
    );

    return [...acc, state.scene.characterSprites[character.key]];
  }, [] as Phaser.GameObjects.Sprite[]);
};

export const createMainCharacters = (
  scene: Phaser.Scene,
  map: Phaser.Tilemaps.Tilemap,
  ground: Phaser.Tilemaps.StaticTilemapLayer,
  objects: Phaser.Tilemaps.StaticTilemapLayer,
  characters: Phaser.GameObjects.Sprite[],
  actions: Phaser.GameObjects.Sprite[],
  actionCallback: ActionCallback,
  animationPrefix: string
) => {
  createCharacterAnimations(scene, SLEEPY_ALBERT_KEY, SLEEPY_PREFIX);
  createCharacterAnimations(scene, ALBERT_KEY);

  const collidesWithAlbert: ColliderWithCallback[] = [
    {
      object: ground,
    },
    {
      object: objects,
    },
    {
      object: characters,
    },
  ];

  const overlapsWithAlbert: ColliderWithCallback[] = [
    {
      object: actions,
      callback: actionCallback,
    },
  ];

  const albert = createObjectsFromMap(map, "characters", "albert", {
    key: ALBERT_KEY,
    frame: 2,
  })[0];

  initCollisions(scene, albert, collidesWithAlbert, overlapsWithAlbert);

  albert.anims.play(`${animationPrefix}${ANIMATION_STILL_DOWN}`);

  return albert;
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

  body.setSize(albert.width, MAIN_CHARACTER_BOUNDING_BOX_HEIGHT);
  body.offset.y = MAIN_CHARACTER_BOUNDING_BOX_OFFSET;
};

const transformNPCCharacter = (
  characterSpriteSheet: SpriteSheet,
  object: Phaser.GameObjects.Sprite
) => {
  const body = object.body as Phaser.Physics.Arcade.Body;

  body.setSize(
    body.width,
    characterSpriteSheet.boundingBox?.height || STANDING_NPC_BOUNDING_BOX_HEIGHT
  );
  body.setOffset(
    body.offset.x,
    characterSpriteSheet.boundingBox?.offset || STANDING_NPC_BOUNDING_BOX_OFFSET
  );
  body.immovable = true;
};

export const lookAtMainCharacter = (
  mainCharacter: Phaser.GameObjects.Sprite,
  npc: Phaser.GameObjects.Sprite,
  npcKey: string
) => {
  const charBody = mainCharacter.body as Phaser.Physics.Arcade.Body;
  const actionBody = npc.body as Phaser.Physics.Arcade.Body;
  const xDiff = charBody.center.x - actionBody.center.x;
  const yDiff = charBody.center.y - actionBody.center.y;
  let xDirection = 0;
  let yDirection = 0;
  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    xDirection = xDiff > 0 ? 1 : -1;
  } else {
    yDirection = yDiff > 0 ? 1 : -1;
  }

  updateAnimation(npc, xDirection, yDirection, npcKey, true);
};

export const updateVelocityWithAnimation = (
  character: Phaser.GameObjects.Sprite,
  directionX: number,
  directionY: number,
  animationPrefix: string,
  movementSpeed = MOVEMENT_SPEED
) => {
  updateCharacterVelocity(character, directionX, directionY, movementSpeed);
  updateAnimation(character, directionX, directionY, animationPrefix);
};
