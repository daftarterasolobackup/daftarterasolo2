import { createFormMasy } from './service/formMasy.js';
import { createFormMasyRedApp } from './service/formMasyRedApp.js';
import { createFormPabrik } from './service/formPabrik.js';
import { createFormSpbu } from './service/formSpbu.js';
import { createFormLoko } from './service/formLoko.js';
import { masyPrepareCam, lokoPrepareCam, scanOnlyPrepareCam } from './util/siapkanKamera.js';
import { masySubmitProcessor, pabrikSubmitProcessor, lokoSubmitProcessor, spbuSubmitProcessor } from './service/submitProcessor.js';
import { masySubmitProcessorRedApp } from './service/submitProcessorRedApp.js';

(function main() {
	let menuMsy = document.querySelector(".menu").children[1];

	menuMsy.addEventListener("click", async () => {
		let str = `<div class="mainContent">      
						<div class="subContent" id="sub1">
							<div class="title">Silahkan isi data Anda</div>
							<form>
								<input type="text" class="form_data" name="nama" id="nama" placeholder="Masukkan nama / badan usaha">
								<textarea  class="form_data" name="alamat" id="alamat" rows="4" cols="10" placeholder="Masukkan alamat"></textarea>  
								<input type="text" class="form_data" name="kel" id="kel" list="kelurahan" placeholder="Masukkan kelurahan">  
								<input type="number" class="form_data" name="wa" id="wa" placeholder="Nomor HP/Whatsapp">
								<input type="button" name="next" id="next" value="Next..">
							</form>
						</div>
						<div class="subContent" id="sub2">
							<div class="title">Silahkan Pilih Timbangan/UTTP</div>  
							<div class="shopChart"></div>
							<div class="addDiv">+<p id="klik">Klik disini</p></div>
							<div class="backBtnDiv">
								<form><input type="button" name="back" id="back" value="Back.."></form>
								<form><input type="button" name="sbmt" id="sbmt" value="Submit"></form>
							</div>                  
						</div>
						<datalist id="kelurahan"></datalist>
					</div>
					<div class="uttpDiv hidden"></div>					
					<div class="jmlhDiv hidden"><h1>Jumlah : </h1>
						<form class="spe">
							<input type="number" class="form_data" name="jml" id="jml" placeholder="jumlah..">
							<input type="button" class="form_data" name="setJml" id="setJml" value="Tambahkan ke keranjang">
						</form>
						<p style="text-align : right;"><a class="closeFormJml" href=#><span>x</span> Close</a></div></p>
					</div>`;
		
		const formMasy = new createFormMasy(document.querySelector(".main"), str);
		await formMasy.generateForm();
		const args = ['k', 'this.list[k][0]', 'this.list[k][4]', 'this.list[k][3]']
		formMasy.stringUttp`<div id=${args[0]} class='daftarUttp' style="background-image : url(${args[2]});"><fieldset class="listFieldset"><legend class="listLegend">${args[3]}</legend></fieldset></div>`;
		formMasy.generateBtnHandler();
		
		const sbmtHandler = new masySubmitProcessor(formMasy);
	});

	let menuPbrk = document.querySelector(".menu").children[0];

	menuPbrk.addEventListener("click", async () => {

		let str = `<div class="mainContent">      
						<div class="subContent" id="sub1">
							<div class="title">Silahkan isi data Anda</div>
							<form>
								<input type="text" class="form_data" name="nama" id="nama" list="pabrik" placeholder="Masukkan nama Pabrik">
								<textarea  class="form_data" name="alamat" id="alamat" rows="4" cols="10" placeholder="Masukkan alamat Pabrik/Perusahaan"></textarea>  
								<input type="text" class="form_data" name="kel" id="kel" list="kelurahan" placeholder="Masukkan kelurahan">  
								<input type="number" class="form_data" name="wa" id="wa" placeholder="Nomor HP/Whatsapp">
								<input type="button" name="next" id="next" value="Next..">
							</form>
						</div>
						<div class="subContent" id="sub2">
							<div class="title">Silahkan Pilih Timbangan/UTTP</div>  
							<div class="shopChart"></div>	
							<div class="addDiv">+<p id="klik">Klik disini</p></div>
							<div class="backBtnDiv">
								<form><input type="button" name="back" id="back" value="Back.."></form>
								<form><input type="button" name="sbmt" id="sbmt" value="Submit"></form>
							</div>                  
						</div>
						<datalist id="kelurahan"></datalist>
						<datalist id="pabrik"></datalist>
					</div>
					<div class="uttpDiv hidden"></div>
					<div class="jmlhDiv hidden">
						<h1>Silahkan isi jumlah & no.seri</h1>
						<form>
							<input type="number" class="form_data" name="jml" id="jml" placeholder="jumlah...">
							<input type="text" class="form_data" name="merk" id="merk" placeholder="merek...">
							<input type="text" class="form_data" name="tipe" id="tipe" placeholder="tipe...">
							<input type="text" class="form_data" name="kap" id="kap" placeholder="kapasitas maksimum...">
							<input type="text" class="form_data" name="d" id="d" placeholder="dayabaca...">
							<input type="text" class="form_data" name="txtSerial" id="txtSerial" style="width : 80%;" placeholder="Masukkan text nomor seri (jika ada)">							
							<input type="number" class="form_data" name="serial" id="serial" style="width : 45%;" placeholder="no seri awal">
							<input type="number" class="form_data" name="serialAkhir" id="serialAkhir" style="width : 45%;" placeholder="no seri akhir" readonly>
							<input type="button" class="form_data" name="setJml" id="setJml" value="Tambahkan ke keranjang">
							<p style="text-align : right;"><a class="closeFormJml" href=#><span>x</span> Close</a></div></p>
						</form>
					</div>`;

		const formPabrik = new createFormPabrik(document.querySelector(".main"), str);
		await formPabrik.generateForm();
		formPabrik.generateBtnHandler();
		const args = ['k', 'this.list[k][0]', 'this.list[k][4]', 'this.list[k][0]', 'this.list[k][1]', 'this.list[k][2]']
		formPabrik.stringUttp`<div id=${args[0]} class='daftarUttp' style="background-image : url(${args[2]});"><fieldset class="listFieldset"><legend class="listLegend">${args[3]} ${args[4]}</legend></fieldset></div>`;

		const sbmtHandler = new pabrikSubmitProcessor(formPabrik);
		sbmtHandler.setApi();
	});

	let menuSpbu = document.querySelector(".menu").children[2];
	menuSpbu.addEventListener("click", () => {
		let str = `<div class="mainContent">      
						<div class="subContent" id="sub1">
							<div class="title">Silahkan isi data Anda</div>
							<form>
								<input type="text" class="form_data" name="nama" id="nama" list="spbu" placeholder="Masukkan nama SPBU">
								<textarea  class="form_data" name="alamat" id="alamat" rows="4" cols="10" placeholder="Masukkan alamat SPBU"></textarea>  
								<input type="text" class="form_data" name="kel" id="kel" list="kelurahan" placeholder="Masukkan kelurahan">  
								<input type="number" class="form_data" name="wa" id="wa" placeholder="Nomor HP/Whatsapp">
								<input type="button" name="next" id="next" value="Next..">
							</form>
						</div>
						<div class="subContent" id="sub2">
							<div class="title">Masukkan Jumlah Nozzle</div> 
							<form>
								<input type="number" class="form_data" name="jml_nozzle" id="jml_nozzle" placeholder="Masukkan Jumlah Nozzle">
							</form>
							<!--							
							<div class="title">Silahkan Pilih Timbangan/UTTP</div>  
							<div class="shopChart"></div>	
							<div class="addDiv">+<p id="klik">Klik disini</p></div>
							-->

							<div class="backBtnDiv">
								<form><input type="button" name="back" id="back" value="Back.."></form>
								<form><input type="button" name="sbmt" id="sbmt" value="Submit"></form>
							</div>                  
						</div>
						<datalist id="kelurahan"></datalist>
						<datalist id="spbu"></datalist>
					</div>
					
					<div class="uttpDiv hidden"></div>
					<div class="jmlhDiv hidden"><h1>Silahkan isi jumlah & no.seri</h1>
						<form>
							<input type="number" class="form_data" name="jml" id="jml" placeholder="jumlah...">
							<input type="number" class="form_data" name="serial" id="serial" style="width : 45%;" placeholder="no seri awal">
							<input type="number" class="form_data" name="serialAkhir" id="serialAkhir" style="width : 45%;" placeholder="no seri akhir" readonly>
							<input type="button" class="form_data" name="setJml" id="setJml" value="Tambahkan ke keranjang">
						</form>
					</div>`;		

			const formSpbu = new createFormSpbu(document.querySelector(".main"), str);
			formSpbu.generateForm();
			formSpbu.generateBtnHandler();

			const sbmtHandler = new spbuSubmitProcessor(formSpbu);
	});

	let menuLoko = document.querySelector(".menu").children[3];
	menuLoko.addEventListener("click", () => {
		let str = `<div class="mainContent">      
						<div class="subContent" id="sub1">
							<div class="title">Silahkan isi data Anda</div>
							<form>
								<input type="text" class="form_data" name="nama" id="nama" list="perushLoko" placeholder="Masukkan nama / badan usaha">
								<textarea  class="form_data" name="alamat" id="alamat" rows="4" cols="10" placeholder="Masukkan alamat"></textarea>  
								<input type="text" class="form_data" name="kel" id="kel" list="kelurahan" placeholder="Masukkan kelurahan">  
								<input type="number" class="form_data" name="wa" id="wa" placeholder="Nomor HP/Whatsapp">
								<input type="button" name="next" id="next" value="Next..">
							</form>
						</div>
						<div class="subContent" id="sub2">
							<div class="title">Silahkan Pilih Timbangan/UTTP</div>  
							<div class="shopChart"></div>
							<div class="addDiv">+<p id="klik">Klik disini</p></div>
							<div class="backBtnDiv">
								<form><input type="button" name="back" id="back" value="Back.."></form>
								<form><input type="button" name="sbmt" id="sbmt" value="Submit"></form>
							</div>                  
						</div>
						<datalist id="kelurahan"></datalist>
						<datalist id="perushLoko"></datalist>
					</div>
					<div class="uttpDiv hidden"></div>					
					<div class="jmlhDiv hidden"><h1>Jumlah : </h1>
						<form class="spe">
							<input type="number" class="form_data" name="jml" id="jml" placeholder="jumlah..">
							<input type="button" class="form_data" name="setJml" id="setJml" value="Tambahkan ke keranjang">
						</form>
						<p style="text-align : right;"><a class="closeFormJml" href=#><span>x</span> Close</a></div></p>
					</div>`;
		
		const formLoko = new createFormLoko(document.querySelector(".main"), str);
		formLoko.generateForm();
		const args = ['k', 'this.list[k][0]', 'this.list[k][4]', 'this.list[k][3]']
		formLoko.stringUttp`<div id=${args[0]} class='daftarUttp' style="background-image : url(${args[2]});"><fieldset class="listFieldset"><legend class="listLegend">${args[3]}</legend></fieldset></div>`;
		formLoko.generateBtnHandler();

		const sbmtHandler = new lokoSubmitProcessor(formLoko);
	});

	let menuReparatir = document.querySelector(".menu2").children[0];

	menuReparatir.addEventListener("click", async () => {
		let str = `<div class="mainContent">      
						<div class="subContent" id="sub1">
							<div class="title">Silahkan isi data</div>
							<form>
								<input type="text" class="form_data" name="nama" id="nama" placeholder="Masukkan nama / badan usaha">
								<textarea  class="form_data" name="alamat" id="alamat" rows="4" cols="10" placeholder="Masukkan alamat"></textarea>  
								<input type="text" class="form_data" name="kel" id="kel" list="kelurahan" placeholder="Masukkan kelurahan">  
								<input type="number" class="form_data" name="wa" id="wa" placeholder="Nomor HP/Whatsapp">
								<input type="button" name="next" id="next" value="Next..">
							</form>
						</div>
						<div class="subContent" id="sub2">
							<div class="title">Silahkan Pilih Timbangan/UTTP</div>  
							<div class="shopChart"></div>
							<div class="addUttp">
								<div class="addDivReparatir">+<p id="klik">Klik disini</p></div>
								<div class="addDivReparatir qrDivReparatir"></div>
							</div>
							<div class="backBtnDivReparatir">
								<form><input type="button" name="back" id="back" value="Back.."></form>
								<form><input type="button" name="sbmt" id="sbmt" value="Submit"></form>
							</div>                  
						</div>
						<datalist id="kelurahan"></datalist>
					</div>
					<div class="uttpDiv hidden"></div>					
					<div class="scanDiv hidden">
						<!--<h3></h3>--> 
						<video id="video" autoplay style="max-width : 100%; max-height : 100%;"></video>
					</div>
					<div class="jmlhDiv hidden">
						<form class="spe">
							<input type="text" class="form_data2" name="uttp" id="uttp" readonly>
							<input type="text" class="form_data2" name="kap" id="kap" readonly placeholder="kapasitas">
							<input type="text" class="form_data2" name="d" id="d" readonly placeholder="dayabaca">
							<input type="number" class="form_data2" name="jml" id="jml" placeholder="jumlah..">
							<input type="text" class="form_data2" name="merk" id="merk" placeholder="merk">
							<input type="text" class="form_data2" name="tipe" id="tipe" placeholder="tipe/model">
							<input type="text" class="form_data2" name="sn" id="sn" placeholder="no seri">
							<input type="text" class="form_data2" name="buatan" id="buatan" placeholder="buatan">
							<input type="button" class="form_data2" name="setJml" id="setJml" value="Tambahkan ke keranjang">
						</form>
						<p style="text-align : right;"><a class="closeFormJml" href=#><span>x</span> Close</a></div></p>
					</div>`;
		
		const formMasyRedApp = new createFormMasyRedApp(document.querySelector(".main"), str);
		await formMasyRedApp.generateForm();

		const args = ['k', 'this.list[k][0]', 'this.list[k][4]', 'this.list[k][0]', 'this.list[k][1]', 'this.list[k][2]']
		formMasyRedApp.stringUttp`<div id=${args[0]} class='daftarUttp' style="background-image : url(${args[2]});"><fieldset class="listFieldset"><legend class="listLegend">${args[3]} ${args[4]}</legend></fieldset></div>`;
		formMasyRedApp.generateBtnHandler();

		const scanHandler = new masyPrepareCam(formMasyRedApp);
		const sbmtHandler = new masySubmitProcessorRedApp(formMasyRedApp);
	});

	let menuHistory = document.querySelector(".menu2").children[1];

	menuHistory.addEventListener('click', () => window.location.assign('history_pc.html'));

})();


