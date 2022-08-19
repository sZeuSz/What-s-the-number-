import { leds } from "./data.js";

let validNumber = false;

function submitAnswer(numberchoiced, numbermagic) {
  console.log("lógica de submissão");

  let digits = 0;
  while (numberchoiced > 0) {
    numberchoiced = Math.floor(numberchoiced / 10);
    digits += 1;
  }

  let panel = document.querySelector(".panel");
  panel.innerHTML = "";
  for (let i = 0; i < digits; i++) {
    panel.innerHTML += leds[i];
  }
}

function preventDefault(evt) {
  evt.preventDefault();

  let numberchoiced = Number(document.querySelector(".input").value);

  if (validNumber) {
    //lógica requisição
    submitAnswer(numberchoiced);
  }
}

const handleInput = (event) => {
  const { value } = event.target;

  let errolabel = document.querySelector(".erro-info");

  if (!(value > 0 && value < 300)) {
    errolabel.innerHTML = "O número deve estar entre 0 e 300";
    validNumber = false;
    return;
  }

  errolabel.innerHTML = "";
  validNumber = true;
};

document
  .querySelector(".submit")
  .addEventListener("click", preventDefault, false);
document.querySelector(".input").addEventListener("keyup", handleInput, false);
