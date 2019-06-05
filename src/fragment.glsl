uniform float time;
uniform float progress;
uniform vec2 accel;
varying vec2 vUv;
varying vec2 vUv1;
varying vec4 vPosition;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec2 pixels;
uniform vec2 uvRate1;

vec2 mirrored(vec2 v) {
  vec2 m = mod(v,2.);
  return mix(m,2.0 - m, step(1.0 ,m));
}

float tri(float p) {
  return mix(p, 1.0 - p, step(0.5 ,p))*2.;
}

void main() {
  vec2 uv = gl_FragCoord.xy/pixels.xy;

  float p = fract(time);

  float delayValue = p*7. + uv.y*2. - uv.x*0.8 - 2.;

  delayValue = clamp(delayValue,0.,1.);

  vec2 translateValue = p + delayValue*accel;
  vec2 translateValue1 = vec2(-0.5,1.)* translateValue;
  vec2 translateValue2 = vec2(-1,0.5)* (translateValue - 1. - accel);

  vec2 w = sin( sin(time)*vec2(0,0.2) + vUv.xy*vec2(0.1,0.5))*vec2(0,-0.3);
  vec2 xy = w*(tri(p)*0.5 + tri(delayValue)*0.5);

  vec2 uv1 = vUv1 + translateValue1 + xy;
  vec2 uv2 = vUv1 + translateValue2 + xy;

  vec4 rgba1 = texture2D(texture1,mirrored(uv1));
  vec4 rgba2 = texture2D(texture2,mirrored(uv2));

  vec4 rgba = mix(rgba1,rgba2,delayValue);
  gl_FragColor = rgba;

  // vec4 rgba1 = texture2D(texture1,vUv1);
  // vec4 rgba2 = texture2D(texture2,vUv1);

  // vec4 rgba = mix(rgba1, rgba2, sin(time));

  // vec4 deformation =

  // gl_FragColor = rgba;
}