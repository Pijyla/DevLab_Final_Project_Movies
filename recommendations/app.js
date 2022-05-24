const API_KEY = "api_key=08beb287a4aac1ea2289c2ee16e39d87";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500"
const form = document.getElementById("form");
const input = document.getElementById("search_name");
const messageDiv = document.getElementById('warning');
const searchedMovie = document.getElementById('movie_search');
const similarMovies = document.getElementById('similar_movies');
const searchDropdown = document.getElementById('search_dropdown');

input.addEventListener("keyup",()=>{
    let searchTerm = input.value;
    let txt = ''
    searchDropdown.innerHTML = txt
    if(!searchTerm)return
    fetch(`${BASE_URL}search/movie?${API_KEY}&language=en-US&query=${searchTerm.trim()}`)
    .then(data=>data.json()).then(data=>{
        data.results.map(item=>{
            txt+=`<div onclick= titleSelected(${item.id})>
                    <img src="${IMAGE_PATH}${item.poster_path||item.backdrop_path}">
                    <span>${item.title}</span>
                </div>`})
    searchDropdown.innerHTML = txt
    if(data.results.length == 0 ){
        messageDiv.classList.remove("invisible");
        searchDropdown.innerHTML = '';

    }
    })
}) 

function titleSelected(id){
    window.scrollTo(0,0);
    messageDiv.classList.add("invisible");
    searchedMovie.classList.remove("invisible");
    input.value = '';
    searchDropdown.innerHTML=''
    fetch(`${BASE_URL}/movie/${id}?${API_KEY}`)
    .then(data=>data.json()).then(data=>
        {console.log(data);
        searchedMovie.innerHTML = `
         <img src="${IMAGE_PATH}${data.poster_path||data.backdrop_path}">
         <div>
            <p>Adult: ${data.adult} Budget: ${data.budget}</p>
            <p>Genres: ${String(data.genres.name)}</p>
            <p>${data.title} <span>${data.vote_average}</span></p>
            <p>${data.overview}</p>
            <p>${data.release_date}</p>
        </div>`});
    similarMoviesFiller(id)

}

function similarMoviesFiller(movie_id){
    fetch(`${BASE_URL}/movie/${movie_id}/similar?${API_KEY}`)
    .then(data=>data.json())
    .then(data =>{let text = '';
    data.results.forEach(item =>{text+=`
    <div onclick=titleSelected(${item.id}) class="similar_div">
    <img src="${IMAGE_PATH}${item.poster_path||item.backdrop_path}">
    <div>
        <p>${item.title}</p>
        <p>${item.overview}</p>
    </div>
</div>`})
similarMovies.innerHTML=text
        })
}
