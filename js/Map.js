import { createImage, ScoreIncrement } from "./App.js"
import { Boundary } from "./Boundary.js"
import { Ghost } from "./Ghost.js"
import { Pellet } from "./Pellet.js"


export class Map {
	map = [
		[ "1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2" ],
		[ "|", ".", ".", ".", ".", ".", "p", ".", ".", ".", "|" ],
		[ "|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|" ],
		[ "|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|" ],
		[ "|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|" ],
		[ "|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|" ],
		[ "|", ".", "b", ".", "[", "+", "]", ".", "b", ".", "|" ],
		[ "|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|" ],
		[ "|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|" ],
		[ "|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|" ],
		[ "|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|" ],
		[ "|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|" ],
		[ "4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3" ]
	]

	symbols = {
		"1": "../images/borders/pipeCorner1.png",
		"2": "../images/borders/pipeCorner2.png",
		"3": "../images/borders/pipeCorner3.png",
		"4": "../images/borders/pipeCorner4.png",
		"5": "../images/borders/pipeConnectorTop.png",
		"6": "../images/borders/pipeConnectorRight.png",
		"7": "../images/borders/pipeConnectorBottom.png",
		"8": "../images/borders/pipeConnectorLeft.png",
		"-": "../images/borders/pipeHorizontal.png",
		"|": "../images/borders/pipeVertical.png",
		"[": "../images/borders/capLeft.png",
		"]": "../images/borders/capRight.png",
		"_": "../images/borders/capBottom.png",
		"^": "../images/borders/capTop.png",
		"+": "../images/borders/pipeCross.png",
		"b": "../images/borders/block.png",
		".": "",
		"p": ""
	}
	pellets = []
	borders = []
	ghosts = []

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
						this.ghosts.push(
							new Ghost({
								position: {
									x: j * Boundary.width + Boundary.width * .5,
									y: i * Boundary.width + Boundary.height * .5
								},
								velocity: {
									x: Ghost.speed,
									y: 0
								}
							})
						)
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

	drawPellets(pacman) {
		for (let i = this.pellets.length - 1; 0 < i; i--) {
			const pellet = this.pellets[i]
			const isEaten = pellet.isEaten(pacman.position, pacman.radius)

			pellet.draw()
			if (isEaten) {
				this.pellets.splice(i, 1)
				ScoreIncrement()
			}
		}
	}

	drawGhosts(pacman) {
		this.ghosts.forEach(ghost => {
			ghost.isPacmanCaught(pacman.position, pacman.radius)
			ghost.move(this.borders)
			ghost.update()
		})
	}

	drawMap(pacman) {
		const isFill = Boolean(this.borders.length && this.pellets.length)
		if (!isFill) this.fillMap()

		this.drawBorders()
		this.drawPellets(pacman)
		this.drawGhosts(pacman)
	}
}