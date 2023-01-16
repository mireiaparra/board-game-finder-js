"use strict";

//Función base para pintar los elementos de las listas con DOM avanzado
function paintCharacters(charactersData, list, className) {
  for (let i = 0; i < charactersData.length; i++) {
    const liElement = document.createElement("li");
    const articleElement = document.createElement("article");
    articleElement.classList.add(className);
    articleElement.setAttribute("id", `${charactersData[i].id}`);

    const imgElement = document.createElement("img");
    imgElement.src = `${charactersData[i].image_url}`;
    imgElement.alt = `Photo of ${charactersData[i].name}`;
    imgElement.style.height = "150px";
    imgElement.style.width = "120px";
    articleElement.appendChild(imgElement);

    const titleElement = document.createElement("h2");
    articleElement.appendChild(titleElement);
    const textElement = document.createElement("p");
    articleElement.appendChild(textElement);

    liElement.appendChild(articleElement);
    list.appendChild(liElement);

    const nameText = document.createTextNode(`${charactersData[i].name}`);
    titleElement.appendChild(nameText);

    const statusText = document.createTextNode(`${charactersData[i].type}`);
    textElement.appendChild(statusText);

    if (charactersData[i].player_counts){
    const chAppArr = charactersData[i].player_counts;
    const chApp = chAppArr.join(",");
    const ulApp = document.createElement("ul");
    const pApp = document.createElement("p");

    const pAppText = document.createTextNode(chApp);
    pApp.appendChild(pAppText);
    ulApp.appendChild(pApp);

    articleElement.appendChild(ulApp);
    }
  }
}

//Obtener los personajes de la API
function getCharacters() {
  fetch("https://api.boardgameatlas.com/api/search?order_by=popularity&client_id=fedCzdzOWG")
    .then((response) => response.json())
    .then((data) => {
      characters = data.games;
      paintCharacters(characters, allList, "allCharacters__list--article");
      const allListChildren = allList.children;
      setEventClick(allListChildren)
      paintLocalSt();
    });
}

function setEventClick(list){
  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener("click", handleClickFav);
  }
}

// Al cargar la página
getCharacters();
createReset();