class buatForm {
    constructor(kontainer, labelName = [], inputType = [], inputNameId = [], className, idName, submitButton = false, resetButton = false) {
        this.kontainer = kontainer;
        this.labelName = labelName;
        this.inputType = inputType;
        this.inputNameId = inputNameId;
        this.className = className;
        this.idName = idName;
        this.submitButton = submitButton;
        this.resetButton = resetButton;
    }

    generateForm() {
        let formStr = '';
        let a, b;

        for ([a ,b] of this.inputType.entries()) {
            b === 'text' ? formStr += `<label for='${this.inputNameId[a]}' data-role="none" >${this.labelName[a]}</label>
            <input type='text' data-role="none" name='${this.inputNameId[a]}' id='${this.inputNameId[a]}'>` : 
            b === 'hidden' ? formStr += `<input type='hidden' name='${this.inputNameId[a]}' id='${this.inputNameId[a]}'>` : 
            b === 'password' ? formStr += `<label for='${this.inputNameId[a]}'>${this.labelName[a]}</label><input type='password' name='${this.inputNameId[a]}' id='${this.inputNameId[a]}'>` : 
            b === 'select' ? formStr += `<label for='${this.inputNameId[a][0]}'>${this.labelName[a]}</label><select name='${this.inputNameId[a][0]}' id='${this.inputNameId[a][0]}'>${this.generateOptionSelectVersiBaru(this.inputNameId[a][1])}</select>` : '';
        }
        
        this.resetButton === true ? document.querySelector(this.kontainer).innerHTML = `<div class="ribbon"><span class='pita'></span></div><span class='${this.className}'>DATA WTU</span><hr><form class='${this.className}' id='${this.idName}'>${formStr}</form><button class="${this.className} resetButton">Reset</button>` : document.querySelector(this.kontainer).innerHTML = `<span class='${this.className}'>DATA WTU</span><hr><form class='${this.className}' id='${this.idName}'>${formStr}</form>`;

        this.submitButton === true ? document.querySelector(this.kontainer).innerHTML += `<button class="${this.className} submitButton">Submit</button>` : '';

    }

    generateOptionSelectVersiBaru(optArray = []) {
        let optStr = `<option value=''></option>`;
        for (let b of optArray) {
            optStr += `<option value='${b.value}'>${b.text}</option>`
        }
        return optStr;
    }

    generateOptionSelect(idName, optArray = []) {
        let nodeListSelect = document.querySelectorAll(`#${this.idName} select`);
        for (let a of nodeListSelect) {
            if (idName === a.id) {
                let optStr = `<option value=''></option>`;
                for (let b of optArray) {
                    optStr += `<option value='${b[0]}'>${b[1]}</option>`
                }
                document.getElementById(a.id).innerHTML = optStr;
                return false;
            }
        }
    }

    resetForm() {
        document.getElementById(`${this.idName}`).reset();
    }
}

const label = ['NAMA WTU / PERUSAHAAN', 'ALAMAT', 'TELEPON',/*'','LOKASI LAYANAN'*/];
const tipeInput = ['text', 'text', 'text',/*'hidden','select'*/];
const selectOption = [
    {value : 'kantor', text : 'Kantor'},{value : 'luarKantor', text : 'Luar Kantor/Loko/Sidang'}
]
const inputNameId = ['nama', 'alamat', 'telpon',/*'jenisLayanan',['lokasiLayanan', selectOption]*/];

const form1 = new buatForm('.formWTU',label,tipeInput,inputNameId,'thisForm', 'form1', false, false);
form1.generateForm();
//form1.generateOptionSelect('lokasiLayanan', [['Kantor','Kantor'], ['Luar Kantor', 'Luar Kantor']]);

const form2 = new buatForm('.formWTU2',label,tipeInput,inputNameId,'thisForm2', 'form2', false, false);
form2.generateForm();
//form2.generateOptionSelect('lokasiLayanan', [['Kantor','Kantor'], ['Luar Kantor', 'Luar Kantor']]);
/*
const tombolReset = document.querySelector('.resetButton');
tombolReset.addEventListener('click', () => form1.resetForm());
*/
