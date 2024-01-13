class submitProcessor {
	constructor() {
		if (this.constructor === "submitProcessor") {
			throw new Error("Object cannot be made..");
		} 
	}

	detectIfSubmitClicked() {
		throw new Error("Abstract Method has no implementation...");
	}
}

export class masySubmitProcessorRedApp extends submitProcessor {
	#obj;
	#api;
	#authData;

	constructor(obj) {
		super(constructor);
		this.#obj = obj;
		this.#detectIfSubmitClicked();
		//this.#api = "https://script.google.com/macros/s/AKfycbxCRpIT-PAtmRHksjns4-xHEraWMc9fC8MT9dYHMEYsv9zr1jCqfmYQIB7sZYxsii-MyA/exec";
		//this.#api = "https://script.google.com/macros/s/AKfycbwIrVmzY6jI9YiNEAtlepkZijgpXM8PdeLo2tkrLmWw2Ay8QGZIimaKqC7tdqapR7KdCg/exec";
		//this.#api = "https://script.google.com/macros/s/AKfycbzYB8Wcz-grCuoWPbkHHbyNfyAeNoDVH34Y4P-3ANv9DjwiJ6zep7bRTl2doNbkZI5SQw/exec";
		//this.#api = "https://script.google.com/macros/s/AKfycbyj0rK_oOiaf-kTEKjlBlutF39wXHHaVsWrddSuqxfgnHWrU9s7EecWYef1vTNRQWLP4w/exec";
		this.#api = "https://script.google.com/macros/s/AKfycbz3dOKdU1Bk1w9gaQdmqbIx6ZAqTecYhah4KFVx0-CNKgIHVzBbztL-pQ9vFUQtHq8V1Q/exec";	

		this.#authData = {
			'id' : sessionStorage.getItem('id'),
			//'token' : sessionStorage.getItem('key')
		};
	}

	#checkIfDataToSendIsEmpty() {
		if (Object.keys(this.#obj.get_dataToSend).length === 0) {
			throw new Error("Anda belum memilih uttp di shopping chart....Silahkan klik tanda '+' untuk memilih uttp.");
		}
	}

	#checkIfdataFormIsEmpty() {
		let useQrAddr = this.#checkIfdataToSendIsUsedAlamatQr();
		let dat = this.#obj.get_dataForm; 
		if ((dat['nama'] === "" || dat['alamat'] === "" || dat['kel'] === "") && useQrAddr === false ) {
			throw new Error("Anda belum mengisi data identitas dengan lengkap....Silahkan klik tanda tombol 'Back' untuk melengkapi data identitas.");
		}

		if (dat['wa'] === "") {
			document.getElementById('wa').value = "62";
		}

	}

	#checkIfdataToSendIsUsedAlamatQr() {
		let status = true;

		for (let elem in this.#obj.get_dataToSend) {
			this.#obj.get_dataToSend[elem].length < 11 ? status = status && false : status = status && true;
		}

		//alert(status);
		return status;
	}

	#resetFormIdentitas() {
		document.getElementById('sub1').children[1].reset();
	}

	#deleteTableShopChart() {
		document.getElementById('sub2').children[1].children[0].remove();	
	}

	showConfirmation(msg, respon) {
		alert(`${msg}\nNomor Order Anda : ${respon}`);
	}

	//#afterEntryDataSuccess(msg) 
	#afterEntryDataSuccess() {
		this.#obj.set_dataToSend = {};
		this.#obj.set_shopChartTemp = [];
		this.#resetFormIdentitas();	
		this.#deleteTableShopChart();
	}

	#ifEntryDataFail(msg) {
		alert(msg);
	}

	async #entryTheData() {
		//console.log(this.#obj.get_dataForm);
		//alert(JSON.stringify(this.#obj.get_dataToSend));
		
		let dataComplete = {
			'dataForm' : this.#obj.get_dataForm,
			'dataToSend' : this.#obj.get_dataToSend,
			'authData' : this.#authData 
		}

		//console.log('Melakukan entry data ... ');
		document.querySelector('.loadingBar').style.display = "block";
		try {
			await fetch(this.#api, {
				method : "POST",
				body : JSON.stringify(dataComplete)
			})
			.then(e => e.json())
			.then(e => {
				document.querySelector('.loadingBar').style.display = "none";
				setTimeout(() => {},1000);
				//e.result === 'success' ? this.#afterEntryDataSuccess(e.msg) : this.#ifEntryDataFail(e.msg);
				switch(e.result) {
					case 'success':
						this.#afterEntryDataSuccess();
						this.showConfirmation(e.msg, e.data);
						break;
					default:
						this.#ifEntryDataFail(e.msg);
				}
			});
		}
		catch(err) {
			document.querySelector('.loadingBar').style.display = "none";
			this.#ifEntryDataFail(`Entri Data Gagal. Error  :::  ${err}`);
		}
		
	}

	#detectIfSubmitClicked() {
		document.getElementById('sbmt').addEventListener('click', e => {
			try {
				//this.#checkIfdataToSendIsUsedAlamatQr();
				this.get_checkIfDataToSendIsEmpty;
				this.#checkIfdataFormIsEmpty();
				this.#entryTheData();
			}
			catch(e) {
				alert(e);
			}
		});
	}

	get get_checkIfDataToSendIsEmpty() {
		return this.#checkIfDataToSendIsEmpty();
	}

	set set_api(url) {
		this.#api = url;
	}
}

export class pabrikSubmitProcessor extends masySubmitProcessorRedApp {
	setApi() {
		//this.set_api = "https://script.google.com/macros/s/AKfycbw_qgL6gQ461xKUFwXw44Si-iEzpGjszAvqOh7ofHDG53dVbzbq3qVmtMMz--Pg9qh6Tw/exec";
		//this.set_api = "https://script.google.com/macros/s/AKfycbzeGmp6XlXfcBukHiONXuKY6irpxH80LdnKetp9Uz4rBUGLMu_4R5aFs2j-KIwJRqa9Xg/exec";
		//this.set_api = "https://script.google.com/macros/s/AKfycbzPLcHfi-0045oSzHsqVCFV_hSft7VZOeUzCFW8NRq3U63-ez6hYt8RubUx66Pf6DfnkA/exec";
		this.set_api = "https://script.google.com/macros/s/AKfycbxyk6QnJtaXfQkNLrBHDhIMGJKYsk2FL0yTP7TlUT2bsKprUgUg1gbZmyCPth8Z1Y3v/exec";
	}

	//override method showConfirmation in parent class
	showConfirmation(msg, respon) {
		alert(`${msg}\nNomor Order Anda : ${respon}`);
	}


}

export class lokoSubmitProcessor extends masySubmitProcessorRedApp {
	setApi() {
		//this.set_api = "https://script.google.com/macros/s/AKfycbzCVJdosncho6zPDd-l-m4YJcCaLf6s8P5bcOtRGi3MfLHX3xBQvzXJgbb3PxIS1Qnj/exec";
		//this.set_api = "https://script.google.com/macros/s/AKfycbzDL8BFUy1xRZhIB2A2YcvLD91tov8AvGj-ncM_wEIthhr6BlKiJcrEmzwmnwY52II/exec";
		//this.set_api = "https://script.google.com/macros/s/AKfycbwJcJX6Nt0ziTF_ZegxJ1JGtyrTDKlFkN0FDdHHkC0fIejQmL7ONjc3s1ZC8S7THAMfWw/exec";
		this.set_api = "https://script.google.com/macros/s/AKfycbxqIZ9pnX8lkkuBxt_JuKyZHL4NME0PiqF06cWju8q_XM-Ah0fVHn_ot1gwrKs_7Ani/exec";
	}
}

export class spbuSubmitProcessor extends submitProcessor {
	#obj;
	#api;
	#authData;

	constructor(obj) {
		super(constructor);
		this.#obj = obj;
		this.#detectIfSubmitClicked();
		//this.#api = "https://script.google.com/macros/s/AKfycbwIrVmzY6jI9YiNEAtlepkZijgpXM8PdeLo2tkrLmWw2Ay8QGZIimaKqC7tdqapR7KdCg/exec";
		//this.#api = "https://script.google.com/macros/s/AKfycbzMsoxJDvgram8ioXUxz-o2T0kQz_tYzDZfNvB5MvkytZuVCOHPZoZ8yp6txYJvootK8g/exec";
		this.#api = "https://script.google.com/macros/s/AKfycbwOpnGxursw8Z8kLW-9bGa7uhufAleNJfSx0yP7pNLDSAYhEE3q_-XtMmogxR7j48PUXQ/exec";
		this.#authData = {
			'id' : sessionStorage.getItem('id'),
			'token' : sessionStorage.getItem('key')
		};
	}

	#checkIfDataToSendIsEmpty() {
		if (Object.keys(this.#obj.get_dataToSend).length === 0) {
			throw new Error("Anda belum memilih nozzle yang akan ditera...Silahkan pilih nozzle dahulu.");
		}
	}	

	#checkIfdataFormIsEmpty() {
		let dat = this.#obj.get_dataForm; 
		if (dat['nama'] === "" || dat['alamat'] === "" || dat['kel'] === "") {
			throw new Error("Anda belum mengisi data identitas dengan lengkap....Silahkan klik tanda tombol 'Back' untuk melengkapi data identitas.");
		}

		if (dat['wa'] === "") {
			document.getElementById('wa').value = "62";
		}

	}

	get get_checkIfDataToSendIsEmpty() {
		return this.#checkIfDataToSendIsEmpty();
	}

	#resetFormIdentitas() {
		document.getElementById('sub1').children[1].reset();
		//document.querySelector('nozzDiv').innerHTML = "";
	}

	#del_nozzDivContent() {
		document.querySelector('.nozzDiv').innerHTML = "";
	}

	#afterEntryDataSuccess() {
		this.#obj.set_dataToSend = {};
		this.#obj.set_shopChartTemp = [];
		this.#resetFormIdentitas();	
		//this.#deleteTableShopChart();
	}

	#ifEntryDataFail(msg) {
		alert(msg);
	}
	
	showConfirmation(msg, respon) {
		alert(`${msg}\nNomor Order Anda : ${respon}`);
	}

	async #entryTheData() {
		
		let dataComplete = {
			'dataForm' : this.#obj.get_dataForm,
			'dataToSend' : this.#obj.get_dataToSend,
			'authData' : this.#authData 
		}

		//console.log('Melakukan entry data ... ');
		document.querySelector('.loadingBar').style.display = "block";
		console.log(dataComplete);
		try {
			await fetch(this.#api, {
				method : "POST",
				body : JSON.stringify(dataComplete)
			})
			.then(e => e.json())
			.then(e => {
				document.querySelector('.loadingBar').style.display = "none";
				setTimeout(() => {},1000);
				//e.result === 'success' ? this.#afterEntryDataSuccess(e.msg) : this.#ifEntryDataFail(e.msg);
				switch(e.result) {
					case 'success':
						this.#afterEntryDataSuccess();
						this.showConfirmation(e.msg, e.data);
						break;
					default:
						this.#ifEntryDataFail(e.msg);
				}
			});
			this.#del_nozzDivContent();
		}
		catch(err) {
			document.querySelector('.loadingBar').style.display = "none";
			this.#ifEntryDataFail(`Entri Data Gagal. Error  :::  ${err}`);
		}
		
	}

	#detectIfSubmitClicked() {
		document.getElementById('sbmt').addEventListener('click', e => {
			console.log("submit");
			try {
				this.get_checkIfDataToSendIsEmpty;
				this.#checkIfdataFormIsEmpty();
				this.#entryTheData();
			}
			catch(e) {
				alert(e);
			}
		});
	}
}	

export class scanOnlySubmitProcessor {
	#obj;
	#api;
	#authData;

	constructor(obj) {
		//super(constructor);
		this.#obj = obj;
		this.#detectIfSubmitClicked();
		//this.#api = "https://script.google.com/macros/s/AKfycbxbZ2qkNEjmSfSPxlrh-ip5GNcNd3W4YL0makoveOjwbgI3p4D3kyNzlQxRYDlvpoDeTw/exec";
		this.#api = "https://script.google.com/macros/s/AKfycbzWUV00cB9_ZKj2l8xebq30ptR_th03A88pHILkF9hx0cHpSMcNoKreGv0ExnQ7aSgOjQ/exec";
		this.#authData = {
			'id' : sessionStorage.getItem('id'),
			'token' : sessionStorage.getItem('key')
		};
	}

	#checkIfDataToSendIsEmpty() {
		if (Object.keys(this.#obj.get_dataToSend).length === 0) {
			throw new Error("Anda belum memilih uttp di shopping chart....Silahkan klik tanda '+' untuk memilih uttp.");
		}
	}
/*
	#checkIfdataFormIsEmpty() {
		let useQrAddr = this.#checkIfdataToSendIsUsedAlamatQr();
		let dat = this.#obj.get_dataForm; 
		if ((dat['nama'] === "" || dat['alamat'] === "" || dat['kel'] === "") && useQrAddr === false ) {
			throw new Error("Anda belum mengisi data identitas dengan lengkap....Silahkan klik tanda tombol 'Back' untuk melengkapi data identitas.");
		}

		if (dat['wa'] === "") {
			document.getElementById('wa').value = "62";
		}

	}
*/
	#checkIfdataToSendIsUsedAlamatQr() {
		let status = true;

		for (let elem in this.#obj.get_dataToSend) {
			this.#obj.get_dataToSend[elem].length < 11 ? status = status && false : status = status && true;
		}

		//alert(status);
		return status;
	}

/*
	#resetFormIdentitas() {
		document.getElementById('sub1').children[1].reset();
	}
*/

	#deleteTableShopChart() {
		document.getElementById('sub2').children[1].children[0].remove();	
	}

	showConfirmation(msg, respon) {
		alert(`${msg}\nNomor Order Anda : ${respon}`);
	}

	//#afterEntryDataSuccess(msg) 
	#afterEntryDataSuccess() {
		this.#obj.set_dataToSend = {};
		this.#obj.set_shopChartTemp = [];
		//this.#resetFormIdentitas();	
		this.#deleteTableShopChart();
	}

	#ifEntryDataFail(msg) {
		alert(msg);
	}

	async #entryTheData() {
		//console.log(this.#obj.get_dataForm);
		//alert(JSON.stringify(this.#obj.get_dataToSend));
		
		let dataComplete = {
			/*'dataForm' : this.#obj.get_dataForm,*/
			'dataToSend' : this.#obj.get_dataToSend,
			'authData' : this.#authData 
		}

		//console.log('Melakukan entry data ... ');
		document.querySelector('.loadingBar').style.display = "block";
		
		try {
			await fetch(this.#api, {
				method : "POST",
				body : JSON.stringify(dataComplete)
			})
			.then(e => e.json())
			.then(e => {
				document.querySelector('.loadingBar').style.display = "none";
				setTimeout(() => {},1000);
				//e.result === 'success' ? this.#afterEntryDataSuccess(e.msg) : this.#ifEntryDataFail(e.msg);
				switch(e.result) {
					case 'success':
						this.#afterEntryDataSuccess();
						this.showConfirmation(e.msg, e.data);
						break;
					default:
						this.#ifEntryDataFail(e.msg);
				}
			});
		}
		catch(err) {
			document.querySelector('.loadingBar').style.display = "none";
			this.#ifEntryDataFail(`Entri Data Gagal. Error  :::  ${err}`);
		}
		
	}

	#detectIfSubmitClicked() {
		document.getElementById('sbmt').addEventListener('click', e => {
			try {
				this.#checkIfdataToSendIsUsedAlamatQr();
				this.#checkIfDataToSendIsEmpty();
				//this.get_checkIfDataToSendIsEmpty;
				//this.#checkIfdataFormIsEmpty();
				this.#entryTheData();
			}
			catch(e) {
				alert(e);
			}
		});
	}

/*
	get get_checkIfDataToSendIsEmpty() {
		return this.#checkIfDataToSendIsEmpty();
	}

	set set_api(url) {
		this.#api = url;
	}
*/
}


