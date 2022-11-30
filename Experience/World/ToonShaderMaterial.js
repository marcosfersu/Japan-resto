import * as THREE from "three";
import toonFragmentShader from "../Utils/shaders/toon.js";
import toonVertexShader from "../Utils/shaders/toonvert.js";

export class ToonShaderMaterial extends THREE.ShaderMaterial {
  constructor({ color = "#fff" }) {
    const uniforms = {
      uColor: { value: new THREE.Color(color) },
    };

    super({
      lights: true,
      uniforms: { ...THREE.UniformsLib.lights, ...uniforms },
      toonVertexShader,
      toonFragmentShader,
    });

    this.vertexShader = toonVertexShader();
    this.fragmentShader = toonFragmentShader();
  }
}
