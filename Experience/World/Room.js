import GSAP from "gsap";
import * as THREE from "three";
import Experience from "../Experience";

import toonVertexShader from "../Utils/toon.vert";
import toonFragmentShader from "../Utils/toon.frag";

import { EventEmitter } from "events";

//import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room extends EventEmitter {
	constructor() {
		super();
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.time = this.experience.time;
		this.room = this.resources.items.room;
		this.actualRoom = this.room.scene;
		this.roomChildren = {};

		this.lerp = {
			current: 0,
			target: 0,
			ease: 0.1,
		};

		this.setModel();
		this.setAnimation();
		this.onMouseMove();
	}

	setModel() {
		this.actualRoom.children.forEach(child => {
			child.castShadow = true;
			child.receiveShadow = true;

			this.toonShaderMaterial = new THREE.ShaderMaterial({
				vertexShader: toonVertexShader,
				fragmentShader: toonFragmentShader,
			});

			if (child instanceof THREE.Group) {
				child.children.forEach(groupchild => {
					groupchild.castShadow = true;
					groupchild.receiveShadow = true;
				});
			}

			if (child.name === "plate") {
				child.material = this.toonShaderMaterial;
			}
		});

		this.scene.add(this.actualRoom);
	}

	setAnimation() {
		this.mixer = new THREE.AnimationMixer(this.actualRoom);
	}

	onMouseMove() {
		window.addEventListener("mousemove", e => {
			this.rotation =
				((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
			this.lerp.target = this.rotation * 0.1;
		});
	}

	resize() {}

	update() {
		this.lerp.current = GSAP.utils.interpolate(
			this.lerp.current,
			this.lerp.target,
			this.lerp.ease
		);

		this.actualRoom.rotation.y = this.lerp.current;

		this.mixer.update(this.time.delta * 0.0009);
	}
}
