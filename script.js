// all the questions
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
    answer: 1,
  },
  {
    ques: "First Country to complete all human trials of coronavirus vaccine?",
    options: ["USA", "Japan", "INDIA", "Russia"],
    answer: 3,
  },
  {
    ques:
      " How many countries, areas or territories are suffering from novel coronavirus outbreak in the World?",
    options: [
      "More than 50",
      "More than 100",
      "More than 150",
      "More than 200",
    ],
    answer: 3,
  },
  {
    ques:
      "What are the precautions that need to be taken to protect from the coronavirus?",
    options: [
      "Cover your nose and mouth when sneezing.",
      "Add more garlic into your diet.",
      "Visit your doctor for antibiotics treatment",
      "Wash your hands after every hour.",
    ],
    answer: 0,
  },
  {
    ques:
      "In a study, which cells are found in COVID-19 patients 'bode well' for long term immunity?",
    options: ["P-cell", "D-Cell", "T-Cell", "Endothelial Cells"],
    answer: 2,
  },
  {
    ques:
      "Name the vaccine that is jointly developed by the German company BioNTech and US pharma giant Pfizer for COVID-19?",
    options: ["BNT162", "PICOVACC", "Both A and B", "Neither A nor B"],
    answer: 0,
  },
  {
    ques:
      "Name a clinical trial in which blood is transfused from recovered COVID-19 patients to a coronavirus patient who is in critical condition?",
    options: [
      "Plasma Therapy",
      "Solidarity",
      "Remdesivir",
      "Hydroxychloroquine",
    ],
    answer: 0,
  },
  {
    ques:
      " World Health Organisation on 11 February, 2020 announced an official name for the disease that is causing the 2019 novel coronavirus outbreak? What is the new name of the disease?",
    options: ["COVID-19", "COVn-19", "COnV-20", "COnVID-19"],
    answer: 0,
  },
  {
    ques: "From where coronavirus got its name?",
    options: [
      "Due to their crown-like projections.",
      "Due to their leaf-like projections.",
      "Due to their surface structure of bricks.",
      "None of the above",
    ],
    answer: 0,
  },
];

// the current state
let answersGiven = new Array(questions.length).fill(null);
let currentQuestion = -1;

//all the elements
const questionElement = document.getElementById("question");
const options = document.getElementById("options");
const messageElement = document.getElementById("message");
const startElement = document.getElementsByClassName("start");
const quizElement = document.getElementsByClassName("quiz");
const resultElement = document.getElementsByClassName("result");
const infoElement = document.getElementById("info");
const scoreElement = document.getElementById("score");

// to store the answer given
const mark = (number) => {
  if (answersGiven[currentQuestion] === null) {
    answersGiven[currentQuestion] = number;
    showQues();
  }
};

// to show the question every time something changes
const showQues = () => {
  questionElement.textContent = questions[currentQuestion].ques;
  let optionsContent = "";
  let message = "";
  questions[currentQuestion].options.forEach((option, index) => {
    if (answersGiven[currentQuestion] !== null) {
      let classes;
      let select = false;
      if (answersGiven[currentQuestion] === index) {
        classes = "red";
        select = true;
        message = "<b style='color: red;'>think again</b>";
      }
      if (questions[currentQuestion].answer === index) {
        classes = "green";
        message = "<b style='color: green;'>you are correct</b>";
      }
      optionsContent += `<div class="${classes}"><input type="checkbox" name=${currentQuestion} id=${index} value=${index} disabled ${
        select ? "checked" : null
      } /><label for=${index} disabled>${option}</label></div>`;
    } else {
      optionsContent += `<div><input type="checkbox" name=${currentQuestion} id=${index} value=${index} onClick="mark(${index})"/><label for=${index}>${option}</label></div>`;
    }
  });
  messageElement.innerHTML = message;
  options.innerHTML = optionsContent;
};

// to restart the game
const restart = () => {
  currentQuestion = -1;
  answersGiven = new Array(questions.length).fill(null);
  questionElement.innerHTML = "";
  options.textContent = "";
  messageElement.textContent = "";
  startElement[0].classList.remove("none");
  quizElement[0].classList.add("none");
  resultElement[0].classList.add("none");
};

// to start the quiz
const startQuiz = () => {
  currentQuestion = 0;
  startElement[0].classList.add("none");
  quizElement[0].classList.remove("none");
  showQues();
};

// to move to next Ques
nextQues = () => {
  currentQuestion =
    currentQuestion < questions.length - 1
      ? currentQuestion + 1
      : currentQuestion;
  showQues();
};

//to move to previous Ques
previousQues = () => {
  currentQuestion = currentQuestion > 0 ? currentQuestion - 1 : currentQuestion;
  showQues();
};

// to end the quiz and get the results
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
