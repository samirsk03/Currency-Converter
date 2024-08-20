
const BASE_URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json`;

let dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const ans = document.querySelector(".ans");
const input = document.querySelector(".input");

for (const select of dropdowns) {
  for (const currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerHTML = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
  }

  select.addEventListener("change", (elem) => {
    updateFlag(elem.target);
  });

  const updateFlag = (elem) => {
    let currCode = elem.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = elem.parentElement.querySelector("img");
    img.src = newSrc;
  };
}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amt = document.querySelector(".amount input");
  let amtVal = amt.value;
  if (amt === "" || amt < 1) {
    amtVal = 1;
    amt.value = "1";
    console.log("hgfuy");
  }

  let [fromCurrVal, toCurrVal] = [fromCurr.value, toCurr.value];
  console.log();
  let apikey = "0b1438c49439fa7dcb448902";

  const URL1 = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromCurrVal}`;
  let res = await fetch(URL1);
  let data = await res.json();

  let rates = data.conversion_rates;
  msg.innerHTML = `${rates[fromCurrVal]} ${fromCurrVal} = ${rates[toCurrVal]} ${toCurrVal}`;
  let ansVal = input.value  * rates[toCurrVal]
  ans.innerHTML = ansVal.toFixed(4)  ;
});
 