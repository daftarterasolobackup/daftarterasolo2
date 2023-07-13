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

export class masySubmitProcessor extends submitProcessor {
	#obj;
	#api;
	constructor(obj) {
		super(constructor);
		this.#obj = obj;
		this.#detectIfSubmitClicked();
		//this.#api = "https://script.google.com/macros/s/AKfycbyy2jsLFItoH2iSsbee3o4IjH_d-X_gm8zJClJNmZ76nXcF532iqDtVb9FFP5SBLqmxBA/exec";
		
		//this.#api = "https://script.google.com/macros/s/AKfycbxRiXf39HfkAnwysBIPQuYt5Nzu3Fz62b3ek3zFzcLtenIQCjUMnhwFrKv6SUWw2e6hxg/exec";

		this.#api = "https://script.google.com/macros/s/AKfycbysLaGr6E7Csyg62OqWf_gU9JBJsy0hEOszUTdISCvfYE-dPtZ7-qyEnUeXJCIkfe2eig/exec";
	}

	#checkIfDataToSendIsEmpty() {
		if (Object.keys(this.#obj.get_dataToSend).length === 0) {
			throw new Error("Anda belum memilih uttp di shopping chart....Silahkan klik tanda '+' untuk memilih uttp.");
		}
	}

	#checkIfdataFormIsEmpty() {
		let dat = this.#obj.get_dataForm; 
		if (dat['nama'] === "" || dat['alamat'] === "" || dat['kel'] === "" || dat['wa'] === "") {
			throw new Error("Anda belum mengisi data identitas dengan lengkap....Silahkan klik tanda tombol 'Back' untuk melengkapi data identitas.");
		}
	}

	#resetFormIdentitas() {
		document.getElementById('sub1').children[1].reset();
	}

	#deleteTableShopChart() {
		document.getElementById('sub2').children[1].children[0].remove();	
	}

	#afterEntryDataSuccess(msg) {
		this.#obj.set_dataToSend = {};
		this.#obj.set_shopChartTemp = [];
		this.#resetFormIdentitas();	
		this.#deleteTableShopChart();
		alert(msg);
	}

	async #entryTheData() {
		//console.log(this.#obj.get_dataForm);
		//console.log(this.#obj.get_dataToSend);
		let dataComplete = {
			'dataForm' : this.#obj.get_dataForm,
			'dataToSend' : this.#obj.get_dataToSend 
		}

		console.log('Melakukan entry data ... ');

		await fetch(this.#api, {
			method : "POST",
			body : JSON.stringify(dataComplete)
		})
		.then(e => e.json())
		.then(e => {
			this.#afterEntryDataSuccess(e.msg);
		});
		console.log(dataComplete);
		//console.log(JSON.stringify(dataComplete));
		
	}

	#detectIfSubmitClicked() {
		document.getElementById('sbmt').addEventListener('click', e => {
			try {
				this.#checkIfDataToSendIsEmpty();
				this.#checkIfdataFormIsEmpty();
				this.#entryTheData();
			}
			catch(e) {
				alert(e);
			}
		});
	}

	set set_api(url) {
		this.#api = url;
	}
}

export class pabrikSubmitProcessor extends masySubmitProcessor {

}

export class lokoSubmitProcessor extends masySubmitProcessor {

}
