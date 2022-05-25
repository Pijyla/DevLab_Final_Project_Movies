//TMDB API for movies

const API_KEY = 'api_key=08beb287a4aac1ea2289c2ee16e39d87';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const API_MOST_POPULAR_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const API_BEST_MOVIES_URL = BASE_URL + '/discover/movie?sort_by=vote_average.desc&vote_count.gte=10&' + API_KEY;

const topRated = document.getElementById('top-rated')
const best = document.getElementById('best')

getTopRatedMovies(API_URL);

function getTopRatedMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        TopRatedMovies(data.results);
    })
}

function TopRatedMovies(data){
    topRated.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
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
        </div>
        `
        topRated.appendChild(movieEl);
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
    best.innerHTML = '';
    data.forEach(movie => {
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
