import {
	controlKeys,
	ctx,
	isItemCollidesWithBorder,
	lastKey,
	prevKey,
	teleport
} from "./App.js"


export class Pacman {
	constructor({ position, velocity }) {
		this.position = position
		this.velocity = velocity
		this.radius = 15
		this.radians = .75
		this.openRate = .12
		this.rotation = 0
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
		this.draw()
		this.setRotation()
		teleport(this)
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if (this.radians < 0 || this.radians > .75) {
			this.openRate = -this.openRate
		}
		this.radians += this.openRate
	}

	pacmanCollidesWithBorder(borders) {
		borders.forEach(border => {
			if (isItemCollidesWithBorder(this, border)) this.stop()
		})
	}

	setRotation() {
		const { x, y } = this.velocity

		if (x > 0) this.rotation = 0
		else if (x < 0) this.rotation = Math.PI
		else if (y > 0) this.rotation = Math.PI * .5
		else if (y < 0) this.rotation = Math.PI * 1.5
	}


	draw() {
		const { x, y } = this.position

		ctx.save()
		ctx.translate(x, y)
		ctx.rotate(this.rotation)
		ctx.translate(-x, -y)
		ctx.beginPath()
		ctx.arc(
			x,
			y,
			this.radius,
			this.radians,
			Math.PI * 2 - this.radians
		)
		ctx.lineTo(x, y)
		ctx.fillStyle = "gold"
		ctx.fill()
		ctx.closePath()
		ctx.restore()
	}
}