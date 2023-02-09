// Inputs / DOM elements

const propertyValue = document.getElementById("propertyValue");
const deposit = document.getElementById("deposit");
const mortgageAmount = document.getElementById("mortgageAmount");
const year = document.getElementById("year");
const interestRate = document.getElementById("interestRate");
const resetBtn = document.getElementById('reset-btn')
const pay = document.getElementById("pay")
const btn = document.getElementById("btn")

const form = document.getElementById("mortgage");
const errorMessage = 'There is an error in the form, please check it!'

propertyValue.addEventListener('focusout',function(e){
    if (!propertyValue.validity.valid) {
        propertyValue.classList.add('error')
    } else {
        propertyValue.classList.remove('error');
    }
})
interestRate.addEventListener('focusout',function(e){
    if (!interestRate.validity.valid) {
        interestRate.classList.add('error')
    } else {
        interestRate.classList.remove('error');
    }
})

deposit.addEventListener('focusout',function(e){
    if (!deposit.validity.valid) {
        deposit.classList.add('error')
    } else {
        deposit.classList.remove('error');
    }
})

year.addEventListener('focusout',function(e){
    if (!year.validity.valid) {
        year.classList.add('error')
    } else {
        year.classList.remove('error');
    }
})

deposit.addEventListener("keyup", () => {
    mortgageAmount.value = propertyValue.value - deposit.value;

    let mortgageAmountValue = mortgageAmount.value;
    return mortgageAmountValue;
});


function calculateMortgage (mortgageAmount, interestRate, numberMonthlyPayments) {
    interestRate = percentageToDecimal (interestRate);
    function percentageToDecimal(percent) {
        return percent / 12 / 100;
    }

    numberMonthlyPayments = yearsToMonths (numberMonthlyPayments);
    function yearsToMonths(year) {
        return year * 12
    }

    let mortgage = (interestRate * mortgageAmount) /
                    (1 - Math.pow(1 + interestRate, - numberMonthlyPayments));
    console.log(mortgage);
    return parseFloat(mortgage.toFixed(2));
}

form.onsubmit = (e) => {
    e.preventDefault();
    validate();
    let mortgageAmount = propertyValue.value - deposit.value;

    let monthlyPayment = calculateMortgage (
        mortgageAmount,
        interestRate.value,
        year.value
    );

    document.getElementById("pay").innerHTML = ` <h5>Your Mortgage repayments</h5>
                    <h4>Mortgage Amount : € ${parseFloat(mortgageAmount).toFixed(2)}</h4>
                    <h4>Interest Rate : ${interestRate.value} %</h4> 
                    <h4>Term of loan : ${year.value} years</h4> 
                    <h4>Monthly Payment : € ${parseFloat(monthlyPayment).toFixed(2)}</h4>
                    <h6>This calculator is  for illustrative purposes only and does 
                    not constitute approval in principle or an offer of loan facilities. 
                    Loan approval will be subject to terms and conditions.</h6>`;
};

btn.addEventListener('click', function(e){
    if (propertyValue.validity.valid && interestRate.validity.valid && year.validity.valid && deposit.validity.valid) {
        calculateMortgagePayment()
    } else {
        pay.textContent = errorMessage
        pay.classList.add('error-message')
        btn.classList.add('form-error')
        if (!propertyValue.validity.valid) {
            propertyValue.classList.add('error')
        }
        if (!interestRate.validity.valid) {
            interestRate.classList.add('error')
        }
        if (!year.validity.valid) {
            year.classList.add('error')
        }
        if (!deposit.validity.valid) {
            deposit.classList.add('error')
        }
    }
})

function toggleVisibility()
{
document.getElementById("pay").style.visibility = "visible";
}


function validate() {
    if (
        propertyValue === "" ||
        deposit === "" ||
        interestRate === "" ||
        year === ""         
        ) {
        // alert("complete all fields");
    let alert = document.createElement("div");
    }
}

resetBtn.addEventListener('click', function() {
    document.getElementById("pay").innerHTML = ""
    document.getElementById("pay").style.visibility = "hidden";
    
})