import { createImage, ScoreIncrement, stopAnimation } from "./App.js"
import { Boundary } from "./Boundary.js"
import { Ghost } from "./Ghost.js"
import { Pellet } from "./Pellet.js"
import { PowerUp } from "./PowerUp.js"


export class Map {
	map = [
		[ "1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2" ],
		[ "|", " ", ".", ".", ".", ".", ".", ".", ".", ".", "|" ],
		[ "|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|" ],
		[ "|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|" ],
		[ "|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|" ],
		[ "|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|" ],
		[ "|", ".", "b", ".", "[", "+", "]", ".", "b", ".", "|" ],
		[ "|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|" ],
		[ "|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|" ],
		[ "|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|" ],
		[ "|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|" ],
		[ "|", ".", ".", ".", ".", ".", ".", ".", ".", "p", "|" ],
		[ "4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3" ]
	]

	symbols = {
		"1": "/pacman/images/borders/pipeCorner1.png",
		"2": "/pacman/images/borders/pipeCorner2.png",
		"3": "/pacman/images/borders/pipeCorner3.png",
		"4": "/pacman/images/borders/pipeCorner4.png",
		"5": "/pacman/images/borders/pipeConnectorTop.png",
		"6": "/pacman/images/borders/pipeConnectorRight.png",
		"7": "/pacman/images/borders/pipeConnectorBottom.png",
		"8": "/pacman/images/borders/pipeConnectorLeft.png",
		"-": "/pacman/images/borders/pipeHorizontal.png",
		"|": "/pacman/images/borders/pipeVertical.png",
		"[": "/pacman/images/borders/capLeft.png",
		"]": "/pacman/images/borders/capRight.png",
		"_": "/pacman/images/borders/capBottom.png",
		"^": "/pacman/images/borders/capTop.png",
		"+": "/pacman/images/borders/pipeCross.png",
		"b": "/pacman/images/borders/block.png",
		".": "",
		"p": ""
	}
	ghosts = [
		new Ghost({
			position: {
				x: 6 * Boundary.width + Boundary.width * .5,
				y: Boundary.width + Boundary.height * .5
			},
			velocity: {
				x: Ghost.speed,
				y: 0
			}
		})
	]
	pellets = []
	borders = []
	powerUps = []

	fillMap() {
		this.map.forEach((row, i) => {
			row.forEach((symbol, j) => {
				switch (symbol) {
					case ".":
						this.pellets.push(
							new Pellet({
								position: {
									x: j * Boundary.width + Boundary.width * .5,
									y: i * Boundary.width + Boundary.height * .5
								}
							})
						)
						break
					case "p":
						this.powerUps.push(
							new PowerUp({
								position: {
									x: j * Boundary.width + Boundary.width * .5,
									y: i * Boundary.width + Boundary.height * .5
								}
							})
						)
						break
					case " ":
						break
					default:
						this.borders.push(
							new Boundary({
								position: {
									x: j * Boundary.width,
									y: i * Boundary.height
								},
								image: createImage(this.symbols[symbol])
							})
						)
						break
				}
			})
		})
	}

	drawBorders() {
		this.borders.forEach(border => border.draw())
	}

	drawGhosts(pacman) {
		for (let i = this.ghosts.length - 1; i >= 0; i--) {
			const ghost = this.ghosts[i]
			const isCollides = ghost.isPacmanCaught(pacman.position, pacman.radius)

			if (isCollides) {
				if (!ghost.isScared) stopAnimation()
				else {
					ScoreIncrement(100)
					this.ghosts.splice(i, 1)
				}
			}

			ghost.move(this.borders)
			ghost.update()
		}
	}

	drawFood(pelletsArr, pacman) {
		for (let i = pelletsArr.length - 1; 0 <= i; i--) {
			const pellet = pelletsArr[i]
			const [ isEaten, powerUp ] = pellet.isEaten(pacman.position, pacman.radius)

			pellet.draw()

			if (isEaten) {
				pelletsArr.splice(i, 1)
				ScoreIncrement()

				if (powerUp) {
					this.ghosts.forEach(ghost => ghost.scared())
				}
			}
		}
	}

	drawMap(pacman) {
		const isFill = Boolean(this.borders.length && this.pellets.length)
		if (!isFill) this.fillMap()

		this.drawBorders()
		this.drawFood(this.powerUps, pacman)
		this.drawFood(this.pellets, pacman)
		this.drawGhosts(pacman)
	}
}