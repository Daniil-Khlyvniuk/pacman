import { Boundary } from "./Boundary.js"


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


export const setCanvasSize = ({ map }) => {
	const width = map[0].length * Boundary.width
	const height = map.length * Boundary.height

	canvas.width = width
	canvas.height = height
}

export const handleKeyDown = ({ key }) => {
	const { w, a, s, d } = controlKeys

	switch (key.toLowerCase()) {
		case "w":
		case "ц":
			w.pressed = true
			break
		case "a":
		case "ф":
			a.pressed = true
			break
		case "s":
		case "ы":
			s.pressed = true
			break
		case "d":
		case "в":
			d.pressed = true
			break
	}
	lastKey = key
}

export const handleKeyUp = ({ key }) => {
	const { w, a, s, d } = controlKeys

	switch (key.toLowerCase()) {
		case "w":
		case "ц":
			w.pressed = false
			break
		case "a":
		case "ф":
			a.pressed = false
			break
		case "s":
		case "ы":
			s.pressed = false
			break
		case "d":
		case "в":
			d.pressed = false
			break
	}
	prevKey = key
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
		stopAnimation()
		console.log("YOU WIN")
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

export const animation = (map, pacman) => () => {
	animationId = requestAnimationFrame(animation(map, pacman))
	clear()
	map.drawMap(pacman)
	pacman.move(map.borders)
	pacman.pacmanCollidesWithBorder(map.borders)
	pacman.update()
	pacman.stop()

}

export const stopAnimation = () => {
	cancelAnimationFrame(animationId)
}


