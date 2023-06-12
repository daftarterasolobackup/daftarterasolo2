import { createFormMasy } from './formMasy.js'

export class createFormPabrik extends createFormMasy {
	constructor(formKontainer, listOfuttp, str) {
		super(formKontainer);
		this.str = str;
		this.list = listOfuttp;
	}

	#setCSSPabrik() {
		document.querySelectorAll(".title").forEach(e => e.style.backgroundColor = "#20b2aa");
		document.querySelectorAll(".subContent").forEach(e => e.style.borderTop = "3px solid #20b2aa");
		document.querySelectorAll(".subContent").forEach(e => e.style.borderBottom = "3px solid #20b2aa");
	}

	generateForm() {
		super.generateForm();
		this.#setCSSPabrik();
	}

	setCssUttp() {
		document.querySelectorAll(".listFieldset").forEach(e => {
			e.style.fontSize = "12px";
			e.style.borderTopColor = "green";
		});
		document.querySelectorAll(".listLegend").forEach(e => e.style.backgroundColor = "green");
	}
}