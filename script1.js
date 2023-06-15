const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questions.js";

let currentIndex = 0;// declarar variável índice da pergunta atual
let questionsCorrect = 0;// número de perguntas corretas


function nextQuestion(e) {
    const selectedButton = e.target;
  
    if (selectedButton.getAttribute("data-correct") === "true") {//verifica se a questão é verdadeira
      questionsCorrect++; //incrementa 1 a questão correta
      selectedButton.classList.add("correct");//para colocar a cor verde no css
    } else {
      selectedButton.classList.add("incorrect");//para colocar a cor azul no css
    }
  
    if (currentIndex < questions.length - 1) {
      currentIndex++;//incrementa a variável de indice
      setTimeout(loadQuestion, 1500); //chama a função para carregar a pergunta
    } else {
      setTimeout(finish, 1500); //chama a função para finalizar
    }
  }

btnRestart.onclick = () => {// evento de clique no botão `btnRestart`
  content.style.display = "flex";//esconde o botão de reiniciar
  contentFinish.style.display = "none";// mostra as perguntas

  currentIndex = 0;//zera a variável de indice
  questionsCorrect = 0;//zera a variável de questão correta
  loadQuestion();//  chama a função para carregar a primeira pergunta.
};



function finish() {
  textFinish.innerHTML = `você acertou ${questionsCorrect} de ${questions.length}`;////formatando a quantidade de questões corretas do total
  content.style.display = "none";// mostra as perguntas
  contentFinish.style.display = "flex";//esconde o botão de reiniciar
}



function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;//formatando a exibição de numero de perguntas e quantidade de perguntas
  const item = questions[currentIndex];//declarando um item do indice atual
  answers.innerHTML = "";//limpa as respostas anteriores
  question.innerHTML = item.question;//exibe a questão do item atual

  item.answers.forEach((answer) => {
    const div = document.createElement("div");//criando uma div com o texto do botão da class answer

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}"> ${answer.option} </button>`;
    //atributo do botão anterior consultando o objeto que tem o correct do question.js e consultando o texto do botão

    answers.appendChild(div);//atribuir a resposta a div que contém o html anterior
  });



  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);// adiciona um evento de clique em cada botão de resposta para chamar a função `nextQuestion` ao ser clicado.
  });
}

loadQuestion();//carregar a primeira pergunta assim que o script é executado.
