function submitAnswer() {
  console.log("lógica de submissão");
}

function preventDefault(evt) {
  evt.preventDefault();
  console.log(evt);
  submitAnswer();
}

document
  .querySelector(".submit")
  .addEventListener("click", preventDefault, false);
