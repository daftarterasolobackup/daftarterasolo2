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
	constructor(obj) {
		super(constructor);
		this.#obj = obj;
		this.#detectIfSubmitClicked();
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

	#entryTheData() {
		console.log(this.#obj.get_dataForm);
		console.log(this.#obj.get_dataToSend);
		console.log('Melakukan entry data ... ');
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
}

export class pabrikSubmitProcessor extends masySubmitProcessor {

}

export class lokoSubmitProcessor extends masySubmitProcessor {

}
