import { createFormPabrik } from './formPabrik.js';
import { createFormMasy } from './formMasy.js';
import { getSpbu } from '../util/utilFunc.js';

export class createFormSpbu extends createFormPabrik {
	#spbuData = [];

	//new method
	#setCSSSpbu() {
		document.querySelectorAll(".title").forEach(e => {
			e.style.backgroundColor = "#432616";
			e.style.fontWeight = "bolder";
			e.style.textShadow = "none";
		});
		document.querySelectorAll(".subContent").forEach(e => e.style.borderTop = "6px solid #432616");
		document.querySelectorAll(".subContent").forEach(e => e.style.borderBottom = "6px solid #432616");
		document.querySelector(".backBtnDiv").style.top = "10px";
	}

	//method load nama-nama spbu utk dijalankan pd method generateForm()
	async #loadSpbu() {
		document.getElementById("spbu") != null ? this.#spbuData = await getSpbu() : '';
	}

	//method utk menghandle tombol submit ketika ditekan..
	#submitBtnHandler() {
		document.getElementById("sbmt").addEventListener("click", e => {
			this.constructor.showUncompleteMsg(this.constructor.isJmlEmpty("jml_nozzle"));
		});
	}

	//Override setLoadingBarColor() from parent class
	setLoadingBarColor() {
		document.querySelectorAll(".lds-facebook div").forEach(el => el.style.background = "#432616");
	}

	//override method generateForm() from parent class
	async generateForm() {
		await super.generateForm();
		this.#setCSSSpbu();
		this.#submitBtnHandler();
		await this.#loadSpbu();
	}

	//override determineDataSrc() from parent class
	determineDataSrc() {
		return this.#spbuData;
	}
}