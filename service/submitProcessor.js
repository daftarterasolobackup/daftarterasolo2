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
		this.detectIfSubmitClicked();
	}

	#checkIfDataToSendIsEmpty() {
		if (Object.keys(this.#obj.get_dataToSend).length === 0) {
			throw new Error("Anda belum memilih uttp di shopping chart....Silahkan klik tanda '+' untuk memilih uttp.");
		}
	}

	detectIfSubmitClicked() {
		document.getElementById('sbmt').addEventListener('click', e => {
			this.#checkIfDataToSendIsEmpty();
			console.log('Berhasil');
		});
	}
}