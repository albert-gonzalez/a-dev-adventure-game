import { COFFEE_IMAGE } from "./images";

export const addParticleEmitters = (scene: Phaser.Scene) => {
  const particles = scene.add.particles(COFFEE_IMAGE);

  particles.createEmitter({
    x: 0,
    y: -50,
    lifespan: 10000,
    speed: { min: 50, max: 100 },
    angle: { min: 70, max: 100 },
    gravityY: 5,
    bounce: 1000,
    frequency: 500,
    rotate: {
      onUpdate(particle) {
        return (particle.angle || Math.floor(Math.random() * 180)) + 1;
      },
    },
    scale: {
      random: [0.75, 1.5],
    },
    emitZone: {
      type: "random",
      source: new Phaser.Geom.Rectangle(
        0,
        0,
        800,
        10
      ) as Phaser.Types.GameObjects.Particles.RandomZoneSource,
    },
  });
};
