import { World } from './world.js';

export function init3d(elem) {
  var world = new World(elem);
  world.build();
  world.rotate();
  // console.log(world);


};