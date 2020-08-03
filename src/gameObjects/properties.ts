export const findPropertyByName = (
  object: Phaser.GameObjects.GameObject,
  propertyName: string
) =>
  Object.values(object.data?.getAll() || {}).find(
    (obj) => obj.name === propertyName
  );
