import { getKelurahan } from '../util/utilFunc.js'; 

export class createFormMasy {
	lsKontainer;
	strUttp;
	argsUttp;


	constructor(formKontainer, listOfuttp, str) {
		this.formKontainer = formKontainer;
		this.list = listOfuttp;
		this.str = str;
	}
	
	stringUttp(string, ...args) {
		this.strUttp = string;
		this.argsUttp = args;
	}

	generateForm() {
		this.formKontainer.innerHTML = this.str;
	}
	
	async loadKelurahan() {
		getKelurahan();
	}

	#setCss() {
		this.lsKontainer = document.querySelector(".uttpDiv")
	    setTimeout(() => {
			this.lsKontainer.style.display = "flex";
			this.lsKontainer.style.flexDirection = "row";
			this.lsKontainer.style.flexWrap = "wrap";
			this.lsKontainer.style.justifyContent = "flex-start";
			this.lsKontainer.hidden = false;  
		}, 100);		
	}

	setCssUttp() {
		return 0;
	}

	#generateListUttp() {
		let str = "";
		for (let k in this.list) {
			str += this.strUttp.reduce((result,str,i) => `${result}${str}${eval(this.argsUttp[i]) || ''}`,'');
		}	
		this.lsKontainer.innerHTML = str;
	}

	#addBtnHandler() {
		let addBtn = document.querySelector(".addDiv");
		addBtn.addEventListener('click',() => {
			this.#setCss();
			this.#generateListUttp();
			this.setCssUttp();
		});	
	}

	#nextBtnHandler() {
		let nextBtn = document.getElementById("next");
		nextBtn.addEventListener('click',() => {
			location.href="#sub2";
		});		
	}

	#backBtnHandler() {
		let backBtn = document.getElementById("back");
		backBtn.addEventListener('click',() => {
			location.href="#sub1";
		});		
	}

	generateBtnHandler() {
		this.#nextBtnHandler();
		this.#backBtnHandler();
		this.#addBtnHandler();
	}
/*
	showLoadingBar(logic) {
		if (logic === true) {
			document.querySelector(".tutorial").classList.add("hidden");
			document.querySelector(".loadingselect").classList.remove("hidden");		
		} else {
			document.querySelector(".tutorial").classList.remove("hidden");
			document.querySelector(".loadingselect").classList.add("hidden");		
		} 
	}
*/
}

