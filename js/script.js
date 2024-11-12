const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");
const characterList = document.getElementById("character-list");

let currentPage = 1;

function fetchCharacters(page) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("La solicitud no fue exitosa");
            }
            return response.json();
        })
        .then((data) => {
            characterList.innerHTML = ""; // Limpiar el contenido antes de añadir los nuevos personajes
            data.results.forEach(character => {
                const characterCard = document.createElement("div");
                characterCard.classList.add("character-card");

                characterCard.innerHTML = `
                    <img src="${character.image}" alt="${character.name}">
                    <p>Name: ${character.name}</p>
                    <p>Species: ${character.species}</p>
                `;
                characterList.appendChild(characterCard);
            });
        })
        .catch((error) => {
            characterList.innerText = "Error: no se pudo obtener la información";
        });
}

// Cargar los personajes de la página actual al cargar la página
fetchCharacters(currentPage);

prevPage.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(currentPage);
    }
});

nextPage.addEventListener("click", () => {
    currentPage++;
    fetchCharacters(currentPage);
});