function Quote(brand, type, year, kind){
    this.brand = brand;
    this.type = type;
    this.year = year;
    this.kind = kind;
}
Quote.prototype.quoteInsurance = function() {
    const base = 3000;
    let amount;
    switch(this.brand){
        case '1':
            amount = base*1.05;
            break;
        case '2':
            amount = base*1.20;
            break;
        case '3':
            amount = base*1.30;
            break;
        default:
            break;
    }
    //read year
    const diference = new Date().getFullYear() - this.year; 
    amount -= ((diference * 3) * amount) / 100;
    //read type
    if(this.type === 'basic'){
        amount *= 1.30;
    } else {
        amount *= 1.60;
    }

    return amount;
}

//functions
function UI(){}

UI.prototype.fillOptions = () => {
    const max = new Date().getFullYear();
    const min = max - 10;
    const selectYear = document.querySelector('#year');
    for(let i=max; i>=min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.showMessage = (message, type) => {
    const div = document.createElement('div');
    if(type === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('right');
    }
    div.classList.add('message');
    div.textContent = message;

    const form = document.querySelector('#quote-insurance');
    form.insertBefore(div, document.querySelector('#loading'));
    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.showResult = (quote, quoteTotal) => {
    const {brand, year, type, kind} = quote;
    let typeBrand;
    switch(brand){
        case '1':
            typeBrand = 'American';
            break;
        case '2':
            typeBrand = 'European';
            break;
        case '3':
            typeBrand = 'Asian';
            break;
        default:
            break;
    }

    const div = document.createElement('div');
    div.classList.add('quote-summary');
    div.innerHTML = `
    <p class="quote-total">Your summary</p>
    <p class="">Total: <span> $${quoteTotal}</span> </p>
    <p class="">Brand: <span>$${typeBrand}</span> </p>
    <p class="">Year: <span>$${year} </span></p>
    <p class="">Type: <span>$${type}</span> </p>
    <p class="">Kind: <span>$${kind} </span></p>
    `;

    const resultDiv = document.querySelector('#result');
    /* spinner */
    const spinner = document.querySelector('#loading');
    spinner.classList.remove('hidden');
    setTimeout(() => {
       spinner.classList.add('hidden');
       resultDiv.appendChild(div);
    }, 3000);

}

/* ------ */

const uI = new UI();
document.addEventListener('DOMContentLoaded', () => {
    uI.fillOptions();
})

eventListeners();
function eventListeners(){
    const form = document.querySelector('#quote-insurance');
    form.addEventListener('submit', quoteInsurance);
}

function quoteInsurance(e){
    e.preventDefault();

    const brand = document.querySelector('#brand').value;
    const year = document.querySelector('#year').value;
    const kind = document.querySelector('#kind').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    
    if(brand === '' || year === '' || type === '' || kind === ''){
        uI.showMessage('All fields are required', 'error');
        return;
    }
    uI.showMessage('quoting data...', 'right');
    const results = document.querySelector('#result div');
    if(results != null){
        results.remove();
    }

    //quote data
    const quote = new Quote(brand, type, year, kind);
    const quoteTotal = quote.quoteInsurance();
    uI.showResult(quote, quoteTotal);
}
