// all the questions
let question = [
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

let questions = question.sort(function (a, b) {
  return 0.5 - Math.random();
});

// the current state
let answersGiven = new Array(questions.length).fill(null);
let currentQuestion = -1;
let username;

//all the elements
const questionElement = document.getElementById("question");
const options = document.getElementById("options");
const messageElement = document.getElementById("message");
const startElement = document.getElementsByClassName("start");
const quizElement = document.getElementsByClassName("quiz");
const resultElement = document.getElementsByClassName("result");
const infoElement = document.getElementById("info");
const timeTakenElement = document.getElementById("timeTaken");
const nameForm = document.getElementsByTagName("form");
const gridElement = document.getElementById("grid");
const gridButtons = document.getElementsByClassName("gridButton");
const informationElement = document.getElementById("information");
const gridButtonContainer = document.getElementById("gridButtonContainer");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const highestScoreElement = document.getElementById("highestScore");

let timer;
let totalTime;
const startTimer = () => {
  totalTime = 120;
  timer = setInterval(() => {
    totalTime--;
    if (totalTime === 0) {
      // clearInterval(timer);
      endQuiz();
    }
    minute.textContent = Math.floor(totalTime / 60);
    second.textContent = Math.floor(totalTime % 60);
  }, 1000);
};
// startTimer();

const addButtonToGrid = () => {
  let button = "";
  questions.forEach((ques, index) => {
    button += `<button class="gridButton" onclick="gotoQues(${index})" >${
      index + 1
    }</button>`;
  });
  gridButtonContainer.innerHTML = button;
};
addButtonToGrid();

// to store the answer given
const mark = (number) => {
  if (answersGiven[currentQuestion] === null) {
    answersGiven[currentQuestion] = number;
    showQues();
  }
};

// to show the question every time something changes
const showQues = () => {
  questionElement.textContent =
    `${currentQuestion + 1}). ` + questions[currentQuestion].ques;
  let optionsContent = "";
  let message = "";
  questions[currentQuestion].options.forEach((option, index) => {
    if (answersGiven[currentQuestion] !== null) {
      let classes;
      let select = false;
      if (answersGiven[currentQuestion] === questions[currentQuestion].answer) {
        gridButtons[currentQuestion].classList.add("green");
      } else {
        gridButtons[currentQuestion].classList.add("red");
      }
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
  informationElement.classList.remove("none");
  gridButtonContainer.classList.add("none");
  questions = question.sort(function (a, b) {
    return 0.5 - Math.random();
  });
  addButtonToGrid();
  minute.textContent = "2";
  second.textContent = "00";
};

// to start the quiz
const startQuiz = (event) => {
  event.preventDefault();
  username = event.target[0].value;
  currentQuestion = 0;
  informationElement.classList.add("none");
  gridButtonContainer.classList.remove("none");
  startElement[0].classList.add("none");
  quizElement[0].classList.remove("none");
  showQues();
  startTimer();
};

// eventListener for form event
nameForm[0].addEventListener("submit", startQuiz);

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

// to go to a specific question number
gotoQues = (number) => {
  currentQuestion = number;
  showQues();
};

// to end the quiz and get the results
const endQuiz = () => {
  clearInterval(timer);
  let score = 0;
  questions.forEach((ques, index) => {
    if (ques.answer === answersGiven[index]) {
      score++;
    }
  });
  infoElement.textContent =
    username + ", your score is " + score + "/" + questions.length;
  timeTakenElement.textContent =
    "Time taken by you is " +
    Math.floor((120 - totalTime) / 60) +
    ":" +
    Math.floor((120 - totalTime) % 60);

  quizElement[0].classList.add("none");
  resultElement[0].classList.remove("none");
  let highestScore;
  if (localStorage.getItem("highestScore")) {
    highestScore = JSON.parse(localStorage.getItem("highestScore"));
    if (highestScore.score < score) {
      highestScore = {
        score,
        time: 120 - totalTime,
        name: username,
        date: Date.now(),
      };
      localStorage.setItem("highestScore", JSON.stringify(highestScore));
    } else if (highestScore.score === score) {
      if (highestScore.time >= 120 - totalTime) {
        highestScore = {
          score,
          time: 120 - totalTime,
          name: username,
          date: Date.now(),
        };
        localStorage.setItem("highestScore", JSON.stringify(highestScore));
      }
    }
  } else {
    highestScore = {
      score,
      time: 120 - totalTime,
      name: username,
      date: Date.now(),
    };
    localStorage.setItem("highestScore", JSON.stringify(highestScore));
  }
  let date = new Date(highestScore.date);
  dateFormat =
    date.getDate() +
    "/" +
    date.getMonth() +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes();
  highestScoreElement.innerHTML = `<div><b>Highest Score: </b></div><div>${
    highestScore.score
  }/${questions.length} by ${highestScore.name} in time ${Math.floor(
    highestScore.time / 60
  )}:${highestScore.time % 60} <br/> on ${dateFormat}</div>`;
  console.log(highestScore);
};
