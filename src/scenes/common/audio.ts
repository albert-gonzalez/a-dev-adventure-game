export interface Audio {
  key: string;
  url: string;
}

export const loadAudio = (scene: Phaser.Scene, audiosToLoad: Audio[]) => {
  audiosToLoad.forEach((audio) => scene.load.audio(audio.key, audio.url));
};
