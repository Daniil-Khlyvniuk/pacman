import {
	animation,
	canvas,
	handleKeyDown,
	handleKeyUp,
	stopAnimation
} from "./App.js"
import { Boundary } from "./Boundary.js"
import { Map } from "./Map.js"
import { Pacman } from "./Pacman.js"


canvas.width = window.innerWidth
canvas.height = window.innerHeight


const map = new Map()
const pacman = new Pacman({
	position: {
		x: Boundary.width + Boundary.width * .5,
		y: Boundary.height + Boundary.height * .5
	},
	velocity: { x: 0, y: 0 }
})


const startGame = animation(map, pacman)

window.addEventListener("keydown", handleKeyDown)
window.addEventListener("keyup", handleKeyUp)

startGame()

