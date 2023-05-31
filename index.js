async function getKelurahan() {
	url = "https://script.google.com/macros/s/AKfycbxNbS3tE2nm7KCbhIFw71dkBpwZn0MJWPbM2b7mhot7a3Ir0WxB3wCFCAnYOE38Dvo/exec";

	await fetch(url)
	.then(datas => datas.json())
	.then(datas => {
	    let str = '';
	    for (k in datas.data) {
		//console.log(datas.data[k]);
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
	    ['TJE', 'img/TJE.jpg', 'Timb Jembatan']
	];
}

function main() {
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
	    setTimeout(() => {
		document.querySelector(".uttpDiv").style.display = "flex";
		document.querySelector(".uttpDiv").style.flexDirection = "row";
		document.querySelector(".uttpDiv").style.flexWrap = "wrap";
		document.querySelector(".uttpDiv").style.justifyContent = "flex-start";
		document.querySelector(".uttpDiv").hidden = false;  
	    }, 300);
	});
	

	let str = "";
	for (k in listOfuttp()) {
		str += `<div id=${k} class=${listOfuttp()[k][0]} style="background-image : url(${listOfuttp()[k][1]});">
		<fieldset class="listFieldset">
		<legend class="listLegend">${listOfuttp()[k][2]}</legend>
		</fieldset>	
		</div>`;
	    console.log(listOfuttp()[k]);
	}
	
	document.querySelector(".uttpDiv").innerHTML = str;
	
}

main();
