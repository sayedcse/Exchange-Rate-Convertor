const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swapBtn = document.getElementById('swap');

// Fetch exchange rates & Update DOM.
function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch(
        `https://v6.exchangerate-api.com/v6/acb592a3610a8a131bd0a714/latest/${currency_one}`
    )
        .then((res) => res.json())
        .then((data) => {
            const rate = data.conversion_rates[currency_two];

            rateEl.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;

            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        });
}

// Event listener
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swapBtn.addEventListener('click', () => {
    const tempValue = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = tempValue;
    calculate();
});

calculate();
