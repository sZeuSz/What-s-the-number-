import { configPerLeds, htmlPerLeds, getInfo } from "./utils/utils.js";

let validNumber = false;
let magicNumber;
let erro = false;

/**
 * Função responsável por retornar os dígitos
 * do número que o usuário escolheu ou erro da
 * requisição.
 *
 * Lógica: Enquanto número for divisível por 10
 * quer dizer que eu ainda consigo tirar dígitos
 * dele, adicionando cada dígito no começo do array.
 */
const arrayOfDigits = (number) => {
  let digits = [];

  while (number > 0) {
    digits.unshift(number % 10);
    number = Math.floor(number / 10);
  }

  return digits;
}


/**
 * Função responsável por desabilitar o input e o botão de enviar.
 *
 * Lógica: Simplesmente busca os elementos botão de restart, input e
 * botão de enviar pela classe e remove a classe none do botão de restart
 * para que ele apareça e depois adiciona a classe responsável
 * por dar o estilo de desabilitado para eles.
 */
const disableFieldsAndButton = () => {
  document.querySelector(".restart").classList.remove("none");
  document.querySelector(".input").classList.add("disable-input");
  document.querySelector(".submit").classList.add("disable-button");
}


/**
 * Função responsável por modificar a cor dos leds.
 *
 * Lógica: Para cada elemento do DOM que tem a classe on ou on-center
 * que representa a parte de led acesa, modifico essa classe
 * baseada no que recebo por parâmetro (erro ou accept).
 *
 * Obs: para elementos do centro adiciono sufixo "on-center".
 *
 * Por fim, chama a função que desabilita os campos
 * com que o usuário pode interagir.
 */
const switchClassLeds = (className, numberChoiced) => {
  document.querySelectorAll(".on-center").forEach((e) => {
    e.classList.remove("on-center");
    e.classList.add(`${className}-on-center`);
  });
  document.querySelectorAll(".on").forEach((e) => {
    e.classList.remove("on");
    e.classList.add(className);
  });

  disableFieldsAndButton();
}


/**
 * Função responsável por modificar a notificação que deve aparecer
 * para o usuário.
 *
 * Lógica: Modificar a notificação que deve aparecer
 * para o usuário manipulando o innerHTML do elemento responsavel
 * pelo alert (class .notification).
 *
 * OBS: Caso o usuário acerte ou a requisição tenha um erro, os leds
 * precisam mudar de cor, então a função switchClassLeds é chamada
 * para fazer essa parte.
 */
const renderInfo = ({ alertMessage, classNameAlert, classNameLeds }) => {
  let notification = document.querySelector(".notification");
  notification.classList.add(classNameAlert);
  notification.innerHTML = alertMessage;

  if (alertMessage === "Você acertou!!!!" || alertMessage === "ERRO")
    switchClassLeds(classNameLeds);
}


/**
 * Função responsável por renderizar o número que
 * o usuário digitar no campo input.
 *
 * Lógica: Para cada digito do número que o usuário digitou
 * renderiza o led com a configuração HTML correspondente ao número
 * que é informado lá em congifPerLeds no arquivo data.js e
 * então a renderização é feita através da manipulação do DOM
 * concatenando cada led gerado no innerHTML do painel de leds.
 */
const renderNumber = (digits) => {
  let panel = document.querySelector(".panel");
  panel.innerHTML = "";

  for (let i = 0; i < digits.length; i++) {
    let string = `<div class="main unit ">`;
    htmlPerLeds.forEach((element, index) => {
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


/**
 * Função responsável por retornar as informações
 * que serão usadas nas funções que alertam
 * o usuário sobre seu palpite.
 *
 * Lógica: Baseado em comparações modifica as
 * propriedade alertMessage, classNameAlert e classNameLeds
 * que são responsáveis por texto que deve ser exibido para
 * o usuário, cor do texto que deve ser exibido e cor dos leds
 * respectivamente.
 */
const returnInfos = (numberChoiced, magicNumber) => {
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


/**
 * Função responsável pelo processo de submissão do palpite
 * do usuário.
 *
 * Lógica: Gera array dos dígitos do número escolhido pelo usuário
 * caso tenha um erro, retorna o code do erro para a função
 * que gera o array de dígitos. depois disso chama a função que gera
 * a informação de cada alert ("É maior", "É menor"...)
 * e também gera as configurações para os estilos de cada alert e led.
 *
 * Por fim... chama outras duas funções renderNumber e renderInfo
 * (como o nome já diz, fazem manipulação do DOM)
 */
const submitAnswer = (numberChoiced, magicNumber) => {
  const digits = arrayOfDigits(erro ? erro : numberChoiced);

  let info = returnInfos(numberChoiced, magicNumber);

  renderNumber(digits);
  renderInfo(info);
}


/**
 * Função responsável por prevenir o
 * comportamento padrão ao clicar no botão
 * de enviar.
 *
 * Lógica: Limpar o valor do input usando o .value ao buscar e depois checa se
 * o número é válido, se for válido, chama a função responsável pelo
 * processo de submissão do palpite do usuário.
 */
const preventDefault = (evt) => {
  evt.preventDefault();
  let input = document.querySelector(".input");
  let numberChoiced = parseInt(input.value, 10);
  input.value = "";
  if (validNumber) {
    submitAnswer(numberChoiced, magicNumber);
  }
}

/**
 * função responsável por modificar o
 * erro embaixo do input baseado no valor
 * que o usuário digita.
 * 
 * Lógica: Compara o valor do input para saber
 * se é um valor aceitável ou não, caso não seja
 * marca a variável global validNumber como false, 
 * caso seja valido limpa o erro embaixo do input e
 * marca a variável global validNumber como true.
 */
const handleInput = (event) => {
  let { value } = event.target;
  value = parseInt(value, 10)
  let errolabel = document.querySelector(".erro-info");
  
  if (value <= 0 || value > 300 || !(/^[0-9]+$/.test(value))) {
    errolabel.innerHTML = "O número deve estar entre 0 e 300";
    validNumber = false;
    return;
  }

  errolabel.innerHTML = "";
  validNumber = true;
};

/**
 * Função responsável por fazer a primeira requisição do
 * jogo a cada novo início de jogo.
 *
 * Lógica: caso a requisição tenha sucesso, atribue
 * o valor da resposta na variável global magicNumber
 * caso a requisição der algum erro, pega o status code desse
 * e atribue na variável global "erro".
 */
const iniatializeAndGenerateNumber = () => {
  axios
    .get("https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300")
    .then((response) => {
      magicNumber = response.data.value;
    })
    .catch((error) => {
      erro = error?.response?.data?.StatusCode;
    });
}

/**
 * Função responsável por resetar todas as configurações
 * necessárias para o estado inicial do jogo ser mantido.
 * 
 * Lógica: Usando document.querySelector para buscar os elementos do DOM
 * adiciona none no classList do botão de restart
 * para ele sumir da tela, remove as classes responsável pelo
 * disable do input e botão, limpa o innerHTML do erro no input, remove todas as classes possíveis
 * do alert que aparece para o usuário durante o jogo,
 * redefine o valor da variável global "erro" para false, 
 * redefine o innerHTML do painel para o led com 
 * o número zero (estado inicial do led) e por fim gera um novo
 * número usando a API.
 */
const restartGame = () => {
  document.querySelector(".restart").classList.add("none");
  document.querySelector(".input").classList.remove("disable-input");
  document.querySelector(".submit").classList.remove("disable-button");
  document.querySelector(".erro-info").innerHTML = "";
  let notification = document.querySelector(".notification");
  notification.classList.remove("erro");
  notification.classList.remove("alert");
  notification.classList.remove("accept");
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

/** função auto-invocável 
 * 
 * responsável por fazer a primeira requisição da API 
 * ao carregar a página.
 * 
*/
(() => iniatializeAndGenerateNumber())();
 
/**
 * Adicionando eventos para 
 * controlar clicks e inputs baseado
 * nas funções que criei
 */
document
  .querySelector(".submit")
  .addEventListener("click", preventDefault, false);
document
  .querySelector(".restart")
  .addEventListener("click", restartGame, false);
document.
  querySelector(".input").
  addEventListener("keyup", handleInput, false);
