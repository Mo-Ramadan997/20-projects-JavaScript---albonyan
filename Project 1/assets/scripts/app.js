const form = document.getElementById("form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show Error message

const showErrorMassege = (input, messge) => {
  const formDiv = input.parentElement;
  formDiv.className = formDiv.className + " error";
  const small = formDiv.querySelector("small");
  small.textContent = messge;
};

//show succes message

const showSuccesMessage = (input) => {
  const formDive = input.parentElement;
  formDive.className = formDive.className + " succes";
};
// check email is valid
const checkEmailValid = (input) => {
  const reX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reX.test(input.value.trim())) {
    showSuccesMessage(input);
  } else {
    showErrorMassege(input, "Email is not valid");
  }
};

//Event lisners
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

//Check requird fields
function checkRequird(inputarr) {
  let isRequired = false;
  inputarr.forEach(function (input) {
    if (input.value.trim() === "") {
      showErrorMassege(input, `${getFielName(input)} is required`);
      isRequired = true;
    } else {
      showSuccesMessage(input);
    }
  });
  return isRequired;
}

//check input length

function checkLength(input, min, max) {
  if (input.value.lenth < min) {
    showErrorMassege(
      input,
      `${getFielName(input)} must be at least ${min} charactors`
    );
  } else if (input.value.length < max) {
    showErrorMassege(
      input,
      `${getFielName(input)} must be less than  ${max} charactors`
    );
  } else {
    showSuccesMessage(input);
  }
}

//Check password confirm
function checkPassword(input1, input2) {
  if (input1.value !== input2.value) {
    showErrorMassege(input2, `Password don't Match`);
  }
}

// Get validname

const getFielName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Event listeres

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkRequird([userName, email, password, password2])) {
    checkLength(userName, 3, 15);
    checkLength(password, 6, 25);
    checkEmailValid(email);
    checkPassword(password, password2);
  }
});
