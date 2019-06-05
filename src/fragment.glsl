uniform float time;
uniform float progress;
varying vec2 vUv;
varying vec2 vUv1;
varying vec4 vPosition;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec2 pixels;
uniform vec2 uvRate1;

void main() {
  vec4 rgba1 = texture2D(texture1,vUv1);
  vec4 rgba2 = texture2D(texture2,vUv1);

  vec4 rgba = mix(rgba1, rgba2, sin(time));

  vec4 deformation =

  gl_FragColor = rgba;
}