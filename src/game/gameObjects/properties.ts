export const findPropertyByName = (
  object: Phaser.GameObjects.GameObject,
  propertyName: string
): string => object.data.getAll()[propertyName];
