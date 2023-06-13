import { createFormMasy } from './formMasy.js';
import { getPabrikTimb } from '../util/utilFunc.js';

export class createFormPabrik extends createFormMasy {

	constructor(formKontainer, listOfuttp, str) {
		super(formKontainer);
		this.str = str;
		this.list = listOfuttp;
	}

	#pabrikData = "";

	#setCSSPabrik() {
		document.querySelectorAll(".title").forEach(e => e.style.backgroundColor = "#20b2aa");
		document.querySelectorAll(".subContent").forEach(e => e.style.borderTop = "3px solid #20b2aa");
		document.querySelectorAll(".subContent").forEach(e => e.style.borderBottom = "3px solid #20b2aa");
	}

	//Override generateForm() from parent class
	async generateForm() {
		super.generateForm();
		this.#setCSSPabrik();
		await this.#loadPabrikTimb();
	}

	//Override setCssUttp() from parent class
	setCssUttp() {
		document.querySelectorAll(".listFieldset").forEach(e => {
			e.style.fontSize = "12px";
			e.style.borderTopColor = "green";
		});
		document.querySelectorAll(".listLegend").forEach(e => e.style.backgroundColor = "green");
	}

	async #loadPabrikTimb() {
		await getPabrikTimb();
		this.#pabrikData = "test";
	}

	#generateEventHandler() {	
		function eventHandler() {
			console.log(this.#pabrikData);
		}
		document.getElementById("nama").addEventListener('keyup', e => {
			e.target.value.length > 1 ? eventHandler() : '';
		});
	}

	//override generateBtnHandler() from parent class
	generateBtnHandler() {
		super.generateBtnHandler();
		this.#generateEventHandler();
	}
}