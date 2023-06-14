import { createFormMasy } from './formMasy.js';
import { getPabrikTimb } from '../util/utilFunc.js';

export class createFormPabrik extends createFormMasy {
	#pabrikData = [];
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
		this.#pabrikData = await getPabrikTimb();
	}

	#clearFormPendaftaran() {
		document.getElementById("alamat").value = "";
		document.getElementById("kel").value = "";
		document.getElementById("wa").value = "";			
	}

	//fungsi untuk dijalankan pada fungsi #generateEventHandler()
	#autoCompleteForm(katakunci) {
		this.#clearFormPendaftaran();
		let filteredData = this.#pabrikData.filter(e => e[1] === katakunci);
		if (filteredData[0] != undefined) {
			document.getElementById("alamat").value = filteredData[0][2];
			document.getElementById("kel").value = filteredData[0][4];
			document.getElementById("wa").value = filteredData[0][3];			
		}
	}

	#generateEventHandler() {	
		document.getElementById("nama").addEventListener('input', e => {
			e.target.value.length > 1 ? this.#autoCompleteForm(e.target.value.toUpperCase()) : '';
		});

		document.getElementById("nama").addEventListener('keyup', e => {
			e.target.value.length > 1 ? this.#autoCompleteForm(e.target.value.toUpperCase()) : '';
		});

	}

	//override generateBtnHandler() from parent class
	generateBtnHandler() {
		super.generateBtnHandler();
		this.#generateEventHandler();
	}
}