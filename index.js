url = "https://script.google.com/macros/s/AKfycbxNbS3tE2nm7KCbhIFw71dkBpwZn0MJWPbM2b7mhot7a3Ir0WxB3wCFCAnYOE38Dvo/exec";

fetch(url)
.then(datas => datas.json())
.then(datas => {
    let str = '';
    for (k in datas.data) {
        //console.log(datas.data[k]);
        str += `<option value='${datas.data[k]}'>${datas.data[k][0]}</option>`;
    }

    document.getElementById("kelurahan").innerHTML = str;
});