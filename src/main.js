import * as THREE from 'three';
import fragment from './fragment.glsl';
import vertex from './vertex.glsl';

let loader = new THREE.TextureLoader();
let gallery = [
  loader.load('img/img1.jpg'),
  loader.load('img/img2.jpg'),
  loader.load('img/img3.jpg'),
  loader.load('img/img4.jpg'),
  loader.load('img/img5.jpg'),
  loader.load('img/img6.jpg')
];

let scene, camera, renderer, material, plane;
let time = 0, curSlide = 0;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.001, 100 );
  camera.position.set( 0, 0, 1 );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // material = new THREE.MeshBasicMaterial( { map: gallery[Math.floor(Math.random() * 6)] } );
  material = new THREE.ShaderMaterial( {
    side: THREE.DoubleSide,
    uniforms: {
      time: { type: 'f', value: 0 },
      pixels: {type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
      accel: {type: 'v2', value: new THREE.Vector2(0.5,2)},
      progress: {type: 'f', value: 0},
      uvRate1: {
        value: new THREE.Vector2(1,1)
      },
      texture1: {
        value: gallery[curSlide]
      },
      texture2: {
        value: gallery[curSlide + 1]
      },
    },
    vertexShader: vertex,
    fragmentShader: fragment
  });
  plane = new THREE.Mesh(new THREE.PlaneGeometry( 1, 1, 1, 1 ), material);
  scene.add( plane );
  resize();
}


// document.addEventListener('wheel',function(event) {
//   time += event.deltaY*0.0002;
// });


let animate = function () {
  time = time + 0.004;
  if(time > 1.0) {
    time = 0;
    curSlide = (curSlide + 1) % gallery.length;
    material.uniforms.texture1.value = gallery[curSlide];
    material.uniforms.texture2.value = gallery[(curSlide + 1) % gallery.length];
  }
  if(time < 0) {
    time = 1;
    curSlide = (curSlide + gallery.length - 1) % gallery.length;
    material.uniforms.texture1.value = gallery[curSlide];
    material.uniforms.texture2.value = gallery[(curSlide + 1) % gallery.length];
  }
  material.uniforms.time.value = Math.sin(time * Math.PI / 2);
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
};


window.addEventListener('resize', resize);
function resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  renderer.setSize( w, h );
  camera.aspect = w / h;

  // material.uniforms.uvRate1.value.y = h / w;

  // calculate scene
  let dist  = camera.position.z - plane.position.z;
  let height = 1;
  camera.fov = 2*(180/Math.PI)*Math.atan(height/(2*dist));

  // if(w/h>1) {
  plane.scale.x = w/h;
  // }

  camera.updateProjectionMatrix();
}

init();
animate();