import { ctx } from "./App.js"


export class Pellet {
	constructor({ position }) {
		this.position = position
		this.radius = 3
	}

	isEaten({ x: pacmanX, y: pacmanY }, pacmanRadius) {
		return Math.hypot(
			this.position.x - pacmanX,
			this.position.y - pacmanY
			)
			<
			pacmanRadius + this.radius
	}

	draw() {
		ctx.beginPath()
		ctx.arc(
			this.position.x,
			this.position.y,
			this.radius,
			0,
			Math.PI * 2
		)
		ctx.fillStyle = "white"
		ctx.fill()
		ctx.closePath()
	}
}