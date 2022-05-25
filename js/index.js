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


// Api

//TMDB API for movies

const API_KEY = 'api_key=08beb287a4aac1ea2289c2ee16e39d87';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const API_MOST_POPULAR_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const API_BEST_MOVIES_URL = BASE_URL + '/discover/movie?sort_by=vote_average.desc&vote_count.gte=10&' + API_KEY;
const API_BEST_SERIES_URL = BASE_URL + '/discover/tv?sort_by=vote_average.desc&vote_count.gte=10&' + API_KEY;

const topRated = document.getElementById('top-rated')
const best = document.getElementById('best')

getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data){
    topRated.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, release_date} = movie;
        const li = document.createElement('li');
        li.innerHTML = `
        
<div class="movie-card">

  <a href="./movie-details.html">
    <figure class="card-banner">
      <img src="${IMG_URL+poster_path}" alt="${title}">
    </figure>
  </a>

  <div class="title-wrapper">
    <a href="./movie-details.html">
      <h3 class="card-title">${title}</h3>
    </a>

    <time datetime="2022">${release_date}</time>
  </div>

  <div class="card-meta">
    <div class="badge badge-outline">HD</div>

    <div class="duration">
      <ion-icon name="time-outline"></ion-icon>

      <time datetime="PT137M">137 min</time>
    </div>

    <div class="rating">
      <ion-icon name="star"></ion-icon>

      <data>${vote_average}</data>
    </div>
  </div>

</div>

        `
        topRated.appendChild(li);
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

getBestMovies(API_BEST_MOVIES_URL);

function getBestMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        bestMovies(data.results);
    })
}

function bestMovies(data){
  list = document.querySelector("#bestList");
  console.log(list);
    list.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, release_date} = movie;
        const li = document.createElement('li');
        li.innerHTML = `
        
<div class="movie-card">

  <a href="./movie-details.html">
    <figure class="card-banner">
      <img src="${IMG_URL+poster_path}" alt="${title}">
    </figure>
  </a>

  <div class="title-wrapper">
    <a href="./movie-details.html">
      <h3 class="card-title">${title}</h3>
    </a>

    <time datetime="2022">${release_date}</time>
  </div>

  <div class="card-meta">
    <div class="badge badge-outline">HD</div>

    <div class="duration">
      <ion-icon name="time-outline"></ion-icon>

      <time datetime="PT137M">137 min</time>
    </div>

    <div class="rating">
      <ion-icon name="star"></ion-icon>

      <data>${vote_average}</data>
    </div>
  </div>

</div>

        `
        list.appendChild(li);
    })
}


// SERIJE


getBestShows(API_BEST_SERIES_URL);

function getBestShows(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        bestShows(data.results);
    })
}

function bestShows(data){
  list = document.querySelector("#bestListSeries");
  console.log(list);
    list.innerHTML = '';
    data.forEach(movie => {
        const {name, poster_path, vote_average, overview, first_air_date} = movie;
        const li = document.createElement('li');
        li.innerHTML = `
        
<div class="movie-card">

  <a href="./movie-details.html">
    <figure class="card-banner">
      <img src="${IMG_URL+poster_path}" alt="${name}">
    </figure>
  </a>

  <div class="title-wrapper">
    <a href="./movie-details.html">
      <h3 class="card-title">${name}</h3>
    </a>

    <time datetime="2022">${first_air_date}</time>
  </div>

  <div class="card-meta">
    <div class="badge badge-outline">HD</div>

    <div class="duration">
      <ion-icon name="time-outline"></ion-icon>

      <time datetime="PT137M">137 min</time>
    </div>

    <div class="rating">
      <ion-icon name="star"></ion-icon>

      <data>${vote_average}</data>
    </div>
  </div>

</div>

        `
        list.appendChild(li);
    })
}



