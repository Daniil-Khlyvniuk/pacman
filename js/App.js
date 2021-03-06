import { Boundary } from "./Boundary.js"
import { Form } from "./Form.js"
import { Level } from "./Level.js"
import { Map } from "./Map.js"
import { ModalWindow } from "./ModalWindow.js"
import { Pacman } from "./Pacman.js"


export const canvas = document.querySelector("#game")
export const ctx = canvas.getContext("2d")
export const scoreEl = document.querySelector("#score")
export let animationId

export const controlKeys = {
	w: { pressed: false },
	a: { pressed: false },
	s: { pressed: false },
	d: { pressed: false }
}
export let lastKey = ""
export let prevKey = ""
export let currLvl = 1
let score = 0


export const setLevel = (lvl) => {
	currLvl = lvl
}

export const setCanvasSize = ({ map }) => {
	const width = map[0].length * Boundary.width
	const height = map.length * Boundary.height

	canvas.width = width
	canvas.height = height
}

export const handleKeyDown = ({ code }) => {
	const { w, a, s, d } = controlKeys

	switch (code) {
		case "KeyW":
			w.pressed = true
			lastKey = "w"
			break
		case "KeyA":
			a.pressed = true
			lastKey = "a"
			break
		case "KeyS":
			s.pressed = true
			lastKey = "s"
			break
		case "KeyD":
			d.pressed = true
			lastKey = "d"
			break
	}
}

export const handleKeyUp = ({ code }) => {
	const { w, a, s, d } = controlKeys

	switch (code) {
		case "KeyW":
			w.pressed = false
			prevKey = "w"
			break
		case "KeyA":
			a.pressed = false
			prevKey = "a"
			break
		case "KeyS":
			s.pressed = false
			prevKey = "s"
			break
		case "KeyD":
			d.pressed = false
			prevKey = "d"
			break
	}
}

export const isItemCollidesWithBorder = (item, border) => {
	const { x: itemX, y: itemY } = item.position
	const { x: velocityX, y: velocityY } = item.velocity
	const { x: borderX, y: borderY } = border.position
	const { width: borderW, height: borderH } = Boundary
	const padding = borderW / 2 - item.radius - 1

	return (
		itemY - item.radius + velocityY <= borderY + borderH + padding
		&&
		itemX + item.radius + velocityX >= borderX - padding
		&&
		itemY + item.radius + velocityY >= borderY - padding
		&&
		itemX - item.radius + velocityX <= borderX + borderW + padding
	)
}

export const clear = () => {
	ctx.clearRect(
		0,
		0,
		canvas.width,
		canvas.height
	)
}

export const createImage = (src) => {
	const img = new Image()
	img.src = src

	return img
}

export const ScoreIncrement = (increment = 10) => {
	score += increment
	scoreEl.innerHTML = score
}

export const winGame = (pellets, powerPellets) => {
	if (!pellets.length && !powerPellets.length) {
		gameOver("You win")
	}
}

export const teleport = (obj) => {
	if (obj.position.x < 0) {
		obj.position.x = canvas.width
	} else if (obj.position.x > canvas.width) {
		obj.position.x = 0
	} else if (obj.position.y > canvas.height) {
		obj.position.y = 0
	} else if (obj.position.y < 0) {
		obj.position.y = canvas.height
	}
}

export const animation = (map, pacman) => (isStarted) => {
	if (isStarted) {
		animationId = requestAnimationFrame(animation(map, pacman))
	}
	clear()
	map.drawMap(pacman)
	pacman.move(map.borders)
	pacman.pacmanCollidesWithBorder(map.borders)
	pacman.update()
	pacman.stop()
}

export const newGame = (isStarted) => {
	const lvlData = new Level(currLvl).getLevelData()
	const map = new Map(lvlData)
	const pacman = new Pacman({
		position: {
			x: Boundary.width + Boundary.width * .5,
			y: Boundary.height + Boundary.height * .5
		},
		velocity: { x: 0, y: 0 }
	})

	ScoreIncrement(-score)
	setCanvasSize(map)
	animation(map, pacman)(isStarted)
}

export const stopAnimation = () => {
	cancelAnimationFrame(animationId)
}

export const gameOver = (text) => {
	stopAnimation()


	setTimeout(() => {
		const form = new Form({
			title: text,
			txt: "Choose level",
			buttonTxt: "Start",
			currLvl: currLvl
		}).getForm()

		new ModalWindow(form).render()
	}, 300)
}

