export class ModalWindow {
	constructor(formEl) {
		this._ELEMS = {
			formEl,
			modalBackground: document.createElement("div"),
			modalWindow: document.createElement("div")
		}
	}

	styleModal() {
		const { modalBackground, modalWindow } = this._ELEMS

		modalBackground.id = "modalWrapper"
		modalBackground.style.position = "absolute"
		modalBackground.style.inset = "0"
		modalWindow.style.position = "absolute"

		modalWindow.style.width = "fit-content"
		modalWindow.style.boxShadow = "gold 0px 0px 50px 10px"
		modalWindow.style.borderRadius = ".5em"
		modalWindow.style.top = "50%"
		modalWindow.style.left = "50%"
		modalWindow.style.transform = "translate(-50%, -50%)"
	}

	remove() {
		const { modalBackground } = this._ELEMS
		modalBackground.remove()
	}

	render() {
		const { modalBackground, modalWindow, formEl } = this._ELEMS

		this.styleModal()

		formEl.removeForm = this.remove
		modalWindow.append(formEl)
		modalBackground.append(modalWindow)

		document.body.append(modalBackground)
	}
}