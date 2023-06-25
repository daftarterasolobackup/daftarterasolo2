import { createFormMasy } from './service/formMasy.js';
import { createFormPabrik } from './service/formPabrik.js';
import { createFormSpbu } from './service/formSpbu.js';

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
					</div>`;
		
		const formMasy = new createFormMasy(document.querySelector(".main"), str);
		await formMasy.generateForm();
		const args = ['k', 'this.list[k][0]', 'this.list[k][4]', 'this.list[k][3]']
		formMasy.stringUttp`<div id=${args[0]} class='daftarUttp' style="background-image : url(${args[2]});"><fieldset class="listFieldset"><legend class="listLegend">${args[3]}</legend></fieldset></div>`;
		formMasy.generateBtnHandler();

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
					<div class="jmlhDiv hidden"><h1>Silahkan isi jumlah & no.seri</h1>
						<form>
							<input type="number" class="form_data" name="jml" id="jml" placeholder="jumlah...">
							<input type="number" class="form_data" name="serial" id="serial" style="width : 45%;" placeholder="no seri awal">
							<input type="number" class="form_data" name="serialAkhir" id="serialAkhir" style="width : 45%;" placeholder="no seri akhir" readonly>
							<input type="button" class="form_data" name="setJml" id="setJml" value="Tambahkan ke keranjang">
						</form>
					</div>`;

		const formPabrik = new createFormPabrik(document.querySelector(".main"), str);
		await formPabrik.generateForm();
		formPabrik.generateBtnHandler();
		const args = ['k', 'this.list[k][0]', 'this.list[k][4]', 'this.list[k][0]', 'this.list[k][1]', 'this.list[k][2]']
		formPabrik.stringUttp`<div id=${args[0]} class='daftarUttp' style="background-image : url(${args[2]});"><fieldset class="listFieldset"><legend class="listLegend">${args[3]} ${args[4]}</legend></fieldset></div>`;
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
	});

	let menuLoko = document.querySelector(".menu").children[3];
	
	menuLoko.addEventListener("click", () => alert("test"));

})();


