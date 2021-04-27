export const emit = (
  scene: Phaser.Scene,
  event: string,
  data?: unknown
): void => {
  scene.events.emit(event, data);
};
