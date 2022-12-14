import * as THREE from "three";

import assets from "./Utils/assets";
import Resources from "./Utils/Resources";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

import Camera from "./Camera.js";
import Renderer from "./Renderer";

import ScrollPosition from "./Utils/ScrollPosition";

import World from "./World/World";

export default class Experience {
	static instance;
	constructor(canvas) {
		if (Experience.instance) {
			return Experience.instance;
		}
		Experience.instance = this;
		this.canvas = canvas;
		this.scene = new THREE.Scene();
		this.time = new Time();
		this.sizes = new Sizes();
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.resources = new Resources(assets);
		this.world = new World();

		const textParent = document.querySelectorAll(".section-text");
		textParent.forEach(text => {
			ScrollPosition(text);
		});

		this.sizes.on("resize", () => {
			this.resize();
		});
		this.time.on("update", () => {
			this.update();
		});
	}
	resize() {
		this.camera.resize();
		this.world.resize();
		this.renderer.resize();
	}
	update() {
		this.camera.update();
		this.world.update();
		this.renderer.update();
	}
}
