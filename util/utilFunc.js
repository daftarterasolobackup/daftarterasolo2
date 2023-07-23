export async function getKelurahan() {
	let url = "https://script.google.com/macros/s/AKfycbxNbS3tE2nm7KCbhIFw71dkBpwZn0MJWPbM2b7mhot7a3Ir0WxB3wCFCAnYOE38Dvo/exec";
	let kelurahan;
	await fetch(url)
	.then(datas => datas.json())
	.then(datas => {
	    let str = '';
	    for (let k in datas.data) {
			str += `<option value='${datas.data[k][0]}'>${datas.data[k][0]}</option>`;
	    }

	    document.getElementById("kelurahan").innerHTML = str;

	    kelurahan = datas.data;
	});

	return kelurahan;
}

export async function listOfUttpMasy() {
	let url = "https://script.google.com/macros/s/AKfycby7EeCgoLpKAKNy9En83dAIg9cgovMEPrbwl9bNYI9M0-Br50gG53fBOpwi3p_3PQQ/exec";		
	return await fetch(url).then(datas => datas.json()).then(datas => datas.uttp.filter(e => {return e[0] != "PUBBM" && e[0] != "TJE"}));		
}

export async function listOfUttpPabrik() {
	let url = "https://script.google.com/macros/s/AKfycbzH27ZTSKFF2Q2xXIRQEs7sd6uNzTfZpp-9BvO9a5JDDrhnf_YHzqc_TYoMtdDNOVI/exec";
	return await fetch(url).then(datas => datas.json()).then(datas => datas.uttp.filter(e => {return e[0] != "N" && e[0] != "TP" && e[0] != "Meter Kayu" && e[0] != "PUBBM" && e[0] != "TJE"}));		
}

export async function getPabrikTimb() {
	let url = "https://script.google.com/macros/s/AKfycbyabHAX8qUiIDXOcNpMqz5kwPu4FGvpBVVrKHT_LwTbZ4OtDHIZVmaXpyJEJ3g17Q/exec";

	let pabrik = [];
	await fetch(url).then(data => data.json()).then(data => {
		document.getElementById("pabrik").innerHTML = data.uttp.reduce((acc,elem) => `${acc}<option value='${elem[1]}'>${elem[1]}</option>`,'');
		pabrik = data.uttp;
	});

	return pabrik;
}

export async function getSpbu() {
	let url = "https://script.google.com/macros/s/AKfycbzTS7dvzJ28gIdHX5kE6BY_0cmPbMmP5dWpJXlt-wB2xzUnHvh8ol2Km6YnstBOTRs/exec";

	let spbu = [];
	await fetch(url).then(data => data.json()).then(data => {
		document.getElementById("spbu").innerHTML = data.uttp.reduce((acc,elem) => `${acc}<option value='${elem[1]}'>${elem[1]}</option>`,'');
		spbu = data.uttp;
	});
	
	return spbu;
}

export async function getPerusahaanLoko() {
	let url = "https://script.google.com/macros/s/AKfycbxWvCLGEN9o5TPYJJYApn4ssSgGUCYgNPvKsK6uGFGo7dIUrJsFKrvagsWZCMaq2og/exec";

	let spbu = [];
	await fetch(url).then(data => data.json()).then(data => {
		document.getElementById("perushLoko").innerHTML = data.uttp.reduce((acc,elem) => `${acc}<option value='${elem[1]}'>${elem[1]}</option>`,'');
		spbu = data.uttp;
	});
	
	return spbu;
}