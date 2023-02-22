const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const selectMovie = document.getElementById("movie");
const count = document.getElementById("count");
const total = document.getElementById("total");

populateUI();

let selectValue = selectMovie.value;

// Save selected movie index and price

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// show Count Of selected
function showCountOfselected() {
  const selectedSeat = document.querySelectorAll(".row  .seat.Selected");

  const seatsIndex = [...selectedSeat].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  let countSelected = selectedSeat.length;

  // we add + operator to change the string of countSelected to Number

  count.innerText = +countSelected;
  total.innerText = +countSelected * selectValue;
  setMovieData(selectMovie.selectedIndex, selectMovie.value);
}

// get Data from local Storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("Selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    selectMovie.selectedIndex = selectedMovieIndex;
  }
}
//Add event listener

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("seat occupied")
  ) {
    e.target.classList.toggle("Selected");

    showCountOfselected();
  }
});

selectMovie.addEventListener("change", (e) => {
  selectValue = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  showCountOfselected();
});

showCountOfselected();
