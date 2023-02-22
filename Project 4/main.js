const currnencyOne = document.querySelector("#currency-one");
const amoountOne = document.getElementById("amount-one");
const currnencyTwo = document.getElementById("currency-two");
const amoountTwo = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

const calculate = () => {
  const currencyOneValue = currnencyOne.value;
  const currencyTwoValue = currnencyTwo.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/1c77cdf7d2e13000073734b6/latest/${currencyOneValue}`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.conversion_rates[currencyTwoValue]);
      const rate = data.conversion_rates[currencyTwoValue];

      rateEl.innerText = `1 ${currencyOneValue} = ${rate} ${currencyTwoValue}`;
      amoountTwo.value = (amoountOne.value * rate).toFixed(2);
    });
};
currnencyOne.addEventListener("change", calculate);
currnencyTwo.addEventListener("change", calculate);
amoountOne.addEventListener("input", calculate);
amoountTwo.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currnencyOne.value;
  currnencyOne.value = currnencyTwo.value;
  currnencyTwo.value = temp;
  calculate();
});

calculate();
