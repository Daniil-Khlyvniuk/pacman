import {
	createImage,
	ctx,
	isItemCollidesWithBorder,
	stopAnimation
} from "./App.js"
import { Boundary } from "./Boundary.js"


export class Ghost {
	static speed = 2

	constructor({
								position,
								velocity,
								startDirection = "left",
								name = "clyde"
							}) {
		this.position = position
		this.velocity = velocity
		this.radius = 15
		this.prevCollisions = []
		this.name = name
		this.img = createImage(this.names[this.name])
		this.eye = ""
		this.startDirection = startDirection
		this.scared = false
	}

	names = {
		"pinky": "/pacman/images/ghosts/pinky.png",
		"blinky": "/pacman/images/ghosts/blinky.png",
		"inky": "/pacman/images/ghosts/inky.png",
		"clyde": "/pacman/images/ghosts/clyde.png",
		"scared": "/pacman/images/ghosts/scared.png"
	}

	eyes = {
		"up": "/pacman/images/ghosts/eyes/eyesUp.png",
		"down": "/pacman/images/ghosts/eyes/eyesDown.png",
		"left": "/pacman/images/ghosts/eyes/eyesLeft.png",
		"right": "/pacman/images/ghosts/eyes/eyesRight.png"
	}

	move(borders) {
		const collisions = this.setCollisions(borders)

		if (collisions.length > this.prevCollisions.length) {
			this.prevCollisions = collisions
		}

		if (JSON.stringify(collisions) !== JSON.stringify(this.prevCollisions)) {
			this.setPrevCollisions()
			const pathWays = this.getPathWays(collisions)
			const direction = this.getDirection(pathWays)
			this.setEyes(direction)
			this.setVelocity(direction)
			this.prevCollisions = []
		}
	}

	isPacmanCaught({ x: pacmanX, y: pacmanY }, pacmanRadius) {
		const isPacmanCaught = Math.hypot(
			this.position.x - pacmanX,
			this.position.y - pacmanY
		) < this.radius + pacmanRadius


		if (isPacmanCaught) {
			stopAnimation()
		}
	}

	setVelocity(direction) {
		switch (direction) {
			case "up":
				this.velocity.x = 0
				this.velocity.y = -Ghost.speed
				break
			case "down":
				this.velocity.x = 0
				this.velocity.y = Ghost.speed
				break
			case "left":
				this.velocity.x = -Ghost.speed
				this.velocity.y = 0
				break
			case "right":
				this.velocity.x = Ghost.speed
				this.velocity.y = 0
				break
		}
	}

	setCollisions(borders) {
		const collisions = []

		borders.forEach(border => {
			const { right, left, up, down } = this.getCollides(border)

			if (right) collisions.push("right")
			if (left) collisions.push("left")
			if (up) collisions.push("up")
			if (down) collisions.push("down")
		})
		return collisions
	}

	setPrevCollisions() {
		const { x: velX, y: velY } = this.velocity

		if (velX > 0) this.prevCollisions.push("right")
		else if (velY < 0) this.prevCollisions.push("up")
		else if (velX < 0) this.prevCollisions.push("left")
		else if (velY > 0) this.prevCollisions.push("down")
	}

	getDirection(pathWays) {
		const randomIndex = Math.floor(Math.random() * pathWays.length)
		return pathWays[randomIndex]
	}

	getPathWays(collisions) {
		return this.prevCollisions.filter(collision => {
			return !collisions.includes(collision)
		})
	}

	getCollides(border) {
		return {
			up: isItemCollidesWithBorder(
				{
					...this,
					velocity: { x: 0, y: -Ghost.speed }
				},
				border
			),
			down: isItemCollidesWithBorder(
				{
					...this,
					velocity: { x: 0, y: Ghost.speed }
				},
				border
			),
			left: isItemCollidesWithBorder(
				{
					...this,
					velocity: { x: -Ghost.speed, y: 0 }
				},
				border
			),
			right: isItemCollidesWithBorder(
				{
					...this,
					velocity: { x: Ghost.speed, y: 0 }
				},
				border
			)
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

	setEyes(direction) {
		this.eye = this.eyes[direction]
	}

	drawEyes() {
		const { x, y } = this.position
		if (!this.eye) this.setEyes(this.startDirection)

		ctx.drawImage(
			createImage(this.eye),
			x - 10,
			y - 6,
			Boundary.width / 2,
			Boundary.height / 5
		)
	}

	draw() {
		const { x, y } = this.position

		ctx.drawImage(
			this.img,
			x - 15,
			y - 15,
			Boundary.width - 10,
			Boundary.height - 10
		)
		if (!this.scared) this.drawEyes()
	}
}