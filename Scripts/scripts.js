const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swapBtn = document.getElementById('swap');
const API_KEY = 'YOUR API KEY';

// Fetch exchange rates & Update DOM.
function calculate() {
    const currency_one = currencyEl_one.value.toLowerCase();
    const currency_two = currencyEl_two.value.toLowerCase();
    // const URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency_one}`;
    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency_one}.json`;

    fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const rate = data[currency_one][currency_two];

            rateEl.innerHTML = `1 ${currency_one.toUpperCase()} = ${rate.toFixed(
                2
            )} ${currency_two.toUpperCase()}`;

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
