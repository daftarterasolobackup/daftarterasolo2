import { createFormMasy } from './formMasy.js';

export class createFormLoko extends createFormMasy {
	//override method pd parent class yg dijalankan pd #generateLoadingBar()
	setLoadingBarColor() {
		document.querySelectorAll(".lds-facebook div").forEach(el => el.style.background = "red");
	}


	#setCSSLoko() {
		document.querySelectorAll(".title").forEach(e => {
			e.style.backgroundColor = "red";
			e.style.fontWeight = "bolder";
			e.style.color = "#ffffff";
			e.style.zIndex = "2";
		});
		document.querySelectorAll(".subContent").forEach(e => e.style.borderTop = "3px solid red");
		document.querySelectorAll(".subContent").forEach(e => e.style.borderBottom = "3px solid red");
		document.querySelector("#next").style.backgroundColor = "#3399CC";
		document.querySelector("#back").style.backgroundColor = "#3399CC";
		document.querySelector("#sbmt").style.backgroundColor = "#FFFFFF";
		document.querySelector("#sbmt").style.borderColor = "#3399CC";
		document.querySelector("#sbmt").style.color = "#3399CC";
	}

	//Override setCssUttp() from parent class
	setCssUttp() {
		document.querySelectorAll(".listFieldset").forEach(e => {
			e.style.fontSize = "12px";
			e.style.borderTopColor = "#3399CC";
		});
		document.querySelectorAll(".listLegend").forEach(e => e.style.backgroundColor = "#3399CC");
		document.querySelector(".closeHref").style.color = "#3399CC";
	}

	#setCssFormJml() {
		document.querySelector(".jmlhDiv").style.backgroundColor = "#000000";
		document.querySelector("#setJml").style.backgroundColor = "#3399CC";
		document.querySelector("#jml").style.borderColor = "#FFFFFF";
	}

	//override pickUttpHandler() from parent class
	pickUttpHandler() {
		super.pickUttpHandler();
		this.#setCssFormJml();
	}

	//override generateForm() pd parent class
	async generateForm() {
		super.generateForm();
		this.#setCSSLoko();
		//await this.#loadPabrikTimb();
	}

	//override method generateShopChartTbl() pd parent class
	static generateShopChartTbl(arr) {
		super.generateShopChartTbl(arr);
		document.querySelector("table").setAttribute('id', 'tabelLoko');
	} 
}
