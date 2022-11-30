import * as THREE from "three";
import Experience from "../Environment";

export class Cylinder extends THREE.Mesh {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;

    const vertexShader = `
varying vec3 vNormal;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 clipPosition = projectionMatrix * viewPosition;
  
  vNormal = normalize(normalMatrix * normal);

  gl_Position = clipPosition;
}
`;
    const fragmentShader = `
#include <common>
#include <lights_pars_begin>

uniform vec3 uColor;

varying vec3 vNormal;

void main() {
  float NdotL = dot(vNormal, directionalLights[0].direction);
  float lightIntensity = smoothstep(0.0, 0.01, NdotL);
  vec3 directionalLight = directionalLights[0].color * lightIntensity;
  
  gl_FragColor = vec4(uColor * (directionalLight + ambientLightColor), 1.0);
}
`;

    const params = {
      color: "#E1E5FA",
    };

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const uniforms = {
      uColor: { value: new THREE.Color(params.color) },
    };
    const shaderMaterial = new THREE.ShaderMaterial({
      lights: true,
      uniforms: { ...THREE.UniformsLib.lights, ...uniforms },
      vertexShader,
      fragmentShader,
    });
    const sphere = new THREE.Mesh(sphereGeometry, shaderMaterial);
    sphere.castShadow = true;
    this.scene.add(sphere);
  }
}
