function tempAlert(duration) {
  let wadah = document.querySelector(".wadah");

  if (wadah !== null) {
    wadah.addEventListener("change", function() {
      console.log("test");
    });

  }
  /*let el = document.createElement("div");
  el.setAttribute("class", "alertUpdatePenera");
  el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
  el.innerHTML = "Tunggu sebentar ya..";
  setTimeout(function(){
    el.parentNode.removeChild(el);
  },duration);
  document.body.appendChild(el);
  */
}

//tempAlert(5000);

function detailItem(arr, jenisTera, iter, penera) {
  let detailStr = ``;
  let uttp = ``;
  let arrLabel = [];

  let i = 0;
  detailStr += `<table class="wadah">`;
  
  console.log(arr);
  //console.log(penera);

  let strPenera = ``;
  let strPenera2 = ``;

  if (arr.length === 19) {
    strPenera = `<select class="pilihPenera" id="${arr[18]}"><option></option>`;
    strPenera2 = `<select class="pilihPenera2" id="${arr[18]}"><option></option>`;
  } else {
    strPenera = `<select class="pilihPenera" id="${arr[17]}"><option></option>`;    
    strPenera2 = `<select class="pilihPenera2" id="${arr[17]}"><option></option>`;    
  }

  for (let [i,k] of penera.entries()) {
    i !== 0 ? strPenera += `<option value="${jenisTera}">${k[2]}</option>` : '';
    i !== 0 ? strPenera2 += `<option value="${jenisTera}">${k[2]}</option>` : '';
  }

  strPenera += `</select>`;

  if (jenisTera === "tera") {
    detailStr += `<thead><tr><td>WTU</td><td>Alamat</td><td>UTTP</td><td>Merek</td><td>SN</td><td>Tipe</td><td>Jml</td><td>Buatan</td><td>Penera</td></tr></thead>`;
    detailStr += `<tbody><tr><td>${arr[2]}</td><td>${arr[3]}</td><td>${arr[6]} / ${arr[7]} / ${arr[8]}</td><td>${arr[9]}</td><td>${arr[10]} - ${arr[10]+arr[13]-1}</td><td>${arr[11]}</td><td>${arr[13]}</td><td>${arr[14]}</td><td>${arr[15] === ""? `${strPenera} & ${strPenera2}` : arr[15]}</td><td><input type="button" class="sertifikatBtn" name="${arr[1]}-${iter}-${jenisTera}" id="${arr[1]}-${iter}-${jenisTera}" value = "Sertifikat"></td></tr></tbody>`;    

  } else {
    detailStr += `<thead><tr><td>WTU</td><td>Alamat</td><td>UTTP</td><td>Merek</td><td>SN</td><td>Tipe</td><td>Jml</td><td>Buatan</td><td>Penera</td></tr></thead>`;
    detailStr += `<tbody><tr><td>${arr[2]}</td><td>${arr[3]}</td><td>${arr[6]} / ${arr[7]} / ${arr[8]}</td><td>${arr[9]}</td><td>${arr[10]}</td><td>${arr[11]}</td><td>${arr[12]}</td><td>${arr[13]}</td><td>${arr[14] === ""? `${strPenera} & ${strPenera2}` : arr[14]}</td><td><input type="button" class="sertifikatBtn" name="${arr[1]}-${iter}-${jenisTera}" id="${arr[1]}-${iter}-${jenisTera}" value = "Sertifikat"></td></tr></tbody>`;
  }

  detailStr += `</table>`;
  /*
  for (let [idx,ar] of arr.entries()) {
    //detailStr += ` ${ar} |`;
    if (idx != 0 && idx != 1 && idx != 15 && idx != 16 && idx != 5 && idx != 4 && idx != 17) {
      if (idx === 6 || idx === 7 || idx === 8) {
        uttp += `${ar} / `;
        if (idx === 8) {
          detailStr += `<tr><td class="label">${arrLabel[i]}</td><td>${uttp}</td></tr>`;
          i++;
        }
      } else {
        detailStr += `<tr><td class="label">${arrLabel[i]}</td><td>${ar}</td></tr>`;
        i++;
      }
    }
  }
  

  detailStr += `
    <tr><td colspan=2 align="center"><input type="button" name="${arr[1]}-${iter}" id="${arr[1]}-${iter}" value = "Sertifikat"></td></tr>
    </table>
  `;
  */

  return detailStr;
}


function detectIfPeneraSelected() {
  let peneraSelect = document.querySelectorAll(".pilihPenera");
  
  for (let k of peneraSelect) {
    k.addEventListener("change", async function() {
      let el = document.createElement("div");
      el.setAttribute("class", "alertUpdatePenera");
      el.innerHTML = "Tunggu sebentar ya..";

      const data = {
          'baris' : k.id,
          'penera' : k.options[k.selectedIndex].text,
          'jenisTera' : k.options[k.selectedIndex].value,
          'authData' : {
            'token' : sessionStorage.getItem('key')
          }
      };

      this.parentElement.appendChild(el);
      

      let url = "https://script.google.com/macros/s/AKfycbxM3w_o36FS0giKTKchPjM84XMRxTqorCVqq5XU_TBi7_IZDDoTVx8ZOacYcgzpT3oqxw/exec";
      await fetch(url, {
        method : 'POST',
        body : JSON.stringify(data)
      })
      .then(e => e.json())
      .then(e => {
        if (e.result === "success") {
          el.innerHTML = "Data Penera Berhasil Diupdate";
        } else {
          el.innerHTML = "Update data gagal";
        }
        
        setTimeout(() => {
          this.parentElement.removeChild(el);
        },1000);

      });
    });

  }
}

function detectIfPeneraDuaSelected() {
  let peneraSelect = document.querySelectorAll(".pilihPenera2");
  
  for (let k of peneraSelect) {
    k.addEventListener("change", async function() {
      let el = document.createElement("div");
      el.setAttribute("class", "alertUpdatePenera");
      el.innerHTML = "Tunggu sebentar ya..";

      const data = {
          'baris' : k.id,
          'penera' : k.options[k.selectedIndex].text,
          'jenisTera' : k.options[k.selectedIndex].value,
          'authData' : {
            'token' : sessionStorage.getItem('key')
          }
      };

      this.parentElement.appendChild(el);
      

      let url = "https://script.google.com/macros/s/AKfycbxM3w_o36FS0giKTKchPjM84XMRxTqorCVqq5XU_TBi7_IZDDoTVx8ZOacYcgzpT3oqxw/exec";
      await fetch(url, {
        method : 'POST',
        body : JSON.stringify(data)
      })
      .then(e => e.json())
      .then(e => {
        if (e.result === "success") {
          el.innerHTML = "Data Penera Berhasil Diupdate";
        } else {
          el.innerHTML = "Update data gagal";
        }
        
        setTimeout(() => {
          this.parentElement.removeChild(el);
        },1000);

      });
    });

  }
}


let dataPeneraDetail = {};

async function getPenera() {
  let url = "https://script.google.com/macros/s/AKfycbwVWS2_MAlA828n87BkKf4rkBHScPSxlAvPbKNiFtgMah2sZeGOUhrFguoVu7SJDtM/exec";
  let dataPenera;
  
  await fetch(url)
        .then(data => data.json())
        .then(data => {
          dataPenera = data;
        });

  for (let i of dataPenera.data) {
    dataPeneraDetail[i[2]] = `${i[1]} / ${i[3]}`;
  }      
  //console.log(dataPeneraDetail);

  return dataPenera;
}

let dataPenera;


async function changeDate() {
  let tgl = document.querySelectorAll('.tgl');

  dataPenera = await getPenera();

  for (let k of tgl) {
    k.addEventListener("change", async () => {
      //console.log(k.id);

      let obj = {
        "tgl_tuk" : {
          //"urlApi" : "https://script.google.com/macros/s/AKfycbwOdKdXcTkSTcFlBRW_KjdQdvMs3OdGwbXpeDe3KjcgYTFTwbaj3niE8BEE8QOoWG3WzA/exec",
          "urlApi" : "https://script.google.com/macros/s/AKfycbxQ0Df1SBipq1v2wqkSlbxyQNjI3e2wcJr3wLKgRoiRiRsXBe4RgYOhIGx01gBUGRjJJw/exec",
          "layoutPos" : ".k_tuk",
          "jenisTera" : "tuk"
        },
        "tgl_tera" : {
          //"urlApi" : "https://script.google.com/macros/s/AKfycbwwcsuTOwtj-SNAvZRXIQXXS2aBHN44D-d7oGiZ2WC-8BpNgY8K3mMEU5p5H2_RcF8Hww/exec",
          "urlApi" : "https://script.google.com/macros/s/AKfycby_EIGGqCHpnGBqshXzS1_cGZ_zMz1OgaWZVBX7bJCxlDCUm29tBC_du1PnEdohGkEMXw/exec",
          "layoutPos" : ".k_tera",
          "jenisTera" : "tera"          
        },
        "tgl_spbu" : {
          //"urlApi" : "https://script.google.com/macros/s/AKfycbx-SWs7QFx19uB_dHVsrUK8Wwiu_W_2kKLYcFt5JJpjcDcruUEMvXMJsVljRfWIllcnKw/exec",
          "urlApi" : "https://script.google.com/macros/s/AKfycbyDkQgrJbZvMQY86zOflYAYmC31DPEffdxFH3mutX6Gv0EFmJQotvEgVa7P1pnaijt87A/exec",
          "layoutPos" : ".k_spbu",
          "jenisTera" : "spbu"          
        },
        "tgl_loko" : {
          //"urlApi" : "https://script.google.com/macros/s/AKfycbyLm3QRkA7sYj-KZC_CSK5NB4YXibuZLjFUymU3_GOe6cviUYZCp0QTr1E4qk-dNUZa/exec",
          "urlApi" : "https://script.google.com/macros/s/AKfycbwASU7suSjjiAm2Fg_BJFqdRF03tOQ09V1ZvyBV-03NyTVj-UUrHPRa2HnPO3E_2Ti1Hw/exec",
          "layoutPos" : ".k_loko",
          "jenisTera" : "loko"          
        }        
      };

      const urlApi = obj[k.id]["urlApi"];

      //console.log(k.value);

      const postData = {
        'tanggal' : k.value,
        'authData' : {
              'token' : sessionStorage.getItem('key') 
        }
      };

      clearTemplate(obj[k.id]["layoutPos"]);

      await fetch(urlApi, {
          method : 'POST',
          body : JSON.stringify(postData) 
      })
      .then(e => e.json())
      .then(e => {
          let str = '';
          if (e.result !== "error") {
            let lastOrder = 0;
            let iterator = 0;
            //console.log(e.data);
            arrayData = e.data;

            for (let l of e.data) {
              //console.log(l);
              if (l[1] !== lastOrder) {
                str += `</div></div>`;
                
                if (l.length === 18) {
                  str += `<div class="item"><div class="inner"><button id="${l[1]}" class="printSKRD">Nomor Order : ${l[16]}</button><div class="innerOfInner">${detailItem(l, obj[k.id]["jenisTera"], iterator, dataPenera.data)}</div>`;
                } else {
                  str += `<div class="item"><div class="inner"><button id="${l[1]}" class="printSKRD">Nomor Order : ${l[17]}</button><div class="innerOfInner">${detailItem(l, obj[k.id]["jenisTera"], iterator, dataPenera.data)}</div>`;                  
                }
                
                //str += `<div class="item"><div class="inner">Nomor Order : ${l[16]}<div class="innerOfInner">${detailItem(l, obj[k.id]["jenisTera"], iterator)}</div>`;
              } else {
                str += `<div class="innerOfInner">${detailItem(l, obj[k.id]["jenisTera"], iterator, dataPenera.data)}</div>`;
              }

              lastOrder = l[1];
              iterator++;
            }
          } else {
            alert(`Loading data tidak berhasil. Error Message : ${e.data}`);
            clearLoading(obj[k.id]["layoutPos"]);
            return;
          }
          //console.log(str);

          document.querySelector(obj[k.id]["layoutPos"]).innerHTML = str; 
          detectIfPeneraSelected();
          detectIfPeneraDuaSelected();
          printSKRD();
          printSertifikat();
      });
    });

  }
  
}

function clearTemplate(layout) {
  document.querySelector(layout).innerHTML = `<pre style="color : #0D98BA; font-family: 'Poppins', sans-serif;">Loading ......</pre>`; 
}

function clearLoading(layout) {
  document.querySelector(layout).innerHTML = ``; 
}


function getNowDate() {
  let d = new Date();
  let nowDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  
  for (let k of document.querySelectorAll('.tgl')) {
    k.value = nowDate;
  }
}

function  getArrayData() {
  return arrayData;
}

function filterTheArray(arr, id) {
    let arrayToSend = [];

    for (let k of arr) {
      if (k[1] === parseInt(id)) {
        arrayToSend.push(k);
      }
    }
    return arrayToSend;    
}

function printSKRD() {

  let prtTombol = document.querySelectorAll('.printSKRD');
  for (let k of prtTombol) {
    k.addEventListener('click', async function() {

      console.log(filterTheArray(getArrayData(), this.id));
      //console.log(this.id);

      let el = document.createElement("div");
      el.setAttribute("class", "alertCetakBukti");
      el.innerHTML = "Tunggu sebentar...Sedang membuat bukti pendaftaran";
      this.parentElement.insertBefore(el, this);
      setTimeout(() => this.parentElement.removeChild(el),2000);
    });

  }
}

function closeSertDialog(el) {
  document.querySelector('.closeSertSpan').addEventListener('click', () => document.querySelector('body').removeChild(el));
}

function parsePenera(inisial) {
  let ar = inisial.split("-");

  return `${dataPeneraDetail[ar[0]]} - ${dataPeneraDetail[ar[1]]}`;
}

function parseTglTera(rawTgl) {
  const tglToText = (tgl) => {
    let bln = {"01" : "Januari","02" : "Februari","03" : "Maret","04" : "April","05" : "Mei","06" : "Juni","07" : "Juli","08" : "Agustus","09" : "September","10" : "Oktober","11" : "November","12" : "Desember"};

    return `${tgl[0]} ${bln[tgl[1]]} ${tgl[2]}`;
  }

  //console.log(rawTgl.split("T")[0].split("-").reverse());
  return tglToText(rawTgl.split("T")[0].split("-").reverse());
}

function serializedFormSertData() {
  let formData = new FormData(document.getElementById('sertForm'));
  let serializedData = {};

  for (let[name, value] of formData) {
    serializedData[name] = value;
  }

  return serializedData;   
}

function SertBtnClickedHandler() {
  let submitSert = document.getElementById('submitSert');
  submitSert.addEventListener('click', async function() {
    console.log(serializedFormSertData());
  });
}

function printSertifikat() {
  let sertTombol = document.querySelectorAll('.sertifikatBtn');

  for (let k of sertTombol) {
    k.addEventListener('click', function() {
      let j_tera = this.id.split("-")[2];
      let idx_penera = "";
      j_tera === "tera" ? idx_penera = 15 : idx_penera = 14;
      console.log(getArrayData()[this.id.split("-")[1]]);
      let el = document.createElement("div");
      el.setAttribute("class", "sertContainer");
      document.querySelector('body').appendChild(el);
      let elSpan = document.createElement("span");
      elSpan.setAttribute("class", "closeSertSpan");
      elSpan.innerHTML = "X Close";
      el.appendChild(elSpan);
      let elHeader = document.createElement("h2");
      elHeader.setAttribute("class", "certHeader");
      elHeader.innerHTML = "Cek Kembali Data Sertifikat";

      let sertForm = document.createElement("form");
      sertForm.setAttribute("id","sertForm");

      let tableForm = document.createElement("table");
      tableForm.setAttribute("class","tableForm");
      let arrai = getArrayData()[this.id.split("-")[1]];
      let serialNum = "";
      j_tera === "tera" ? serialNum = `${arrai[10]} - ${arrai[10]+arrai[13]-1}` : serialNum = arrai[10];

      tableForm.innerHTML = `<tr><td>No Order</td><td><input type="text" class="inputSert hanyabaca" name="norder" id="norder" value="${arrai[16]}" readonly></td></tr>
        <tr><td>Tanggal Peneraan</td><td><input type="text" class="inputSert hanyabaca" name="wtu" id="wtu" value="${parseTglTera(arrai[0])}" readonly></td></tr>
        <tr><td>WTU</td><td><input type="text" class="inputSert" name="wtu" id="wtu" value="${arrai[2]}"></td></tr>
        <tr><td>Alamat</td><td><input type="text" class="inputSert" name="almt" id="almt" value="${arrai[3]}"></td></tr>
        <tr><td>UTTP</td><td><input type="text" class="inputSert" name="utp" id="utp" value="${arrai[6]} ${arrai[7]} / ${arrai[8]}"></td></tr>
        <tr><td>Merek</td><td><input type="text" class="inputSert" name="mrk" id="mrk" value="${arrai[9]}"></td></tr>
        <tr><td>Serial Number</td><td><input type="text" class="inputSert" name="srlnum" id="srlnum" value="${serialNum}"></td></tr>
        <tr><td>Model/Tipe</td><td><input type="text" class="inputSert" name="mdl" id="mdl" value="${arrai[11]}"></td></tr>
        <tr><td>Penera</td><td><input type="text" class="inputSert" name="pb" id="pb" value="${arrai[idx_penera].split("-").length < 2 ? dataPeneraDetail[arrai[idx_penera]] : parsePenera(arrai[idx_penera])}"></td></tr>
        <tr><td colspan=2 id="submitTd"><input type="button" name="submitSert" id="submitSert" value = "Buat Sertifikat"></tr>
        `;
      el.appendChild(elHeader);
      el.appendChild(sertForm);
      document.getElementById("sertForm").appendChild(tableForm);

      SertBtnClickedHandler();  
      closeSertDialog(el);

    });
  }

}
/*
async function chooseMenu() {
  let tab = document.querySelectorAll(".tablink");

  let dataPenera = await getPenera();

  for (let tb of tab) {
    tb.addEventListener("click", async () => {
   
      let obj = {
        "defaultOpen" : {
          "urlApi" : "https://script.google.com/macros/s/AKfycbwOdKdXcTkSTcFlBRW_KjdQdvMs3OdGwbXpeDe3KjcgYTFTwbaj3niE8BEE8QOoWG3WzA/exec",
          "layoutPos" : ".k_tuk"
        },
        "tabTera" : {
          "urlApi" : "https://script.google.com/macros/s/AKfycbwwcsuTOwtj-SNAvZRXIQXXS2aBHN44D-d7oGiZ2WC-8BpNgY8K3mMEU5p5H2_RcF8Hww/exec",
          "layoutPos" : ".k_tera"          
        },
        "tabSpbu" : {
          "urlApi" : "https://script.google.com/macros/s/AKfycbx-SWs7QFx19uB_dHVsrUK8Wwiu_W_2kKLYcFt5JJpjcDcruUEMvXMJsVljRfWIllcnKw/exec",
          "layoutPos" : ".k_spbu"          
        },
        "tabLoko" : {
          "urlApi" : "https://script.google.com/macros/s/AKfycbyLm3QRkA7sYj-KZC_CSK5NB4YXibuZLjFUymU3_GOe6cviUYZCp0QTr1E4qk-dNUZa/exec",
          "layoutPos" : ".k_loko"          
        }        
      };

      const urlApi = obj[tb.id]["urlApi"];

      let d = new Date();
      let nowDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;

      //console.log(urlApi);

      const postData = {
        'tanggal' : nowDate,
        'authData' : {
              'token' : sessionStorage.getItem('key') 
        }
      };

      clearTemplate(obj[tb.id]["layoutPos"]);

      await fetch(urlApi, {
          method : 'POST',
          body : JSON.stringify(postData) 
      })
      .then(e => e.json())
      .then(e => {
          let str = '';
          if (e.result !== "error") {
            let lastOrder = 0;
            let iterator = 0
            for (let l of e.data) {
              //console.log(l);
              if (l[1] !== lastOrder) {
                str += `</div></div>`;
                if (l.length === 18) {
                  str += `<div class="item"><div class="inner">Nomor Order : ${l[17]}<div class="innerOfInner">${detailItem(l,obj[tb.id]["jenisTera"], iterator)}</div>`;
                } else {
                  str += `<div class="item"><div class="inner">Nomor Order : ${l[16]}<div class="innerOfInner">${detailItem(l,obj[tb.id]["jenisTera"], iterator)}</div>`;                  
                }
              } else {
                str += `<div class="innerOfInner">${detailItem(l,obj[k.id]["jenisTera"], iterator)}</div>`;
              }

              lastOrder = l[1];
              iterator++;
            }
          } else {
            return;
          }
          //console.log(str);
          document.querySelector(obj[tb.id]["layoutPos"]).innerHTML = str; 
      });


    });
  } 
}
*/

let backToMain = document.getElementById('backToMain');
backToMain.addEventListener("click", () => {
  window.location.replace("/");
});

//console.log(await getPenera());

//chooseMenu();
let arrayData = [];
getNowDate();
changeDate();




