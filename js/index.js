import { animation, handleKeyDown, handleKeyUp, setCanvasSize } from "./App.js"
import { Boundary } from "./Boundary.js"
import { Level } from "./Level.js"
import { Map } from "./Map.js"
import { Pacman } from "./Pacman.js"


const lvlData = new Level(3).getLevelData()
const map = new Map(lvlData)
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
setCanvasSize(map)

startGame()

