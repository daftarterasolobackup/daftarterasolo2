import { getKelurahan, listOfUttpMasy } from '../util/utilFunc.js'; 

export class createFormMasy {
	lsKontainer;
	strUttp;
	argsUttp;
	list;
	#shopChartTemp = [];

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

	#removeContentComponent() {
		document.querySelector(".uttpDiv") != null ? document.querySelector(".uttpDiv").remove() : '';
		document.querySelector(".mainContent") != null ? document.querySelector(".mainContent").remove() : '';
	}

	async generateForm() {
		this.#generateLoadingBar(true);
		this.#removeContentComponent();
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
		let str = `<div class="judl"><a class="closeHref" href=#>Close</a></div>`;
		this.list = await listOfUttpMasy();
		for (let k in this.list) {
			str += this.strUttp.reduce((result,str,i) => `${result}${str}${eval(this.argsUttp[i]) || ''}`,'');
		}	
		this.lsKontainer.innerHTML = str;
	}

	#closeBtnHandler() {
		let closeBtn = document.querySelector(".closeHref");
		closeBtn.addEventListener('click',() => document.querySelector(".uttpDiv").style.display = "none");
	}
	
	//utk dijalankan pada method #pickUttpHandler
	#changeShopChartLayout() {
		document.querySelector(".addDiv").style.top = "15px";
		document.querySelector(".backBtnDiv").style.top = "-25px";
	}

	//utk dijalankan pada method #pickUttpHandler
	#generateShopChartTbl(arr) {
		let str = `<table><thead><tr><td>No.</td><td>UTTP</td><td>Keterangan</td><td>Jumlah</td></tr></thead>`;
		arr.forEach((e,i) => str += `<tr><td>${i+1}</td><td>${e[0]}</td><td>${e[3]}</td><td>1</td></tr>`);
		str += `</table>`;
		document.querySelector(".shopChart").innerHTML = str;
	}

	#pickUttpHandler() {
		document.querySelectorAll(".daftarUttp").forEach(e => e.addEventListener("click", () => {
			this.#changeShopChartLayout();
			this.#shopChartTemp.push(this.list[e.id]);
			this.#generateShopChartTbl(this.#shopChartTemp);
			document.querySelector(".uttpDiv").style.display = "none";
			document.querySelector(".jmlhDiv").style.display = "flex";
		}));
	}

	#addBtnHandler() {
		let addBtn = document.querySelector(".addDiv");
		addBtn.addEventListener('click',async () => {
			this.#setCss();
			await this.generateListUttp();
			this.setCssUttp();
			this.#closeBtnHandler();
			this.#pickUttpHandler();
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

}

