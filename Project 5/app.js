const addUserBtn = document.getElementById("user");
const doubleBtn = document.getElementById("double");
const millinBtn = document.getElementById("millin");
const sortBtn = document.getElementById("sort");
const calculateBtn = document.getElementById("calculate");
const main = document.getElementById("main");

let data = [];
// fetch and random users

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  // console.log(newUser);
  addData(newUser);
}

// Double number of money for users

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

// Sort users by richest

function sortByRichest() {
  data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDom();
}

// Show millioners in Dom

function showMilliners() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });

  updateDom();
}

// calculate wealth

function calculateWealth() {
  // const wealth = data.reduce((acc, curr) => (acc += curr.money), 0);
  const wealth = data.reduce((prev, curr) => (prev += curr.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>total wealth: <srtrog>${formatNumber(
    wealth
  )}  </strong> </h3>`;
  main.appendChild(wealthEl);
}
//Add new data to oblect

function addData(obj) {
  data.push(obj);

  updateDom();
}

// update Document and push data

function updateDom(providetData = data) {
  // clear main div
  main.innerHTML = "<h2><strong>person</strong> wealth</h2>";

  providetData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong> ${item.name} </strong> ${formatNumber(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// formate number as money

function formatNumber(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}
getRandomUser();
getRandomUser();
getRandomUser();
console.log(data);

//add event listener
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
millinBtn.addEventListener("click", showMilliners);
calculateBtn.addEventListener("click", calculateWealth);
