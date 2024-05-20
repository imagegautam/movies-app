const apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const searchAPi = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector("#main");
const search = document.getElementById('search');

const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results); // Pass the results to the showMovies function
};

const showMovies = (movies) => {
    main.innerHTML = "";
    movies.forEach((movie) => {
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
            <img src="${IMGPATH + movie.poster_path}" alt="${movie.original_title}" />
            <div class="overlay">
                <div class="title">
                    <h2>${movie.original_title}</h2>
                    <span>${movie.vote_average}</span>
                </div>
                <h3>Overview: </h3>
                <p>${movie.overview}</p>
            </div>`;
        main.appendChild(box);
    });
};

search.addEventListener("keyup", function (event) {
    const searchTerm = event.target.value;
    if (searchTerm !== "") {
        getMovies(searchAPi + searchTerm);
    } else {
        getMovies(apiUrl);
    }
});

// Initial load of popular movies
getMovies(apiUrl);
