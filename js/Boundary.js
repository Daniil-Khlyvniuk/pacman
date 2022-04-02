import { ctx } from "./App.js"


export class Boundary {
	static width = 40
	static height = 40

	constructor({ position, image }) {
		this.position = position
		this.image = image
	}

	draw() {
		const { x, y } = this.position

		ctx.drawImage(this.image, x, y)
	}
}