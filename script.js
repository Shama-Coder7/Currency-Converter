const currencyElementInput1 = document.getElementById('currency-1');
const selectCurrency1 = document.getElementById('select-currency-1');
const currencyElementInput2 = document.getElementById('currency-2');
const selectCurrency2 = document.getElementById('select-currency-2');
const rateDetail = document.getElementById('rate-detail');

currencyCalculator();

function currencyCalculator() {
  const selectCurrency1value = selectCurrency1.value;
  const selectCurrency2value = selectCurrency2.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${selectCurrency1value}`)
    .then((response) => {
      //if promise wasn't resolved
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      const val = data.rates[selectCurrency2value];
      currencyElementInput2.value = (currencyElementInput1.value * val).toFixed(3);

      rateDetail.innerText = `1 ${selectCurrency1value} = ${val.toFixed(
        3
      )} ${selectCurrency2value}`;
    })
    .catch((error) => {
      console.log('problem : ', error);
    });
}

currencyElementInput1.addEventListener('input', currencyCalculator);
currencyElementInput2.addEventListener('input', currencyCalculator);

selectCurrency1.addEventListener('change', currencyCalculator);
selectCurrency2.addEventListener('change', currencyCalculator);
