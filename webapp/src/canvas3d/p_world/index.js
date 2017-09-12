import { World } from './world';

const world = new World();
world.build();

export const p_world_params = () => {
  return [
    "particle_world",
    (renderer) => {
      world.initCamera(renderer.domElement);
      world.initControls(renderer.domElement);
      world.reset();
      world.looping = true;
      world.animate(renderer);
    },
    () => {
      world.looping = false;
      world.destroyControls();
    },
    {
      setCoord: (longtitude, latitude) => {
        world.reset();
        world.setCursor(longtitude, latitude);
      }
    }
  ];
}