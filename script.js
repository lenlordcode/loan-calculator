function apiConvector () {
    const apiKey = 'fa67ecc24d7f8b09a9dc48bd';
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/RUB`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const select = document.getElementById ('currency');
            dataCurrency = data.conversion_rates;
            Object.keys(dataCurrency).forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.text = name;
                select.appendChild(option);
            });
            converterValue();
        })
        .catch(error => {
            console.error('Ошибка:', error);
            dataCurrency = null;
        });
}


function calculatedResult() {
    const s = parseFloat(document.getElementById('loanAmount').value);
    const r = parseFloat(document.getElementById('interestRate').value) / 100;
    const n = parseFloat(document.getElementById('loanTerm').value);
    const p = (s * (r / 12)) / (1 - Math.pow(1 + r / 12, -n));
    return p * n;
}


function converterValue() {
    const amount = calculatedResult();
    const currencyName = document.getElementById('currency').value;
    const percent = parseFloat(document.getElementById('interestRate').value) / 100;
    const month = document.getElementById('loanTerm').value;
    const errorInfo = document.getElementById('loanError');
    errorInfo.textContent = '';
    if (amount<=0 || percent<=0 || month<= 0) {
        errorInfo.textContent = 'Ошибка, введено неверное значение!'
        const resultName = ['resultSelect','resultMonthSelect','resultRub','resultMonthRub']
        for (let i=0; i<resultName.length; i++){
            document.getElementById(resultName[i]).textContent = ''
        }
    }else{
        document.getElementById('resultSelect').textContent = "Общая выплата: " + amount.toFixed(0) + ' ' + currencyName;
        document.getElementById('resultMonthSelect').textContent = "Ежемесячная выпалата: " + (amount/month).toFixed(0) + ' ' + currencyName;
        if (currencyName === 'RUB'){
            document.getElementById('resultRub').textContent = '';
            document.getElementById('resultMonthRub').textContent = '';
        }else{
            document.getElementById('resultRub').textContent = "Общая выплата: " + (amount/dataCurrency[currencyName]).toFixed(0) + ' RUB';
            document.getElementById('resultMonthRub').textContent = "Ежемесячная выпалата: " + ((amount/dataCurrency[currencyName])/month).toFixed(0) + ' RUB';
        }
    }
   
}


let dataCurrency = null;


window.addEventListener('DOMContentLoaded', apiConvector);


document.querySelectorAll('.input, .select').forEach(item => {
    item.addEventListener('change', converterValue);
});

document.getElementById("interestRate").addEventListener("input", function() {
    if (this.value > 100) {
        this.value = 100;
    }else if (this.value<0){
        this.value = 0
    }
});


document.querySelectorAll('.input').forEach(item => {
    item.addEventListener("input", function() {
        if (item.value<0){
            item.value = 0;
        }
    })
});



