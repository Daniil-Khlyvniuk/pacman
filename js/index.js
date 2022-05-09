import { currLvl, handleKeyDown, handleKeyUp, newGame } from "./App.js"
import { Form } from "./Form.js"
import { ModalWindow } from "./ModalWindow.js"


window.addEventListener("keydown", handleKeyDown)
window.addEventListener("keyup", handleKeyUp)


const form = new Form({
	title: "Pac man",
	txt: "Choose level",
	buttonTxt: "Start",
	currLvl: currLvl
	}).getForm()

new ModalWindow(form).render()

newGame()
