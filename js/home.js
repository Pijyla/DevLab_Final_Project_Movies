//TMDB API for movies

const API_KEY = 'api_key=08beb287a4aac1ea2289c2ee16e39d87';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const API_MOST_POPULAR_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const API_BEST_MOVIES_URL = BASE_URL + '/discover/movie?sort_by=vote_average.desc&vote_count.gte=10&' + API_KEY;
const REVENUE_URL = BASE_URL + '/discover/movie?sort_by=revenue.desc&' + API_KEY;
const POPULAR_URL = BASE_URL + '/trending/movie/week?' + API_KEY
const NEWEST_URL = BASE_URL + '/movie/now_playing?' + API_KEY
const UPCOMING_URL = BASE_URL + "/movie/upcoming?" + API_KEY

const topRated = document.getElementById('top-rated')
const best = document.getElementById('best')
const slider = document.querySelector('#carousel');

///////////// Slider //////////////

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let slideIndex = 1;

function plusSlides(e) {
  let num;

  if (e.target === prevBtn) num = -1;
  if (e.target === nextBtn) num = 1;

  showSlides((slideIndex += num));
}


function showSlides(n) {
  const slides = Array.from(document.querySelectorAll(".slide"));

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach((slide) => slide.classList.remove("is-active"));
  slides[slideIndex - 1].classList.add("is-active");

}

prevBtn.addEventListener("click", plusSlides);
nextBtn.addEventListener("click", plusSlides);

getRevenueMovies(REVENUE_URL);

function getRevenueMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        if(data.results.length !== 0){
            RevenueMovies(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;

            current.innerText = currentPage;

         
        }else{
            slider.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
    })
}

function RevenueMovies(data){
    data.forEach(movie => {
        const {title, poster_path} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add("slide");
        movieEl.classList.add("fade");

        let figure = document.createElement('figure');
        figure.classList.add("slide-image");

        let img = document.createElement('img');
        img.src = IMG_URL+poster_path;

        let figcaption = document.createElement('figcaption');
        figcaption.innerHTML = title;

    
        figure.appendChild(img);
        figure.appendChild(figcaption)
        movieEl.appendChild(figure);
        slider.appendChild(movieEl);
     

    })

    document.getElementById("carousel").firstChild.classList.add('is-active');
}




///////////////////////////////////////////////////////////////////////////////////////////////////////// P A G I N A T I O N //

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
  }
})

next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
  }
})

function pageCall(page){
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
    let url = lastUrl + '&page=' + page
    getTopRatedMovies(url);
  }else{
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b
    getTopRatedMovies(url);
  }
}

getTopRatedMovies(API_URL);

function getTopRatedMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        if(data.results.length !== 0){
            TopRatedMovies(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;

            current.innerText = currentPage;

            if(currentPage <= 1){
              prev.classList.add('disabled');
              next.classList.remove('disabled')
            }else if(currentPage>= totalPages){
              prev.classList.remove('disabled');
              next.classList.add('disabled')
            }else{
              prev.classList.remove('disabled');
              next.classList.remove('disabled')
            }
        }else{
            topRated.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
    })
}

function TopRatedMovies(data){
    topRated.innerHTML = '';
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
        topRated.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
          console.log(id)
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

/////////////////////////////////////////////////////////////////////////////////////////////////////  B E S T   M O V I E S  //

getBestMovies(API_URL);

function getBestMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        bestMovies(data.results);
    })
}

function bestMovies(data){
    let movies = data.slice(0, 5);
    best.innerHTML = '';
    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('best-movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">
        <div class="best-movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="about-best-movie">
            <h3>About movie</h3>
            ${overview}
        </div>
        `
        best.appendChild(movieEl);
    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////  M O V I E   T R A I L E R S  //

const overlayContent = document.getElementById('overlay-content');
/* Open when someone clicks on the span element */
function openNav(movie) {
  let id = movie.id;
  let embed = [];
  fetch(BASE_URL + '/movie/'+id+'/videos?'+API_KEY).then(res => res.json()).then(videoData => {
    console.log(videoData);
    if(videoData){
      document.getElementById("myNav").style.width = "100%";
      if(videoData.results.length > 0){
        videoData.results.forEach((video) => {
          let {name, key, site} = video

          if(site == 'YouTube'){
            let width = document.documentElement.clientWidth
            embed.push(`
              <iframe width="${width}" height="505" src="https://www.youtube.com/embed/${key}" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          
          `)
          }
        })
        document.getElementById("overlay-content").innerHTML=embed[0]
      }
      else{
        embed=[`<h1 class="no-results">No Results Found</h1>`]
        document.getElementById("overlay-content").innerHTML=embed[0]
      }
    }
  })

  const leftArrow = document.getElementById('left-arrow')
  const rightArrow = document.getElementById('right-arrow')
  let b = 0
  leftArrow.addEventListener('click', () => {
    if(b-1<0){b=embed.length-1}
    else {b--;}
    document.getElementById("overlay-content").innerHTML=embed[b]
  })
  rightArrow.addEventListener('click', () => {
    if(b+1>= embed.length){b=0;}
    else {b++;}
    document.getElementById("overlay-content").innerHTML=embed[b]})
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  document.getElementById("overlay-content").innerHTML=''
}
