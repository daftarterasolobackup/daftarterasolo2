import { checkTheLocalSession, lout } from './service/login.js';

function pageRedirect() {
    window.stop();
	window.location.replace("login.html");
}

function setIdTitle() {
	//document.getElementById("idUser").innerHTML = sessionStorage.getItem('id');
	document.getElementById("idUser").innerHTML = sessionStorage.getItem('fname');
}

function removeSession() {
	sessionStorage.removeItem('id');
	sessionStorage.removeItem('key');
	sessionStorage.removeItem('fname');
}

function clickLogout() {
	document.getElementById("logout").addEventListener("click", async () => {
		const l_out = new lout(parseInt(sessionStorage.getItem('id')), sessionStorage.getItem('key'));
		let loutResult = await l_out.doOut();
		loutResult.result === "success" ? removeSession() : '';
		pageRedirect();
	});
}

(function main() {
    new checkTheLocalSession().getStatus === true ? setIdTitle() : pageRedirect();
	clickLogout();
})();