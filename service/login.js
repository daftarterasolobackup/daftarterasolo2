class signIn {
	constructor() {
		if (this.constructor === "signIn") {
			throw new Error("Objek tidak dapat dibuat");
		}
	}
}

export class lgin extends signIn {
	#api;
	#lData = {};
	constructor(emanu, sapp) {
		super(constructor);
		//this.#api = "https://script.google.com/macros/s/AKfycbyUVM-nfIp4r0rWaAuLmN9hpQ8riac03l3XKEU5rfIzsgNM0WkVI2IHGoolo0pKNsL2/exec";
		//this.#api = "https://script.google.com/macros/s/AKfycbzLEUuVBFj8YyojHk9uCCCt7TVExmODyOE3F8GJtSmsnBvu4JDVsx2gAsylc6168H9MaQ/exec";
		this.#api = "https://script.google.com/macros/s/AKfycbzsvJbmv2qaeJDm4ROtlzyxg-ULBqHixaTjgnD74mzXHy-lPLgE9WZ-heor1MmrRI4SSg/exec";
		this.#lData = {
			'emanu' : emanu,
			'sapp' : sapp
		}
	}

	async doIn() {
		let result = {};

		await fetch(this.#api, {
			method : 'POST',
			body : JSON.stringify(this.#lData)
		})
		.then(e => e.json())
		.then(e => {
			result = e;
		});

		return result;
	}

}

export class clearForm {
	constructor(arrOfId) {
		this.#clearForm(arrOfId);
	}
	
	#clearForm(arrOfId) {
		for (let i of arrOfId) {
			document.getElementById(i).value = "";
		}
	}	
}

export class checkTheLocalSession {
	#status;
	constructor() {
		this.#status = false;
		this.#check();
	}

	#check() {
		if (sessionStorage.getItem("id") !== null && sessionStorage.getItem("key") !== null) {
			this.#status = true;
		} else {
			this.#status = false;
		}	
	}
	
	get getStatus() {
		return this.#status;
	}

}

export class setSession {
	#id;
	#key;
	#fname;
	constructor(id, key, fname) {
		this.#id = id;
		this.#key = key;
		this.#fname = fname;
		this.#doSet();
	}

	#doSet() {
		sessionStorage.setItem("id", this.#id);
		sessionStorage.setItem("key", this.#key);	
		sessionStorage.setItem("fname", this.#fname);
	}
}

export class lout extends signIn {
	#api;
	#lData = {};
	constructor(di, kento) {
		super(constructor);
		this.#api = "https://script.google.com/macros/s/AKfycbw1baXQH9pAbTCzAbw17ajqAVeuUvRS23wATbOFLb4kn9xjPTrE1WHVqRn586oeShTINQ/exec";
		this.#lData = {
			'di' : di,
			'kento' : kento
		}
	}

	async doOut() {
		let result = {};

		await fetch(this.#api, {
			method : 'POST',
			body : JSON.stringify(this.#lData)
		})
		.then(e => e.json())
		.then(e => {
			result = e;
		});

		return result;
	}

}



