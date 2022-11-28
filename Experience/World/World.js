import Experience from "../Experience";

import Environment from "./Environment";
import Floor from "./Floor";
import Room from "./Room";

import { EventEmitter } from "events";

export default class World extends EventEmitter {
	constructor() {
		super();
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;
		this.camera = this.experience.camera;
		this.resources = this.experience.resources;
		this.theme = this.experience.theme;

		this.resources.on("ready", () => {
			this.environment = new Environment();
			this.floor = new Floor();
			this.room = new Room();
			//this.Controls = new Controls();
			this.emit("worldready");
		});
	}

	switchTheme(theme) {
		if (this.environment) {
			this.environment.switchTheme(theme);
		}
	}

	resize() {}

	update() {
		if (this.room) {
			this.room.update();
		}

		if (this.Controls) {
			this.Controls.update();
		}
	}
}
