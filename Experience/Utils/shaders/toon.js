export default function toonFragmentShader() {
  return `#include <common>
#include <lights_pars_begin>

uniform vec3 uColor;

varying vec3 vNormal;

void main() {
  float NdotL = dot(vNormal, directionalLights[0].direction);
  float lightIntensity = smoothstep(0.0, 0.01, NdotL);
  vec3 directionalLight = directionalLights[0].color * lightIntensity;
  
  gl_FragColor = vec4(uColor * (directionalLight + ambientLightColor), 1.0);
}`;
}
