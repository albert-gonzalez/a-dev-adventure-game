import {
  COFFEE_IMAGE,
  CSS_IMAGE,
  DOCKER_IMAGE,
  HTML_IMAGE,
  JS_IMAGE,
  NODE_IMAGE,
  PHP_IMAGE,
} from "./images";

interface EmitterOptions {
  image: string;
  scale?: [number, number];
}

let particleDelay = 0;

export const addParticleEmitters = (scene: Phaser.Scene): void => {
  createParticleEmitter(scene, { image: COFFEE_IMAGE });
  createParticleEmitter(scene, { image: JS_IMAGE });
  createParticleEmitter(scene, { image: HTML_IMAGE });
  createParticleEmitter(scene, { image: CSS_IMAGE });
  createParticleEmitter(scene, { image: NODE_IMAGE, scale: [0.4, 0.5] });
  createParticleEmitter(scene, { image: PHP_IMAGE, scale: [0.3, 0.4] });
  createParticleEmitter(scene, { image: DOCKER_IMAGE, scale: [0.3, 0.4] });
};

const createParticleEmitter = (
  scene: Phaser.Scene,
  options: EmitterOptions
): void => {
  const particles = scene.add.particles(options.image);

  particles.createEmitter({
    x: 0,
    y: -50,
    lifespan: 10000,
    speed: { min: 50, max: 100 },
    angle: { min: 70, max: 100 },
    gravityY: 5,
    bounce: 2000,
    frequency: 3000,
    rotate: {
      onUpdate(particle) {
        const direction = particle.velocityX > 0 ? 0.5 : -0.5;

        return (particle.angle ?? Math.floor(Math.random() * 90)) + direction;
      },
    },
    scale: {
      random: options.scale ?? [0.2, 0.3],
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
    delay: particleDelay,
  });

  particleDelay += 500;
};
