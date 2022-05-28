//TMDB API for movies

const API_KEY = 'api_key=08beb287a4aac1ea2289c2ee16e39d87';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const POPULAR_URL = BASE_URL + '/trending/movie/week?' + API_KEY
const NEWEST_URL = BASE_URL + '/movie/now_playing?' + API_KEY
const UPCOMING_URL = BASE_URL + "/movie/upcoming?" + API_KEY
const SEARCH_URL = `${BASE_URL}/search/movie?${API_KEY}&language=en-US&query=`

///////////////////////////////////////////////////////////////////////////////////////  M O V I E S   A N D   P A G I N A T I O N  //
const main = document.getElementById('main')
const searchParam = document.getElementById("search_param")
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

const newest_movies = document.getElementById("newest_movies");
const popular_movies = document.getElementById("popular_movies");
const upcoming_movies = document.getElementById("upcoming_movies")
<<<<<<< HEAD:js/categories.js

=======
>>>>>>> c1b6a3d14ceec8fbfb83b4d21115cb8cf1d4c823:categories.js
popular_movies.addEventListener("click",()=>{
  getMovies(POPULAR_URL);
  setGenre()
})

newest_movies.addEventListener("click",()=>{
  getMovies(NEWEST_URL);
  setGenre()
<<<<<<< HEAD:js/categories.js
=======


>>>>>>> c1b6a3d14ceec8fbfb83b4d21115cb8cf1d4c823:categories.js
})

upcoming_movies.addEventListener("click",()=>{
  getMovies(UPCOMING_URL);
  setGenre()
})

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
    let url = lastUrl + '&page='+page
    getMovies(url);
  }else{
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b
    getMovies(url);
  }
}

getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showMovies(data.results);
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
            tagsEl.scrollIntoView({behavior : 'smooth'})
        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  S E A R C H  //
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const form =  document.querySelector('.searchForm');
const search = document.getElementById('search_param');
const tagsEl = document.getElementById('tags');

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

var selectedGenre = []
setGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length === 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id === genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsEl.append(t);
    })
}

function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn()
    if(selectedGenre.length !== 0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }

}

function clearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('highlight')
    }else{
            
        let clear = document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();            
            getMovies(API_URL);
        })
        tagsEl.append(clear);
    }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  console.log(SEARCH_URL+searchTerm)
  selectedGenre=[];
  setGenre();
  if(searchTerm) {
      getMovies(SEARCH_URL+searchTerm)
  }else{
      getMovies(API_URL);
  }
})

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

const newest = document.getElementById("newest_movies");
const popular = document.getElementById("popular_movies");

popular.addEventListener("click",()=>{
  console.log("Tu si stigao")
  getMovies(POPULAR_URL)
})

console.log(document.getElementById("popular_movies"))
