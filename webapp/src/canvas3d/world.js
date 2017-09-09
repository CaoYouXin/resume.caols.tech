import texturePath from './Carte de la terre.png';

const vertexShader = `
uniform float u_ps;
uniform float u_r;
uniform float u_pi;

varying vec2 v_uv;
varying vec2 v_uv2;

void main() {
  
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;

  gl_PointSize = u_ps;

  v_uv = uv;
  v_uv2 = uv * 156.0;
}
`;

const fragmentShader = `
uniform sampler2D u_ball_tex;
uniform sampler2D u_particle_tex;

varying vec2 v_uv;
varying vec2 v_uv2;

void main() {
  vec4 color = texture2D(u_ball_tex, v_uv);
  
  if (color.r == 0.0) {
    gl_FragColor = vec4(0.1, 0.2, 0.9, 0.0);
  } else {
    vec4 particle_color = texture2D(u_particle_tex, v_uv2);
    if (particle_color.a == 1.0) {
      particle_color.rgb = vec3(0.0, 0.0, 0.0);
    }
    gl_FragColor = particle_color;
  }
}
`;

function World(elem) {
  this.container = elem;
  this.renderer = null;
  this.scene = null;
  this.camera = null;
  this.world = null;
  this.controls = null;

  //常量
  this.constObj = {
    ANGLE_INCLINED: Math.PI / 6,
    ROTATION_WORLD_RATE: 0.001,
    FIELD_OF_VIEW: 45,
    NEAR_CLIPPING_PLANE: 1,
    FAR_CLIPPING_PLANE: 10,

    WORLD_RADIUS: 1,
    GLOBE_RESOLUTION: 64,
    PARTICLE_SIZE: 0.05
  }
}

World.prototype.initRender = function () {
  var container = this.container;
  var renderer = null;

  renderer = new window.THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);

  this.renderer = renderer;
  this.container.appendChild(this.renderer.domElement);
}

World.prototype.initScene = function () {
  this.scene = new window.THREE.Scene();
}

World.prototype.initCamera = function () {
  var container = this.container;
  var CONST = this.constObj;
  var camera = null;

  camera = new window.THREE.PerspectiveCamera(
    CONST.FIELD_OF_VIEW,
    container.offsetWidth / container.offsetHeight,
    CONST.NEAR_CLIPPING_PLANE,
    CONST.FAR_CLIPPING_PLANE
  );
  //相机坐标
  camera.position.set(0, 0, 3);
  camera.lookAt(new window.THREE.Vector3(0, 0, 0));

  this.camera = camera;

  this.scene.add(this.camera);
}

World.prototype.sprite = function () {
  var canvas = document.createElement('canvas');

  canvas.width = 128;
  canvas.height = 128;
  var ctx = canvas.getContext('2d', { alpha: true });
  var gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2
  );
  gradient.addColorStop(0, 'rgba(230,215,12,1)');
  gradient.addColorStop(0.5, 'rgba(220,200,11,1)');
  gradient.addColorStop(0.72, 'rgba(200,280,9,.2)');
  gradient.addColorStop(1, 'rgba(220,250,25,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
}

World.prototype.initWorld = function () {
  var CONST = this.constObj;

  var geometry = new window.THREE.SphereGeometry(CONST.WORLD_RADIUS, CONST.GLOBE_RESOLUTION, CONST.GLOBE_RESOLUTION);

  var texture = new window.THREE.CanvasTexture(this.sprite(),
    window.THREE.UVMapping, window.THREE.RepeatWrapping, window.THREE.RepeatWrapping,
    window.THREE.LinearFilter, window.THREE.LinearMipMapLinearFilter,
    window.THREE.RGBAFormat);
  var planetMap = window.THREE.ImageUtils.loadTexture(texturePath);
  var material = new window.THREE.ShaderMaterial({
    uniforms: {
      "u_ps": { value: this.container.offsetHeight / 5 * CONST.PARTICLE_SIZE },
      "u_r": { value: CONST.WORLD_RADIUS + 0.0 },
      "u_pi": { value: Math.PI },
      "u_ball_tex": { type: 't', value: planetMap },
      "u_particle_tex": { type: 't', value: texture }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    blending: window.THREE.AdditiveBlending,
    depthTest: false,
  });

  this.world = new window.THREE.Mesh(geometry, material);
  this.scene.add(this.world);
}

World.prototype.initSepher = function () {
  var CONST = this.constObj;

  this.scene.add(new window.THREE.Mesh(
    new window.THREE.SphereGeometry(CONST.WORLD_RADIUS - 0.01, CONST.GLOBE_RESOLUTION, CONST.GLOBE_RESOLUTION),
    new window.THREE.MeshBasicMaterial({
      color: "#00F",
      // transparent: true,
      // opacity: 0.5,
      // blending: window.THREE.AdditiveBlending,
      // depthTest: false,
    })
  ));
}

World.prototype.initControls = function () {
  this.controls = new window.THREE.OrbitControls(this.camera, this.renderer.domElement);
}

World.prototype.build = function () {
  this.initRender();
  this.initScene();
  this.initCamera();
  this.initWorld();
  this.initSepher();
  this.initControls();
}

World.prototype.rotate = function () {
  var self = this;
  var CONST = self.constObj;

  self.renderer.render(self.scene, self.camera);
  self.world.rotation.y += CONST.ROTATION_WORLD_RATE;
  requestAnimationFrame(function () { self.rotate(); });
}

export { World };
