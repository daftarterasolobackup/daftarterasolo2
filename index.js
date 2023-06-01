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

class generateListUttp {
	constructor(kontainer, listOfUttp) {
		this.kontainer = kontainer;
		this.list = listOfUttp;
		this.#setCss();
		this.#generateKonten();
	}

	#setCss() {
	    setTimeout(() => {
			this.kontainer.style.display = "flex";
			this.kontainer.style.flexDirection = "row";
			this.kontainer.style.flexWrap = "wrap";
			this.kontainer.style.justifyContent = "flex-start";
			this.kontainer.hidden = false;  
		}, 100);		
	}

	#generateKonten() {
		let str = "";
		for (let k in this.list) {
			str += `<div id=${k} class=${this.list[k][0]} style="background-image : url(${this.list[k][1]});">
						<fieldset class="listFieldset">
							<legend class="listLegend">${this.list[k][2]}</legend>
						</fieldset>	
					</div>`;
		}	
		this.kontainer.innerHTML = str;
	}

}

(function main() {
	getKelurahan();
	//getGroupedUttp();

	let nextBtn = document.getElementById("next");
	nextBtn.addEventListener('click',() => {
	    location.href="#sub2";
	});

	let backBtn = document.getElementById("back");
	backBtn.addEventListener('click',() => {
	    location.href="#sub1";
	});

	
	let addBtn = document.querySelector(".addDiv");
	addBtn.addEventListener('click',() => {
		const wtuKontainer = new generateListUttp(document.querySelector(".uttpDiv"), listOfuttp());
	});
	
	
})();


