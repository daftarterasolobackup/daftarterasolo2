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

let nextBtn = document.getElementById("next");
nextBtn.addEventListener('click',() => {
    location.href="#sub2";
});

let addBtn = document.querySelector(".addDiv");
addBtn.addEventListener('click',() => {
    setTimeout(() => {
        document.querySelector(".uttpDiv").style.display = "flex";
        document.querySelector(".uttpDiv").style.flexDirection = "row";
        document.querySelector(".uttpDiv").style.flexWrap = "wrap";
        document.querySelector(".uttpDiv").style.justifyContent = "flex-start";
        document.querySelector(".uttpDiv").hidden = false;  
    }, 300);
});

let uttpArrPic = [
    ['TBI','img/TBI.jpg'],
    ['TE','img/TE.webp'],
    ['TE','img/TE_analytic.webp'],
    ['TE','img/TE_hanging.webp'],
    ['TE','img/TE2.webp'],
    ['TE','img/TE3.jfif'],
    ['TM','img/TM.jfif'],
    ['TP','img/TP.jfif'],
    ['TP','img/TP2.webp'],
    ['TP','img/TP3.webp'],
    ['TS','img/TS.jpg'],
    ['DL','img/DL.jpg'],
    ['N','img/N.jpg'],
    ['MK','img/MK.jpg']
];

for (k in uttpArrPic) {
    console.log(uttpArrPic[k]);
}