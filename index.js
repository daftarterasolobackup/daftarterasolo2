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


async function getGroupedUttp() {
	url = "https://script.google.com/macros/s/AKfycbzywsoS9ptJU25w4JdlY2fD99sLY24tmNUx5tK0I-zB4FZr5ZDEq5hDHQ0SK_2iFxI/exec";

	await fetch(url, {
		method : 'POST',
		body : JSON.stringify({'uttp' : ''})
	})
	.then(datas => datas.json())
	.then(datas => {
		console.log(datas);
	});

}

function listOfuttp() {
	return uttpArrPic = [
	    ['TBI','img/TBI.jpg','Timb Bobot Ingsut'],
	    ['TE','img/TE.webp', 'Timb Elektronik'],
	    ['TE','img/TE_analytic.webp', 'Timb Elektronik'],
	    ['TE','img/TE_hanging.webp', 'Timb Elektronik'],
	    ['TE','img/TE2.webp', 'Timb Elektronik'],
	    ['TE','img/TE3.jfif', 'Timb Elektronik'],
	    ['TM','img/TM.jfif', 'Timbangan Meja'],
	    ['TP','img/TP.jfif', 'Timbangan Pegas'],
	    ['TP','img/TP2.webp', 'Timbangan Pegas'],
	    ['TP','img/TP3.webp', 'Timbangan Pegas'],
	    ['TS','img/TS.jpg', 'Timb Sentisimal'],
	    ['DL','img/DL.jpg', 'Dacin Logam'],
	    ['N','img/N.jpg', 'Neraca'],
	    ['Meter Kayu','img/MK.jpg', 'Meter Kayu'],
	    ['PUBBM','img/pubbm.jpg', 'Pompa Ukur BBM'],
	    ['TJE', 'img/TJE.jpg', 'Timb Jembatan'],
		['TAK', 'img/TAK.jpeg', 'Takaran']
	];
}

class createFormMasy {
	constructor(formKontainer, listOfuttp, str) {
		this.formKontainer = formKontainer;
		this.list = listOfuttp;
		this.str = str;
		this.#generateForm();
		this.#loadKelurahan();
		this.#addBtnHandler();
		this.#nextBtnHandler();
		this.#backBtnHandler();
		this.lsKontainer = document.querySelector(".uttpDiv");
	}
 
	#generateForm() {
		this.formKontainer.innerHTML = this.str;
	}
	
	async #loadKelurahan() {
		getKelurahan();
	}

	#setCss() {
	    setTimeout(() => {
			this.lsKontainer.style.display = "flex";
			this.lsKontainer.style.flexDirection = "row";
			this.lsKontainer.style.flexWrap = "wrap";
			this.lsKontainer.style.justifyContent = "flex-start";
			this.lsKontainer.hidden = false;  
		}, 100);		
	}

	#generateListUttp() {
		let str = "";
		for (let k in this.list) {
			str += `<div id=${k} class=${this.list[k][0]} style="background-image : url(${this.list[k][1]});">
						<fieldset class="listFieldset">
							<legend class="listLegend">${this.list[k][2]}</legend>
						</fieldset>	
					</div>`;
		}	
		this.lsKontainer.innerHTML = str;
	}

	#addBtnHandler() {
		let addBtn = document.querySelector(".addDiv");
		addBtn.addEventListener('click',() => {
			this.#setCss();
			this.#generateListUttp();
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

}

(function main() {
	let menuMsy = document.querySelector(".menu").children[1];

	menuMsy.addEventListener("click", () => {
		let str = `
		<div class="mainContent">      
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
		</div>		
		`;
		new createFormMasy(document.querySelector(".main"), listOfuttp(), str);
	});

	let menuPbrk = document.querySelector(".menu").children[0];
	menuPbrk.addEventListener("click", () => alert("test"));

	let menuSpbu = document.querySelector(".menu").children[2];
	menuSpbu.addEventListener("click", () => alert("test"));

	let menuLoko = document.querySelector(".menu").children[3];
	
	menuLoko.addEventListener("click", () => alert("test"));

})();


