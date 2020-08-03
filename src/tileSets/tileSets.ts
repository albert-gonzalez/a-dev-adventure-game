import "phaser";

export const createTileSetLayer = (
  map: Phaser.Tilemaps.Tilemap,
  tileSetName: string,
  key: string,
  layerId: string
) => {
  const tiles = map.addTilesetImage(tileSetName, key);

  return map
    .createStaticLayer(layerId, tiles, 0, 0)
    .setVisible(false)
    .setCollisionFromCollisionGroup();
};
