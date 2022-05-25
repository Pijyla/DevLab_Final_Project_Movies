const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {

    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");

  });

}

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

  window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");

});

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");

});

// Kviz

const quizData = [{
  question: "Omiljeni zanr?",
  a: "Horor",
  b: "Akcija",
  c: "Drama",
  d: "Triler",
}, {
  question: "Omiljena era?",
  a: "Prije 2000",
  b: "2000-2010",
  c: "2010-2020",
  d: "Posle 2020",
}, {
  question: "Omiljena duzina filma?",
  a: "Kratki filmovi (ispod 60 min)",
  b: "Uobicajeni filmovi (60 do 90 min)",
  c: "Malo duzi filmovi (90 do 120 min)",
  d: "Dugometrazni filmovi (preko 120 min)",
}, {
  question: "Rejting filmova?",
  a: "1-3",
  b: "3-5",
  c: "5-7",
  d: "7-10",
}
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz(){
deselectAnswer();

const currentQuizData = quizData[currentQuiz];

questionEl.innerText = currentQuizData.question;
a_text.innerText = currentQuizData.a;
b_text.innerText = currentQuizData.b;
c_text.innerText = currentQuizData.c;
d_text.innerText = currentQuizData.d;
}

function deselectAnswer() {
answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
let answer;

answerEls.forEach(answerEl => {
  if(answerEl.checked) {
     answer = answerEl.id;
  }
});

return answer;
}

submitBtn.addEventListener('click', () => {
const answer = getSelected();

if(answer) {

  if (answer === "a") {
    console.log("a");
  } else if (answer === "b") {
    console.log("b");
  } else if (answer === "c") {
    console.log("c");
  } else if (answer === "d") {
    console.log("d");
  } 
  

  currentQuiz++;

  if(currentQuiz < quizData.length){
      loadQuiz();
  } else { 
      quiz.innerHTML = `
      <h2>Sad na kraju dodat izbacene filmove</h2>

      <button onclick="location.reload()">
      Reload
      </button>
      `
  }
}
})
