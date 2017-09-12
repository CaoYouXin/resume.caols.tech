import { World } from './world';

const world = new World();
world.build();

export const p_world_params = () => {
  return [
    (renderer) => {
      world.initCamera(renderer.domElement);
      world.initControls(renderer.domElement);
      world.reset(-116.46, 39.92);
      world.looping = true;
      world.animate(renderer);
    },
    () => {
      world.looping = false;
      world.destroyControls();
    },
    {
      setCoord: (longtitude, latitude) => {
        world.reset(longtitude, latitude);
        world.setCursor(longtitude, latitude);
      }
    }
  ];
}