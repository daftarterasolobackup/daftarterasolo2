import { lgin, clearForm, checkTheLocalSession, setSession } from './service/login.js';

function setSubmitBtn() {
	const lin = document.getElementById("lin");
	lin.style.backgroundColor = "lightsteelblue";
	lin.style.fontWeight = "500";
	lin.style.color = "#FFFFFF";
	lin.value = "Signing in ....";	
}

function setBackSubmitBtn() {
	const lin = document.getElementById("lin");
	lin.style.backgroundColor = "steelblue";
	lin.value = "Sign in";	
	lin.style.fontWeight = "700";
	lin.style.color = "#FFFFFF";
}

function pageRedirect() {
	//window.location.replace("/redApp");
	window.location.replace("/");
}


(function main() {
	new checkTheLocalSession().getStatus === true ? pageRedirect() : '';

	document.getElementById("lin").addEventListener("click", async () => {
		const logIn = new lgin(document.getElementById("uname").value, document.getElementById("pass").value);
		setSubmitBtn();
		let loginResult = await logIn.doIn();
		//console.log(loginResult);
		if (loginResult.result === "error") {
			document.querySelector(".alert").classList.remove("hidden");
			document.getElementById("spanAlert").innerHTML = loginResult.data;
		} else {
			new setSession(loginResult.id, loginResult.data, loginResult.fname);
			pageRedirect();
		}
		setBackSubmitBtn();
		const clFrm = new clearForm(["uname", "pass"]); 
	});
	
	document.querySelector(".octicon").addEventListener("click", () => {
		document.querySelector(".alert").classList.add("hidden");
		document.getElementById("spanAlert").innerHTML = "";	
	});

})();

