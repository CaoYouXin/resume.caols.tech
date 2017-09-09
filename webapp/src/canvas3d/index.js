import { World } from './world.js';

let world;

export function init3d(elem) {
  world = new World(elem);
  world.build();
  world.rotate();
};

export function reset3d() {
  if (world && typeof world.reset === 'function') {
    world.reset();
  }
}