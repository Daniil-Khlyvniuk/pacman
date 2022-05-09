import { newGame, setLevel } from "./App.js"


export class Form {
	constructor({ title, txt, buttonTxt, currLvl }) {
		this.title = title
		this.txt = txt
		this.buttonTxt = buttonTxt
		this.currLvl = currLvl
		this._ELEMS = {
			formEl: document.createElement("form"),
			header: document.createElement("h1"),
			btn: document.createElement("button"),
			textBlock: document.createElement("p"),
			checkBoxWrapper: document.createElement("div"),
			checkBoxes: [
				document.createElement("input"),
				document.createElement("input"),
				document.createElement("input")
			],
			labels: [
				document.createElement("label"),
				document.createElement("label"),
				document.createElement("label")
			]
		}
	}

	onSubmit = this.handleSubmit.bind(this)

	styleForm() {
		const {
			formEl,
			header,
			btn,
			textBlock,
			checkBoxWrapper,
			checkBoxes,
			labels
		} = this._ELEMS

		formEl.style.backgroundColor = "#000000f0"
		formEl.style.padding = "1em"
		formEl.style.width = "fit-content"
		formEl.style.border = "solid .2em gold"
		formEl.style.borderRadius = ".5em"
		formEl.style.textAlign = "center"

		header.style.fontSize = "5em"
		header.style.color = "gold"
		header.style.margin = ".2em 0 .3em"

		textBlock.style.fontSize = "1.5em"
		textBlock.style.color = "gold"
		textBlock.style.margin = ".3em 0"

		checkBoxes.forEach(checkBox => {
			checkBox.type = "radio"
			checkBox.name = "lvl"
			checkBox.style.cursor = "pointer"
			checkBox.style.marginLeft = ".5em"
		})

		labels.forEach(label => {
			label.style.color = "gold"
			label.style.fontSize = "1.5em"
			label.style.cursor = "pointer"
		})

		checkBoxWrapper.style.display = "flex"
		checkBoxWrapper.style.width = "50%"
		checkBoxWrapper.style.alignItems = "center"
		checkBoxWrapper.style.justifyContent = "space-between"
		checkBoxWrapper.style.margin = ".5em auto"

		btn.style.margin = "1.3em 0px 1em"
		btn.style.padding = "0.5em 1.5em"
		btn.style.cursor = "pointer"
		btn.style.fontSize = "1.2em"
		btn.style.fontWeight = "bold"
		btn.style.backgroundColor = "gold"
		btn.style.border = "none"
	}


	handleSubmit(ev) {
		ev.preventDefault()
		newGame(true)
		this.removeForm()
	}

	handleChange(ev) {
		const lvl = document.querySelector("input[name=\"lvl\"]:checked").value
		if (this.currLvl !== lvl) {
			setLevel(lvl)
			newGame()
		}
	}

	removeForm() {
		document.querySelector("#modalWrapper").remove()
	}

	getForm() {
		const {
			formEl,
			header,
			btn,
			textBlock,
			checkBoxWrapper,
			checkBoxes,
			labels
		} = this._ELEMS
		const { title, txt, buttonTxt, handleChange, onSubmit, currLvl } = this

		this.styleForm()

		header.innerText = title
		btn.innerText = buttonTxt
		textBlock.innerText = txt

		formEl.append(header)
		formEl.append(textBlock)

		checkBoxes.forEach((checkBox, i) => {
			labels[i].innerText = i + 1
			checkBox.value = i + 1
			labels[i].append(checkBox)
			checkBoxWrapper.append(labels[i])
		})
		checkBoxes[currLvl - 1].checked = true

		checkBoxWrapper.addEventListener("change", handleChange)

		formEl.append(checkBoxWrapper)

		btn.addEventListener("click", onSubmit)
		formEl.append(btn)

		return formEl
	}
}