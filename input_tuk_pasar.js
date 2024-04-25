let arr;

const backToMain = () => {
  document.getElementById('backToMain').addEventListener('click', () => window.location.replace("/"));
}

const getPasar = async () => {
  //const api = "https://script.google.com/macros/s/AKfycbwzVP84YKO62g10ShP-DKAqmOieh8VMJv_8L1FG6ZldOUNPnNFTTZgEKid6d8B6Dx6n/exec";
  const api = "https://script.google.com/macros/s/AKfycbxu8LXLu71dgPMtqHy0Azy1eCMnzz2JaSJEjbzo2A_bJ3sCFsNIBMHr8NTRyUzy6VI/exec";

  await fetch(api)
  .then(hasil => hasil.json())
  .then(hasil => {
    let str = ``;
    console.log(hasil.data);
    arr = hasil.data;

    hasil.data.forEach((el, idx) => {
      idx === 0 ? str += `<option value="">-- Pilih Pasar --</option>` : str += `<option id=${idx}}>${el[0]}</option>`;
    });

    document.getElementById("psr").innerHTML = str;
    doWhenPasarSelected();
  })
}

const doWhenPasarSelected = () => {
  document.getElementById("psr").addEventListener("change", function() {
    document.getElementById("kel").value = arr[parseInt(this.options[this.selectedIndex].id)][1];
    document.getElementById("almt").value = arr[parseInt(this.options[this.selectedIndex].id)][3];
  });
}

const getUttp = async () => {
  const api = "https://script.google.com/macros/s/AKfycbz_Je2ZXuIRFmxWdYpQTbgWbEa4iqU9ucJj1FrPK8hoql-UtKnFbBj-upEFOvWU7ZYH/exec";
  
  await fetch(api)
  .then(hasil => hasil.json())
  .then(hasil => {
    let str = ``;

    hasil.data.forEach((el, idx) => {
      idx === 0 ? str += `<option value=''>-- Pilih UTTP --</option>` : str += `<option value='${el[0]}/${el[1]}/${el[2]}'>${el[0]} ${el[1]}</option>`;
    });

    document.getElementById("uttp").innerHTML = str;
    doWhenUttpSelected();
  })
}

const doWhenUttpSelected = () => {
  document.getElementById("uttp").addEventListener("change", function() {
    if (document.getElementById("psr").value === "") {
      alert("Pasar belum dipilih");
      this.value = "";
      return false;
    }

    document.getElementById("uttp").value.includes("TE") === true ? showKap_n_dayabaca() : hideKap_n_dayabaca();
  });
}

const isiTabel = () => {
  let str = ``;

  for (let k = 0; k < 15; k++) {
    str += `<tr><td><input type="text" name=wtu${k*3+1} id=wtu${k*3+1} class="form_data" value="" placeholder="wtu ${k*3+1}"><input type="text" name=merk${k*3+1} id=merk${k*3+1} class="form_data" value="" placeholder="merk ${k*3+1}"></td><td><input type="text" name=wtu${k*3+2} id=wtu${k*3+2} class="form_data" value="" placeholder="wtu ${k*3+2}"><input type="text" name=merk${k*3+2} id=merk${k*3+2} class="form_data" value="" placeholder="merk ${k*3+2}"></td><td><input type="text" name=wtu${k*3+3} id=wtu${k*3+3} class="form_data" value="" placeholder="wtu ${k*3+3}"><input type="text" name=merk${k*3+3} id=merk${k*3+3} class="form_data" value="" placeholder="merk ${k*3+3}"></td></tr>`;
  }

  document.getElementById("myBody").innerHTML = str;
}

const showKap_n_dayabaca = () => {
  document.querySelectorAll('.toHide').forEach(el => {
    el.disabled = false;
    el.classList.remove("hidden");
    el.value = "";
  });
} 

const hideKap_n_dayabaca = () => {
  document.querySelectorAll('.toHide').forEach(el => {
    el.disabled = true;
    el.classList.add("hidden");
    el.value = "";
  });
} 

const ifSubmitted = async () => {
  document.getElementById("submitBtn").addEventListener("click", () => {
    if (document.getElementById("psr").value === "" || document.getElementById("uttp").value === "" ) {
      alert("Peringatan! Pasar atau jenis UTTP belum dipilih. Silahkan dipilih dahulu sebelum submit");
      return false;
    }

    document.getElementById('submitBtn').value = "Wait. Still Processing...";
    document.getElementById('submitBtn').classList.add('proses');

    let formData = new FormData(document.getElementById('pasarForm'));
    let serializedData = {};
    let wtuArr = [];
    let merkArr = [];
    let TPTE_Arr = {};

    for (let[name, value] of formData) {
      //name.includes("wtu") === false ? serializedData[name] = value : value !== "" ? wtuArr.push(value) : ''; 
       value !== "" ? name.includes("wtu") === true ? wtuArr.push(`${value} / ${document.getElementById("psr").value}`) : name.includes("merk")=== true ? merkArr.push(value) : serializedData[name] = value : ''; 
    }

    if (Object.keys(serializedData).length <= 5) {
      serializedData['kap'] = serializedData['uttp'].split("/")[1];
      serializedData['d'] = serializedData['uttp'].split("/")[2];
      serializedData['buatan'] = 'Indonesia';      
    }

    serializedData['wtu'] = wtuArr;
    serializedData['merk'] = merkArr;

    console.log(serializedData);

    //let postUrl = "https://script.google.com/macros/s/AKfycbwYNDaXGwVvGlsDBxf8P0u_yomZirY2B01f1NQJ_sHHINXPmnnOiKQJTCDll1jDjwGrxw/exec";

    let postUrl = "https://script.google.com/macros/s/AKfycbzvFoYm8k6EkJb-ngS3LkojWXrtVMhNHKP-Y45detzudHjqTmfMgBjLnHzhz8g8XGhEGQ/exec";

    fetch(postUrl,{
      method : 'POST',
      body : JSON.stringify(serializedData)
    })
    .then(res => res.json())
    .then(res => {
      document.getElementById('submitBtn').value = "SUBMIT";
      document.getElementById('submitBtn').classList.remove('proses');
      console.log(res)
    });
    
  });
}

backToMain();
getPasar();
getUttp();
isiTabel();
//showKap_n_dayabaca();
ifSubmitted();