import {
	controlKeys,
	ctx,
	isItemCollidesWithBorder,
	lastKey,
	prevKey
} from "./App.js"


export class Pacman {
	constructor({ position, velocity }) {
		this.position = position
		this.velocity = velocity
		this.radius = 15
	}

	move(borders) {
		const { w, a, s, d } = controlKeys

		if (w.pressed && lastKey === "w") {
			for (let i = 0; i < borders.length; i++) {
				const border = borders[i]
				const cond = isItemCollidesWithBorder(
					{
						...this,
						velocity: { x: 0, y: -5 }
					},
					border
				)

				if (cond) {
					this.continuePrevMove()
					break
				} else {
					this.velocity.y = -5
				}
			}
		} else if (a.pressed && lastKey === "a") {
			for (let i = 0; i < borders.length; i++) {
				const border = borders[i]
				const cond = isItemCollidesWithBorder(
					{
						...this,
						velocity: { x: -5, y: 0 }
					},
					border
				)

				if (cond) {
					this.continuePrevMove()
					break
				} else {
					this.velocity.x = -5
				}
			}
		} else if (s.pressed && lastKey === "s") {
			for (let i = 0; i < borders.length; i++) {
				const border = borders[i]
				const cond = isItemCollidesWithBorder(
					{
						...this,
						velocity: { x: 0, y: 5 }
					},
					border
				)

				if (cond) {
					this.continuePrevMove()
					break
				} else {
					this.velocity.y = 5
				}
			}
		} else if (d.pressed && lastKey === "d") {
			for (let i = 0; i < borders.length; i++) {
				const border = borders[i]
				const cond = isItemCollidesWithBorder(
					{
						...this,
						velocity: { x: 5, y: 0 }
					},
					border
				)

				if (cond) {
					this.continuePrevMove()
					break
				} else {
					this.velocity.x = 5
				}
			}
		}
	}

	continuePrevMove() {
		const { w, a, s, d } = controlKeys

		if (prevKey === "w" && !s.pressed) {
			this.velocity.y = -5
			this.velocity.x = 0
		} else if (prevKey === "a" && !d.pressed) {
			this.velocity.x = -5
			this.velocity.y = 0
		} else if (prevKey === "s" && !w.pressed) {
			this.velocity.y = 5
			this.velocity.x = 0
		} else if (prevKey === "d" && !a.pressed) {
			this.velocity.x = 5
			this.velocity.y = 0
		}
	}

	stop() {
		this.velocity.x = 0
		this.velocity.y = 0
	}

	update() {
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		this.draw()
	}

	pacmanCollidesWithBorder(borders) {
		borders.forEach(border => {
			if (isItemCollidesWithBorder(this, border)) this.stop()
		})
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
		ctx.fillStyle = "gold"
		ctx.fill()
		ctx.closePath()
	}
}