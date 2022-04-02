import { ctx } from "./App.js"


export class PowerUp {
	constructor({ position }) {
		this.position = position
		this.radius = 10
	}

	isEaten({ x: pacmanX, y: pacmanY }, pacmanRadius) {
		return [
			Math.hypot(
				this.position.x - pacmanX,
				this.position.y - pacmanY
			)
			<
			pacmanRadius + this.radius,
			true
		]
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