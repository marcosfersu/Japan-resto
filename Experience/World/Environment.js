import * as THREE from "three";
import Experience from "../Experience";

import GSAP from "gsap";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunLight();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#fff", 1.5);
    this.sunLight2 = new THREE.DirectionalLight("#fff", 0.5);
    this.sunLight.castShadow = true;
    this.sunLight2.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight2.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight2.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight2.shadow.normalBias = 0.05;
    //const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    //this.scene.add(helper);
    this.sunLight.position.set(-2.5, 7, 3);
    this.sunLight2.position.set(-3, 7, -3);
    this.scene.add(this.sunLight);
    this.scene.add(this.sunLight2);

    this.ambientLight = new THREE.AmbientLight("#fff", 1.2);
    this.scene.add(this.ambientLight);

    this.sphereSize = 1;
    this.pointLightHelper = new THREE.PointLightHelper(
      this.sunLight,
      this.sphereSize
    );
    this.pointLightHelper2 = new THREE.PointLightHelper(
      this.sunLight2,
      this.sphereSize
    );
    this.scene.add(this.pointLightHelper);
    this.scene.add(this.pointLightHelper2);
  }

  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.sunLight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      GSAP.to(this.sunLight2.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      GSAP.to(this.ambientLight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });

      GSAP.to(this.sunLight, {
        intensity: 0.78,
      });
      GSAP.to(this.sunLight2, {
        intensity: 0.78,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.78,
      });
    } else {
      GSAP.to(this.sunLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.sunLight2.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.sunLight, {
        intensity: 1.5,
      });
      GSAP.to(this.sunLight2, {
        intensity: 0.5,
      });
      GSAP.to(this.ambientLight, {
        intensity: 1.2,
      });
    }
  }

  resize() {}

  update() {}
}
