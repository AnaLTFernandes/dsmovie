import { films } from "../database/films.js";

pagination();

function pagination() {
	const filmsPerPage = 8;
	const pagesTotal = films.length / filmsPerPage;

	const page = Number(location.search?.slice(6));

	let currentPage = page || 1;

	setPaginationArrows(pagesTotal, currentPage);

	document.querySelector(
		".dsmovie-pagination-box p"
	).innerHTML = `${currentPage} de ${pagesTotal}`;

	const start = (currentPage - 1) * filmsPerPage;
	const end = currentPage * filmsPerPage;

	showMovies(films.slice(start, end));
}

function setPaginationArrows(pagesTotal, currentPage) {
	const backPage = document.querySelector(".dsmovie-pagination-box button");
	const nextPage = document.querySelector(
		".dsmovie-pagination-box button.dsmovie-flip-horizontal"
	);

	if (pagesTotal === 1) {
		nextPage.setAttribute("disabled", true);
		backPage.setAttribute("disabled", true);
	} else if (currentPage >= pagesTotal) {
		nextPage.setAttribute("disabled", true);
	} else if (currentPage <= 1) {
		backPage.setAttribute("disabled", true);
	}

	backPage.addEventListener("click", (e) => {
		e.preventDefault();
		location.href = `https://analtfernandes.github.io/dsmovie?page=${currentPage - 1}`;
	});

	nextPage.addEventListener("click", (e) => {
		e.preventDefault();
		location.href = `https://analtfernandes.github.io/dsmovie?page=${currentPage + 1}`;
	});
}

function showMovies(movies) {
	document.querySelector("#dsmovie-card-list .row").innerHTML = "";

	for (let i = 0; i < movies.length; i++) {
		showFilmCard(movies[i]);
	}
}

function showFilmCard(movie) {
	document.querySelector("#dsmovie-card-list .row").innerHTML += `
        <div class="col-sm-6 col-lg-4 col-xl-3 mb-3">
            <div class="dsmovie-card">
                <img
                    src=${movie.image}
                    alt=${movie.name}
                />
                <div class="dsmovie-card-description">
                    <h3>${movie.name}</h3>
                    <div class="dsmovie-card-description-bottom">
                        <h4>${movie.grade}</h4>
                        <div>
                            <img src="img/star-full.svg" alt="Star" />
                            <img src="img/star-full.svg" alt="Star" />
                            <img src="img/star-full.svg" alt="Star" />
                            <img src="img/star-half.svg" alt="Star" />
                            <img src="img/star-empty.svg" alt="Star" />
                        </div>
                        <p>${movie.reviews}</p>
                        <a class="dsmovie-btn" href="form.html?name=${movie.name}&image=${movie.image}">Avaliar</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}
