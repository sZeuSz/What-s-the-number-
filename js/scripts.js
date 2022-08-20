import { configPerLeds, htmlPerLeds } from "./data.js";

let validNumber = false;
let magicNumber;
let erro = false;

function arrayOfDigits(number) {
  let digits = [];

  while (number > 0) {
    digits.unshift(number % 10);
    number = Math.floor(number / 10);
  }

  return digits;
}

function switchClassLeds(className, numberChoiced) {
  document.querySelectorAll(".on-center").forEach((e) => {
    e.classList.remove("on-center");
    e.classList.add(
      className === "accept-leds"
        ? `${className}-on-center`
        : `${className}-on-center`
    );
  });
  document.querySelectorAll(".on").forEach((e) => {
    e.classList.remove("on");
    e.classList.add(className);
  });

  document.querySelector(".restart").classList.remove("none");
  document.querySelector(".input").classList.add("disable-input");
  document.querySelector(".submit").classList.add("disable-button")
}

function renderInfo({ alertMessage, classNameAlert, classNameLeds }) {
  let notification = document.querySelector(".notification");
  notification.classList.add(classNameAlert);
  notification.innerHTML = alertMessage;

  if (alertMessage === "Você acertou!!!!" || alertMessage === "ERRO")
    switchClassLeds(classNameLeds);
}

function renderNumber(digits) {
  let panel = document.querySelector(".panel");
  panel.innerHTML = "";

  for (let i = 0; i < digits.length; i++) {
    let string = `<div class="main unit ">`;
    htmlPerLeds.forEach((element, index) => {
      //for each of the elements i add a class configuration to power on a seg.
      let splited = element.split(">");
      if (index === 2) {
        splited[1] = `${splited[1].replace(
          '"',
          '"' + configPerLeds[digits[i]][index] + " "
        )}"`;
        element = splited.join(">");
      } else {
        splited[0] = splited[0]
          .split(">")[0]
          .replace('"', '"' + configPerLeds[digits[i]][index] + " ");
        element = splited.join(">");
      }
      string += element;
    });
    string += "</div";
    panel.innerHTML += string;
  }
}

function returnInfos(numberChoiced, magicNumber) {
  let info = {};

  if (erro) {
    info.alertMessage = "ERRO";
    info.classNameAlert = "erro";
    info.classNameLeds = "erro-leds";
  } else if (numberChoiced > magicNumber) {
    info.alertMessage = "É menor";
    info.classNameAlert = "alert";
    info.classNameLeds = "empty";
  } else if (numberChoiced < magicNumber) {
    info.alertMessage = "É maior";
    info.classNameAlert = "alert";
    info.classNameLeds = "empty";
  } else {
    info.alertMessage = "Você acertou!!!!";
    info.classNameAlert = "accept";
    info.classNameLeds = "accept-leds";
  }

  return info;
}

function submitAnswer(numberChoiced, magicNumber) {
  console.log("lógica de submissão");
  console.log(magicNumber);
  const digits = arrayOfDigits(erro ? erro : numberChoiced);

  let info = returnInfos(numberChoiced, magicNumber);

  renderNumber(digits);
  renderInfo(info);
}

function preventDefault(evt) {
  evt.preventDefault();
  let input = document.querySelector(".input");
  let numberChoiced = Number(input.value);
  input.value = "";
  if (validNumber) {
    submitAnswer(numberChoiced, magicNumber);
  }
}

const handleInput = (event) => {
  const { value } = event.target;

  let errolabel = document.querySelector(".erro-info");

  if (value < 0 || value > 300) {
    errolabel.innerHTML = "O número deve estar entre 0 e 300";
    validNumber = false;
    return;
  }

  errolabel.innerHTML = "";
  validNumber = true;
};
function iniatializeAndGenerateNumber() {
  axios
    .get("https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300")
    .then((response) => {
      magicNumber = response.data.value;
    })
    .catch((error) => {
      erro = error?.response?.data?.StatusCode;
    });
}

function restartGame() {
  document.querySelector(".restart").classList.add("none");
  document.querySelector(".input").classList.remove("disable-input")
  document.querySelector(".submit").classList.remove("disable-button")
  let notification = document.querySelector(".notification")
  notification.classList.remove("erro")
  notification.classList.remove("alert")
  notification.classList.remove("accept")
  notification.innerHTML = "";
  erro = false;
  document.querySelector(".panel").innerHTML = `
  <div class="main unit">
      <div class="position-with-border top on"></div>
      <div class="position-with-border left-led-first on"></div>
      <div class="center-led "><div class="center">
          <div class="arrow-right"></div>
          <div class="arrow-left"></div>
      </div></div>
      <div class="position-with-border left-led-second on"></div>
      <div class="position-with-border right-led-first on"></div>
      <div class="position-with-border right-led-second on"></div>
      <div class="position-with-border bottom on"></div>
  </div>`;
  iniatializeAndGenerateNumber();
}

(() => iniatializeAndGenerateNumber())();

document
  .querySelector(".submit")
  .addEventListener("click", preventDefault, false);
document
  .querySelector(".restart")
  .addEventListener("click", restartGame, false);
document
  .querySelector(".input")
  .addEventListener("keyup", handleInput, false);
