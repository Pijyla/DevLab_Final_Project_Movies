let displayQuestion = document.querySelector('.question');
let nextQuestion = document.querySelector('.nextQuestion');
let answersBox = document.querySelector('.answers-box');
let currentQUestion = 0;
let quizBox = document.querySelector('.box');
var resetBtn = document.createElement('button');
let finalSC = document.createElement('h1');
var genre;
var important;
var duration;
var mark;
const API_KEY = 'api_key=08beb287a4aac1ea2289c2ee16e39d87';
const BASE_URL = 'https://api.themoviedb.org/3';
let API_URL = BASE_URL + '/discover/movie?' + API_KEY + "&" + genre + important + duration;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
main = document.querySelector('.about-section');

//Pitanja i ponudjeni odgovori
let questions = [{
  question: '1:Whats your favorite genre?',
  answers: [{
      value: 'History/Drama',
    },
    {
      value: 'Comedy/Adventure',
    },
    {
      value: 'Action/Thriller',
    },
    {
      value: 'Horror/Mistery',
    }
  ]

},
{
  question: '2:Whats the most important thing in searching for a movie?',

  answers: [{
      value: 'Popularity',
    },
    {
      value: 'Release date',
    },
    {
      value: 'Revenue',
    },
    {
      value: 'Average vote',
    }


  ]

},
{
  question: '3:Do you prefer longer or shorter movies?',

  answers: [{
      value: 'Longer',
    },
    {
      value: 'Shorter',
    }


  ]

}
];



function getAnswers(currentQUestion) {
  
  //kada dodje do kraja pitanja 
  if (currentQUestion >= questions.length) {
    currentQUestion = 0;
   main.innerHTML = '';
   go();
   getMovies(API_URL);
  }


function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        if(data.results.length !== 0){
            showMovies(data.results);
        }
    })
}

function showMovies(data){
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="about-movie">
            <h3>About movie</h3>
            ${overview}
            <br/> 
            <button class="watch-trailer" id="${id}">Watch trailer</button>
        </div>
        `
        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
          openNav(movie)
        })
    })
}

function getColor(vote){
    if(vote>=8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }
}

  removeLastQuestion();
  displayQuestion.innerText = questions[currentQUestion].question;
  questions[currentQUestion].answers.forEach((answer) => {
      const btn = document.createElement('button');
      btn.classList.add('answer')
      btn.innerText = answer.value;
      answersBox.appendChild(btn);
      btn.onclick = checkAnswer;
    }
  )
}

function removeLastQuestion() {
  while (answersBox.firstChild) {
    answersBox.removeChild(answersBox.lastChild);
  }
}


// Provjera odgovora i appendanje varijabli u zavisnosti od odgovora
function checkAnswer(e) {

  let ans = document.querySelectorAll('.answer');

  if (e.target.matches('.answer')) {
    ans.forEach((ans) => ans.classList.remove('orange'))
    this.classList.add('orange');
  } 

  if (e.target.innerText == "History/Drama") {
genre = "with_genres=36,18&"
  }  else if (e.target.innerText == "Comedy/Adventure") {
    genre = "with_genres=12,35&"
  } else if (e.target.innerText == "Action/Thriller") {
    genre = "with_genres=28,53&"
  } else if (e.target.innerText == "Horror/Mistery") {
    genre = "with_genres=27,9648&"
  }
  
  if (e.target.innerText == "Popularity") {
    important = "sort_by=popularity.desc&"
  } else if (e.target.innerText == "Release date") {
    important = "sort_by=release_date.desc&"
  } else if (e.target.innerText == "Revenue") {
    important = "sort_by=revenue.desc&"
  } else if (e.target.innerText == "Average vote") {
    important = "sort_by=vote_average.desc&"
  } 
  
  if (e.target.innerText == "Longer") {
    duration = "with_runtime.gte=80&"
  } else if (e.target.innerText == "Shorter") {
    duration = "with_runtime.lte=80&"
  }
}


//Sledece pitanje
nextQuestion.addEventListener('click', () => {

  nextQuestion.innerText = 'Next question'
  getAnswers(currentQUestion);
  currentQUestion += 1;
});

resetBtn.addEventListener('click', () => {

currentQUestion=0;
  finalSC.remove();
  resetBtn.remove();
  quizBox.append(displayQuestion);
  quizBox.append(answersBox);
  quizBox.append(nextQuestion);
});


// Izmjena API-ja
function go() {
API_URL = BASE_URL + '/discover/movie?' + API_KEY +"&" + genre + important + duration;
}