import texturePath from './Carte de la terre.png';

const worldVertexShader = `
varying vec2 v_uv;
varying vec2 v_uv2;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;

  v_uv = uv;
  v_uv2 = uv * 156.0;
}
`;

const worldFragmentShader = `
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
    gl_FragColor = particle_color;
  }
}
`;

const THREE = window.THREE;
const TWEEN = window.TWEEN;

function World() {
  this.constObj = {
    ANGLE_INCLINED: Math.PI / 6,
    ROTATION_WORLD_RATE: 0.001,
    FIELD_OF_VIEW: 45,
    NEAR_CLIPPING_PLANE: 1,
    FAR_CLIPPING_PLANE: 10,

    WORLD_RADIUS: 1,
    GLOBE_RESOLUTION: 64,
    PARTICLE_SIZE: 0.05
  };
}

World.prototype.initScene = function () {
  this.scene = new THREE.Scene();
}

World.prototype.initCamera = function (container) {
  var CONST = this.constObj;
  var camera = null;

  camera = new THREE.PerspectiveCamera(
    CONST.FIELD_OF_VIEW,
    container.offsetWidth / container.offsetHeight,
    CONST.NEAR_CLIPPING_PLANE,
    CONST.FAR_CLIPPING_PLANE
  );

  this.camera = camera;

  this.scene.add(this.camera);
}

World.prototype.resizeCamera = function (container) {
  this.camera.aspect = container.offsetWidth / container.offsetHeight;
  this.camera.updateProjectionMatrix();
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
  gradient.addColorStop(0.1, 'rgba(220,200,11,1)');
  gradient.addColorStop(0.22, 'rgba(200,280,9,.8)');
  gradient.addColorStop(1, 'rgba(220,250,25,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
}

World.prototype.initWorld = function () {
  var CONST = this.constObj;

  var geometry = new THREE.SphereGeometry(CONST.WORLD_RADIUS, CONST.GLOBE_RESOLUTION, CONST.GLOBE_RESOLUTION);

  var texture = new THREE.CanvasTexture(this.sprite(),
    THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping,
    THREE.LinearFilter, THREE.LinearMipMapLinearFilter,
    THREE.RGBAFormat);
  var planetMap = THREE.ImageUtils.loadTexture(texturePath);
  var material = new THREE.ShaderMaterial({
    uniforms: {
      "u_ball_tex": { type: 't', value: planetMap },
      "u_particle_tex": { type: 't', value: texture }
    },
    vertexShader: worldVertexShader,
    fragmentShader: worldFragmentShader,
    transparent: true,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    // side: THREE.DoubleSide
  });

  this.world = new THREE.Mesh(geometry, material);
  this.scene.add(this.world);
}

World.prototype.initSepher = function () {
  var CONST = this.constObj;

  this.scene.add(new THREE.Mesh(
    new THREE.SphereGeometry(CONST.WORLD_RADIUS - 0.01, CONST.GLOBE_RESOLUTION, CONST.GLOBE_RESOLUTION),
    new THREE.MeshBasicMaterial({
      color: "#00f",
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    })
  ));
}

World.prototype.initControls = function (domElement) {
  this.controls = new THREE.OrbitControls(this.camera, domElement);
}

World.prototype.destroyControls = function () {
  if (this.controls) {
    this.controls.destroy();
  }
}

World.prototype.reset = function (longitude, latitude) {
  //相机坐标
  longitude = longitude / 180 * Math.PI;
  latitude = latitude / 180 * Math.PI;
  this.camera.position.set(3 * Math.cos(longitude), 3 * Math.sin(latitude), 3 * Math.sin(longitude));
  // this.camera.position.set(0, 0, 3);
  this.camera.lookAt(new THREE.Vector3(0, 0, 0));

  this.world.rotation.y = 0;
}

World.prototype.build = function () {
  this.initScene();
  this.initWorld();
  this.initSepher();
}

World.prototype.initCursor = function () {
  if (this.cursor) {
    return;
  }

  this.cursor = new THREE.Mesh(
    new THREE.RingBufferGeometry(0.05, 0.1, 32, 1, 0, 2 * Math.PI),
    new THREE.MeshBasicMaterial({ color: "#9988FF" })
  )

  this.cursor.position.set(0, 0, this.constObj.WORLD_RADIUS);
  this.scene.add(this.cursor);

  const cursor = this.cursor;
  this.tween = new TWEEN.Tween({ scale: 1 })
    .to({ scale: 0.1 }, 512)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      cursor.scale.y = cursor.scale.x = this.scale;
    })
    .repeat(Infinity)
    .yoyo(true)
    .start();
}

World.prototype.setCursor = function (longitude, latitude) {
  this.initCursor();
  var CONST = this.constObj;

  longitude = longitude / 180 * Math.PI;// - this.world.rotate.y;
  latitude = latitude / 180 * Math.PI;
  this.cursor.position.y = Math.sin(latitude) * CONST.WORLD_RADIUS;

  var r = Math.cos(latitude) * CONST.WORLD_RADIUS;
  this.cursor.position.x = Math.cos(longitude) * r;
  this.cursor.position.z = Math.sin(longitude) * r;

  this.cursor.rotation.y = 0 - longitude + Math.PI / 2;
  this.cursor.rotation.x = latitude;
}

World.prototype.animate = function (renderer) {
  TWEEN.update();

  var self = this;
  renderer.render(self.scene, self.camera);

  if (this.looping) {
    requestAnimationFrame(function () { self.animate(renderer); });
  }
}

export { World };
