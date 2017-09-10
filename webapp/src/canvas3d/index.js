import { World } from './world.js';

let world;

export function init3d(elem) {
  world = new World(elem);
  world.build();
  world.rotate();
  console.log(world);
};

export function reset3d() {
  if (world && typeof world.reset === 'function') {
    world.reset();
  }
}

export function setCursor(longitude, latitude) {
  if (world && typeof world.setCursor === 'function') {
    world.setCursor(longitude, latitude);
  }
}