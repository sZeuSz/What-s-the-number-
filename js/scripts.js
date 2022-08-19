import { configPerLeds, htmlPerLeds } from "./data.js";

let validNumber = false;

function arrayOfDigits(number) {
  let digits = [];

  while (number > 0) {
    digits.unshift(number % 10);
    number = Math.floor(number / 10);
  }

  return digits;
}

function renderInfo(info, erro=false) {
  let notification = document.querySelector('.notification');
  notification.classList.remove("none");
  notification.classList.add(erro ? 'erro' : '');
  notification.innerHTML = info;
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
        splited[1] = `${splited[1].replace('"', '"' + configPerLeds[digits[i]][index] + " ")}"`;
        element = splited.join(">");
        console.log(element);
      } else {
        splited[0] = splited[0].split(">")[0].replace('"', '"' + configPerLeds[digits[i]][index] + " ");
        element = splited.join(">");
      }
      string += element;
    });
    string += "</div";
    panel.innerHTML += string;
  }
}
function submitAnswer(numberchoiced, numberMagic) {
  console.log("lógica de submissão");

  const digits = arrayOfDigits(numberchoiced);

  let info;
  if(!numberMagic){
    info = "ERRO"
  }
  else if(numberchoiced > numberMagic){
    console.log("É menor")
    info = "É menor"
  }
  else if(numberchoiced < numberMagic){
    info = "É maior"
  }
  else{
    info = "You Win"
  }
  renderInfo(info, info === 'ERRO')
  renderNumber(digits);  
}

function preventDefault(evt) {
  evt.preventDefault();

  let numberChoiced = Number(document.querySelector(".input").value);
  console.log(validNumber);
  if (validNumber) {
    axios
      .get(
        "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300"
      )
      .then((response) => {
        const { value } = response.data;
        submitAnswer(numberChoiced, value);
      })
      .catch((error) => {
        const erro = error?.response?.data?.StatusCode;
        submitAnswer(erro);
      });
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

document
  .querySelector(".submit")
  .addEventListener("click", preventDefault, false);
document.querySelector(".input").addEventListener("keyup", handleInput, false);
