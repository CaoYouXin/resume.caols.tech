import texturePath from './Carte de la terre.png';

const vertexShader = `
uniform float u_ps;
uniform float u_r;
uniform float u_pi;

varying vec2 v_uv;

void main() {
  
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;

  gl_PointSize = u_ps;

  v_uv.y = asin(position.y / u_r);

  float r = u_r * cos(v_uv.y);
  float asinV = asin(position.z / r);
  float acosV = acos(position.x / r);

  if (position.z > 0.0) {
    if (position.x > 0.0) {
      v_uv.x = asinV;
    } else {
      v_uv.x = acosV;
    }
  } else {
    if (position.x > 0.0) {
      v_uv.x = asinV + 2.0 * u_pi;
    } else {
      v_uv.x = 2.0 * u_pi - acosV;
    }
  }

  v_uv.x = v_uv.x / 2.0 / u_pi;
  v_uv.x = 1.0 - v_uv.x;
  v_uv.y = (v_uv.y + u_pi / 2.0) / u_pi;
}
`;

const fragmentShader = `
uniform sampler2D u_ball_tex;
uniform sampler2D u_particle_tex;

varying vec2 v_uv;

void main() {
  vec4 color = texture2D(u_ball_tex, v_uv);
  
  if (color.r == 0.0) {
    discard;
  } else {
    gl_FragColor = texture2D( u_particle_tex, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ));
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
  var ctx = canvas.getContext('2d');
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

  var geometry = new window.THREE.Geometry();
  // var count = 0;
  var uvSupport = {};
  var step = Math.atan(CONST.PARTICLE_SIZE / CONST.WORLD_RADIUS / 2);
  step = 2 * Math.PI / Math.ceil(2 * Math.PI / step);
  for (var i = step - Math.PI / 2; i < Math.PI / 2; i += step) {
    var radius = Math.cos(i) * CONST.WORLD_RADIUS;
    var y = Math.sin(i) * CONST.WORLD_RADIUS;
    uvSupport[y] = (i + Math.PI / 2) / Math.PI;
    var angle = Math.atan(CONST.PARTICLE_SIZE / radius / 2);
    angle = 2 * Math.PI / Math.ceil(2 * Math.PI / angle);
    for (var j = 0; j <= 2 * Math.PI; j += angle) {
      // count++;
      geometry.vertices.push(new window.THREE.Vector3(Math.cos(j) * radius, y, Math.sin(j) * radius));
      geometry.colors.push(new window.THREE.Color(1, 1, 1));
    }
  }
  geometry.vertices.push(new window.THREE.Vector3(0, - CONST.WORLD_RADIUS, 0));
  geometry.colors.push(new window.THREE.Color(1, 1, 1));
  geometry.vertices.push(new window.THREE.Vector3(0, CONST.WORLD_RADIUS, 0));
  geometry.colors.push(new window.THREE.Color(1, 1, 1));

  // console.log('count', count + 2);
  geometry.mergeVertices();
  geometry.verticesNeedUpdate = true;

  var texture = new window.THREE.CanvasTexture(this.sprite());
  var planetMap = window.THREE.ImageUtils.loadTexture(texturePath);
  // planetMap.image.style.position = 'absolute';
  // planetMap.image.style.top = planetMap.image.style.left = '0';
  // console.log(this.container.appendChild(planetMap.image));
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
  this.world = new window.THREE.Points(geometry, material);
  this.scene.add(this.world);
}

World.prototype.initSepher = function () {
  var CONST = this.constObj;

  var geometry = new window.THREE.SphereGeometry(CONST.WORLD_RADIUS - 0.01, CONST.GLOBE_RESOLUTION, CONST.GLOBE_RESOLUTION);
  geometry.computeTangents();
  var material = new window.THREE.MeshBasicMaterial({
    color: "#00F",
  });
  this.scene.add(new window.THREE.Mesh(geometry, material));
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
  // var CONST = self.constObj;

  self.renderer.render(self.scene, self.camera);
  // self.world.rotation.y += CONST.ROTATION_WORLD_RATE;
  requestAnimationFrame(function () { self.rotate(); });
}

export { World };
