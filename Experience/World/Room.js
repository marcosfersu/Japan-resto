import GSAP from "gsap";
import * as THREE from "three";
import Experience from "../Experience";

import { Cylinder } from "./geometries/Cylinder";
import { ToonShaderMaterial } from "./ToonShaderMaterial.js";

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

			if (child instanceof THREE.Group) {
				child.children.forEach(groupchild => {
					groupchild.castShadow = true;
					groupchild.receiveShadow = true;
				});
			}

			if (child.name === "Chopsticks" || child.name === "Chopsticks001") {
				child.material = new ToonShaderMaterial({ color: "#2C2D2C" });
			}

			if (child.name === "Plate") {
				child.material = new ToonShaderMaterial({ color: "#5F605D" });
			}

			if (child.name === "Egg" || child.name === "Egg001") {
				child.material = new ToonShaderMaterial({ color: "#FFE4C8" });
			}
			if (child.name === "EggWhite" || child.name === "EggWhite001") {
				child.material = new ToonShaderMaterial({ color: "#FFA03B" });
			}
			/*
			if (child.name === "Liquid") {
				child.material = new ToonShaderMaterial({ color: "#B84D00" });
			}
*/
			if (child.name === "Noodles") {
				child.material = new ToonShaderMaterial({ color: "#B28C17" });
			}

			if (child.name === "PorkMeat" || child.name === "PorkMeat001") {
				child.material = new ToonShaderMaterial({ color: "#B1583B" });
			}

			if (
				child.name === "Celery" ||
				child.name === "Celery001" ||
				child.name === "Celery002"
			) {
				child.material = new ToonShaderMaterial({ color: "#2E5206" });
			}
			if (child.name === "CeleryWhite") {
				child.material = new ToonShaderMaterial({ color: "#838D25" });
			}

			if (child.name === "Alga" || child.name === "Alga001") {
				child.material = new ToonShaderMaterial({ color: "#2E5206" });
			}

			if (
				child.name === "Corn01" ||
				child.name === "Corn02" ||
				child.name === "Corn03" ||
				child.name === "Corn04" ||
				child.name === "Corn05" ||
				child.name === "Corn06" ||
				child.name === "Corn07" ||
				child.name === "Corn08" ||
				child.name === "Corn09"
			) {
				child.material = new ToonShaderMaterial({ color: "#FCB72D" });
			}

			console.log(child.name);
		});

		//this.cylinder = new Cylinder();

		//this.scene.add(this.cylinder);

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
