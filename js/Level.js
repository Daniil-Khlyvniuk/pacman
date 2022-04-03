import { Boundary } from "./Boundary.js"
import { Ghost } from "./Ghost.js"


export class Level {
	constructor(currentLevel) {
		this.currentLevel = currentLevel
	}

	levels = [
		{
			map: [
				[ "1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2" ],
				[ "|", " ", ".", ".", ".", ".", ".", ".", ".", ".", "|" ],
				[ "|", ".", "b", ".", "[", "-", "]", ".", "b", ".", "|" ],
				[ "|", ".", ".", "p", ".", ".", ".", ".", ".", ".", "|" ],
				[ "|", ".", "b", ".", "[", "-", "]", ".", "b", ".", "|" ],
				[ "|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|" ],
				[ "|", ".", "b", ".", "[", "-", "]", ".", "b", ".", "|" ],
				[ "|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|" ],
				[ "4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3" ]
			],
			ghosts: [
				new Ghost({
					position: {
						x: 6 * Boundary.width + Boundary.width * .5,
						y: Boundary.width + Boundary.height * .5
					},
					velocity: {
						x: Ghost.speed,
						y: 0
					},
					name: "clyde"
				})
			]
		},
		{
			map: [
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
			],
			ghosts: [
				new Ghost({
					position: {
						x: 6 * Boundary.width + Boundary.width * .5,
						y: Boundary.width + Boundary.height * .5
					},
					velocity: {
						x: Ghost.speed,
						y: 0
					},
					name: "clyde"
				}),
				new Ghost({
					position: {
						x: Boundary.width + Boundary.width * .5,
						y: 6 * Boundary.width + Boundary.height * .5
					},
					velocity: {
						x: 0,
						y: Ghost.speed
					},
					name: "inky"
				})
			]
		},
		{
			map: [
				[ "1", "-", "-", "-", "7", "-", "-", "-", "-", "-", "7", "-", "-", "-", "2" ],
				[ "|", " ", ".", ".", "_", ".", ".", ".", ".", ".", "_", ".", ".", ".", "|" ],
				[ "|", "p", "b", ".", ".", ".", "^", ".", "^", ".", ".", ".", "b", ".", "|" ],
				[ "|", ".", ".", ".", "b", ".", "_", ".", "_", ".", "b", ".", ".", ".", "|" ],
				[ "|", ".", "^", ".", ".", ".", ".", ".", ".", ".", ".", ".", "^", "p", "|" ],
				[ "4", "-", "5", "]", ".", "1", "]", " ", "[", "2", ".", "[", "5", "-", "3" ],
				[ " ", " ", " ", ".", ".", "|", " ", " ", " ", "|", ".", ".", " ", " ", " " ],
				[ "1", "-", "7", "]", ".", "4", "-", "-", "-", "3", ".", "[", "7", "-", "2" ],
				[ "|", "p", "_", ".", ".", ".", ".", ".", ".", ".", "p", ".", "_", ".", "|" ],
				[ "|", ".", ".", ".", "b", ".", "^", ".", "^", ".", "b", ".", ".", ".", "|" ],
				[ "|", ".", "b", ".", ".", ".", "_", ".", "_", ".", ".", ".", "b", ".", "|" ],
				[ "|", ".", ".", ".", "^", ".", ".", ".", ".", ".", "^", ".", ".", ".", "|" ],
				[ "4", "-", "-", "-", "5", "-", "-", "-", "-", "-", "5", "-", "-", "-", "3" ]
			],
			ghosts: [
				new Ghost({
					position: {
						x: 7 * Boundary.width + Boundary.width * .5,
						y: 5 * Boundary.width + Boundary.height * .5
					},
					velocity: {
						x: 0,
						y: -Ghost.speed
					},
					name: "clyde"
				}),
				new Ghost({
					position: {
						x: 7 * Boundary.width + Boundary.width * .5,
						y: 6 * Boundary.width + Boundary.height * .5
					},
					velocity: {
						x: Ghost.speed,
						y: 0
					},
					name: "inky"
				}),
				new Ghost({
					position: {
						x: 7 * Boundary.width + Boundary.width * .5,
						y: 6 * Boundary.width + Boundary.height * .5
					},
					velocity: {
						x: -Ghost.speed,
						y: 0
					},
					name: "blinky"
				}),
				new Ghost({
					position: {
						x: 7 * Boundary.width + Boundary.width * .5,
						y: 6 * Boundary.width + Boundary.height * .5
					},
					velocity: {
						x: -Ghost.speed,
						y: 0
					},
					name: "pinky"
				})
			]
		}
	]

	getLevelData() {
		return this.levels[this.currentLevel - 1]
	}
}