function showForm() {
	const search = location.search.slice(1).split("&");

	const movie = {};

	search.forEach((element) => {
		const data = element.split("=");

		movie[data[0]] = decodeURIComponent(data[1]);
	});

	const form = document.querySelector(".dsmovie-form");

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		location.href = "https://analtfernandes.github.io/dsmovie";
	});

	const formElement =
		"#dsmovie-form-section .dsmovie-form-container div .dsmovie-card";

	document.querySelector(`${formElement} img`).setAttribute("src", movie.image);

	document.querySelector(
		`${formElement} .dsmovie-form-description h3`
	).innerHTML = movie.name;
}

showForm();
