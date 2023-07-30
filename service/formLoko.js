import { createFormMasy } from './formMasy.js';
import { createFormPabrik } from './formPabrik.js';
import { getPerusahaanLoko } from '../util/utilFunc.js';

export class createFormLoko extends createFormMasy {
	#perushLokoData = [];
	#dataForm = {};

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

	//method load nama-nama perusahaan loko utk dijalankan pd method generateForm()
	async #loadPerushLoko() {
		document.getElementById("perushLoko") != null ? this.#perushLokoData = await getPerusahaanLoko() : '';
	}

	//override generateForm() pd parent class
	async generateForm() {
		super.generateForm();
		this.#setCSSLoko();
		await this.#loadPerushLoko();
	}

	//override method generateShopChartTbl() pd parent class
	static generateShopChartTbl(arr) {
		super.generateShopChartTbl(arr);
		document.querySelector("table").setAttribute('id', 'tabelLoko');
	} 

	//method utk dijalankan pd method #autoCompleteForm()
	#clearFormPendaftaran() {
		document.getElementById("alamat").value = "";
		document.getElementById("kel").value = "";
		document.getElementById("wa").value = "";			
	}

	//method untuk dijalankan pada method #generateEventHandler()
	#autoCompleteForm(katakunci, srcData) {
		this.#clearFormPendaftaran();
		
		let filteredData = srcData.filter(e => e[1] === katakunci);
		if (filteredData[0] != undefined) {
			document.getElementById("alamat").value = filteredData[0][2];
			document.getElementById("kel").value = filteredData[0][4];
			document.getElementById("wa").value = filteredData[0][3];			
		}
	}

	determineDataSrc() {
		//console.log(this.constructor.kelurahan);
		return this.#perushLokoData;
	}

	//method utk dijalankan pd method generateBtnHandler()
	#generateEventHandler() {	
		document.getElementById("nama").addEventListener('input', e => {
			e.target.value.length > 1 ? this.#autoCompleteForm(e.target.value.toUpperCase(), this.determineDataSrc()) : '';
		});

		document.getElementById("nama").addEventListener('keyup', e => {
			e.target.value.length > 1 ? this.#autoCompleteForm(e.target.value.toUpperCase(), this.determineDataSrc()) : '';
		});

	}

	//override generateBtnHandler() from parent class
	generateBtnHandler() {
		super.generateBtnHandler();
		this.#generateEventHandler();
	}	

	get get_dataForm() {
		this.#dataForm['nama'] = document.getElementById('nama').value;
		this.#dataForm['alamat'] = document.getElementById('alamat').value;
		this.#dataForm['kel'] = document.getElementById('kel').value;
		this.#dataForm['wa'] = document.getElementById('wa').value; 
		this.#dataForm['jenisTera'] = "loko";
		return this.#dataForm;
	}

}
