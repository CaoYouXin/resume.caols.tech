const THREE = window.THREE;

export class Canvas3D {
  constructor(elem) {
    this.container = elem;
    this.renderer = null;
    this.scenes = {};
    this.currentScene = null;

    this.initRenderer();
  }

  resizeRenderer(elem) {
    this.renderer.setSize(elem.offsetWidth, elem.offsetHeight);

    var currentScene = this.currentScene;
    if (currentScene && currentScene.retObj.resize) {
      currentScene.retObj.resize(elem);
    }
  }

  initRenderer() {
    var container = this.container;
    var renderer = null;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);

    this.renderer = renderer;
    this.container.appendChild(this.renderer.domElement);
  }

  setupScene(name, starter, ender, retObj, override) {
    var prevScene = this.scenes[name];
    if (prevScene && !override) {
      throw new Error('scene [' + name + '] cannot be override.');
    }

    this.scenes[name] = {
      name,
      starter,
      ender,
      retObj
    };
  }

  startScene(name) {
    var currentScene = this.currentScene;
    if (currentScene) {
      currentScene.ender(this.renderer);
    }

    currentScene = this.scenes[name];
    currentScene.starter(this.renderer);

    this.currentScene = currentScene;
    return currentScene.retObj;
  }
}

export * from './p_world';