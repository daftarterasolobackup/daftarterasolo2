import { getKelurahan, listOfUttpMasy } from '../util/utilFunc.js'; 

export class createFormMasy {
	lsKontainer;
	strUttp;
	argsUttp;
	list;

	constructor(formKontainer, str) {
		this.formKontainer = formKontainer;
		this.str = str;
	}
	
	setLoadingBarColor() {
		document.querySelectorAll(".lds-facebook div").forEach(el => el.style.background = "#ff6600");
	}
	
	#generateLoadingBar(logic) {
		document.querySelector(".tutorial") != null ? document.querySelector(".tutorial").remove() : '';
		this.setLoadingBarColor();
		logic === true ? document.querySelector(".ld1").classList.remove("hidden") : document.querySelector(".ld1").classList.add("hidden");
	}

	#removeMenuContent() {
		document.querySelector(".uttpDiv") != null ? document.querySelector(".uttpDiv").remove() : '';
		document.querySelector(".mainContent") != null ? document.querySelector(".mainContent").remove() : '';
	}

	async generateForm() {
		this.#generateLoadingBar(true);
		this.#removeMenuContent();
		this.formKontainer.insertAdjacentHTML('beforeend', this.str);
		await getKelurahan();
		this.#generateLoadingBar(false);
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


	stringUttp(string, ...args) {
		this.strUttp = string;
		this.argsUttp = args;
	}

	setCssUttp() {
		return 0;
	}

	async generateListUttp() {
		let str = "";
		this.list = await listOfUttpMasy();
		for (let k in this.list) {
			str += this.strUttp.reduce((result,str,i) => `${result}${str}${eval(this.argsUttp[i]) || ''}`,'');
		}	
		this.lsKontainer.innerHTML = str;
	}

	#addBtnHandler() {
		let addBtn = document.querySelector(".addDiv");
		addBtn.addEventListener('click',async () => {
			this.#setCss();
			await this.generateListUttp();
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
			//document.querySelector(".tutorial").classList.add("hidden");
			document.querySelector(".ld1").classList.remove("hidden");		
		} else {
			document.querySelector(".ld1").classList.add("hidden");		
		} 
	}
*/
}

