let questions = [
  {
    ques: "Where the first case of coronavirus was found?",
    options: [
      "Beijing, China",
      "Wuhan, China",
      "Shanghai, China",
      "Taipei, China",
    ],
    answer: 1,
  },
  {
    ques: "What other viruses belong to the coronavirus family?",
    options: [
      "SARS and influenza",
      "SARS and MERS",
      "SARS and HIV",
      "none of the above",
    ],
    answer: 2,
  },
  {
    ques: "First Country to complete all human trials of coronavirus vaccine?",
    options: ["USA", "Japan", "INDIA", "Russia"],
    answer: 3,
  },
];

let answersGiven = new Array(questions.length).fill(null);

let currentQuestion = -1;

const question = document.getElementById("question");
const options = document.getElementById("options");

const mark = (number) => {
  // let optionInput = document.getElementsByName(`${currentQuestion}`);
  if (answersGiven[currentQuestion] === null) {
    answersGiven[currentQuestion] = number;
    showQues();
  }
  console.log(answersGiven);
};

const showQues = () => {
  //change the display to block or flex
  question.textContent = questions[currentQuestion].ques;
  let optionsContent = "";
  questions[currentQuestion].options.forEach((option, index) => {
    if (answersGiven[currentQuestion] !== null) {
      let classes;
      let select = false;
      if (answersGiven[currentQuestion] === index) {
        classes = "red";
        select = true;
      }
      if (questions[currentQuestion].answer === index) {
        classes = "green";
      }
      optionsContent += `<div class="${classes}"><input type="checkbox" name=${currentQuestion} id=${index} value=${index} disabled ${
        select ? "checked" : null
      } /><label for=${index} disabled>${option}</label></div>`;
    } else {
      optionsContent += `<div><input type="checkbox" name=${currentQuestion} id=${index} value=${index} onClick="mark(${index})"/><label for=${index}>${option}</label></div>`;
    }
  });
  options.innerHTML = optionsContent;
};

const startElement = document.getElementsByClassName("start");
const quizElement = document.getElementsByClassName("quiz");
const resultElement = document.getElementsByClassName("result");
console.log(startElement);
const startQuiz = () => {
  currentQuestion = 0;
  startElement[0].classList.add("none");
  quizElement[0].classList.remove("none");
  showQues();
};
nextQues = () => {
  currentQuestion =
    currentQuestion < questions.length - 1
      ? currentQuestion + 1
      : currentQuestion;
  showQues();
};
previousQues = () => {
  currentQuestion = currentQuestion > 0 ? currentQuestion - 1 : currentQuestion;
  showQues();
};

const infoElement = document.getElementById("info");
const scoreElement = document.getElementById("score");

const endQuiz = () => {
  let score = 0;
  questions.forEach((ques, index) => {
    if (ques.answer === answersGiven[index]) {
      score++;
    }
  });
  infoElement.textContent = "Your score is";
  scoreElement.textContent = score + "/" + questions.length;
  quizElement[0].classList.add("none");
  resultElement[0].classList.remove("none");
};
