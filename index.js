//const { resolve } = require("path");

async function getKelurahan() {
	url = "https://script.google.com/macros/s/AKfycbxNbS3tE2nm7KCbhIFw71dkBpwZn0MJWPbM2b7mhot7a3Ir0WxB3wCFCAnYOE38Dvo/exec";

	await fetch(url)
	.then(datas => datas.json())
	.then(datas => {
	    let str = '';
	    for (k in datas.data) {
			str += `<option value='${datas.data[k]}'>${datas.data[k][0]}</option>`;
	    }

	    document.getElementById("kelurahan").innerHTML = str;
	});
}

async function listOfUttpMasy() {
	let url = "https://script.google.com/macros/s/AKfycby7EeCgoLpKAKNy9En83dAIg9cgovMEPrbwl9bNYI9M0-Br50gG53fBOpwi3p_3PQQ/exec";		
	return await fetch(url).then(datas => datas.json()).then(datas => datas.uttp);		
}

async function listOfUttpPabrik() {
	let url = "https://script.google.com/macros/s/AKfycbzH27ZTSKFF2Q2xXIRQEs7sd6uNzTfZpp-9BvO9a5JDDrhnf_YHzqc_TYoMtdDNOVI/exec";
	let mydata = [];
	await fetch(url).then(datas => datas.json()).then(datas => {
		mydata = datas.uttp.filter(e => {return e[0] != "N" && e[0] != "TP" && e[0] != "Meter Kayu" && e[0] != "PUBBM" && e[0] != "TJE"});
	});		
	return mydata;
}

class createFormMasy {
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
}

class createFormPabrik extends createFormMasy {
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

(function main() {
	let menuMsy = document.querySelector(".menu").children[1];

	menuMsy.addEventListener("click", async () => {
		let str = `<div class="mainContent">      
						<div class="subContent" id="sub1">
							<div class="title">Silahkan isi data Anda</div>
							<form>
								<input type="text" class="form_data" name="nama" id="nama" placeholder="Masukkan nama">
								<textarea  class="form_data" name="alamat" id="alamat" rows="4" cols="10" placeholder="Masukkan alamat"></textarea>  
								<input type="text" class="form_data" name="kel" id="kel" list="kelurahan" placeholder="Masukkan kelurahan">  
								<input type="number" class="form_data" name="wa" id="wa" placeholder="Nomor HP/Whatsapp">
								<input type="button" name="next" id="next" value="Next..">
							</form>
						</div>
						<div class="subContent" id="sub2">
							<div class="title">Silahkan Pilih Timbangan/UTTP</div>  
							<div class="addDiv">+<p id="klik">Klik disini</p></div>
							<div class="backBtnDiv">
								<form><input type="button" name="back" id="back" value="Back.."></form>
							</div>                  
						</div>
						<datalist id="kelurahan"></datalist>
					</div>
					<div class="uttpDiv hidden">
					</div>`;
		const x = await listOfUttpMasy();
		const formMasy = new createFormMasy(document.querySelector(".main"), x, str);
		await formMasy.loadKelurahan();
		formMasy.generateForm();
		const args = ['k', 'this.list[k][0]', 'this.list[k][4]', 'this.list[k][3]']
		formMasy.stringUttp`<div id=${args[0]} class=${args[1]} style="background-image : url(${args[2]});"><fieldset class="listFieldset"><legend class="listLegend">${args[3]}</legend></fieldset></div>`;
		formMasy.generateBtnHandler();

	});

	let menuPbrk = document.querySelector(".menu").children[0];
	menuPbrk.addEventListener("click", async () => {
		let str = `<div class="mainContent">      
						<div class="subContent" id="sub1">
							<div class="title">Silahkan isi data Anda</div>
							<form>
								<input type="text" class="form_data" name="nama" id="nama" placeholder="Masukkan nama Pabrik">
								<textarea  class="form_data" name="alamat" id="alamat" rows="4" cols="10" placeholder="Masukkan alamat Pabrik/Perusahaan"></textarea>  
								<input type="text" class="form_data" name="kel" id="kel" list="kelurahan" placeholder="Masukkan kelurahan">  
								<input type="number" class="form_data" name="wa" id="wa" placeholder="Nomor HP/Whatsapp">
								<input type="button" name="next" id="next" value="Next..">
							</form>
						</div>
						<div class="subContent" id="sub2">
							<div class="title">Silahkan Pilih Timbangan/UTTP</div>  
							<div class="addDiv">+<p id="klik">Klik disini</p></div>
							<div class="backBtnDiv">
								<form><input type="button" name="back" id="back" value="Back.."></form>
							</div>                  
						</div>
						<datalist id="kelurahan"></datalist>
					</div>
					<div class="uttpDiv hidden">
					</div>`;
		const x = await listOfUttpPabrik();
		const formPabrik = new createFormPabrik(document.querySelector(".main"), x, str);
		await formPabrik.loadKelurahan();
		formPabrik.generateForm();
		const args = ['k', 'this.list[k][0]', 'this.list[k][4]', 'this.list[k][0]', 'this.list[k][1]', 'this.list[k][2]']
		formPabrik.stringUttp`<div id=${args[0]} class='${args[1]}/${args[4]}/${args[5]}' style="background-image : url(${args[2]});"><fieldset class="listFieldset"><legend class="listLegend">${args[3]} ${args[4]}</legend></fieldset></div>`;
		formPabrik.generateBtnHandler();
	});

	let menuSpbu = document.querySelector(".menu").children[2];
	menuSpbu.addEventListener("click", () => alert("test"));

	let menuLoko = document.querySelector(".menu").children[3];
	
	menuLoko.addEventListener("click", () => alert("test"));

})();


