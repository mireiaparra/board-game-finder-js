"use strict";

//Función base para pintar los elementos de las listas con DOM avanzado
function paintCharacters(charactersData, list, className) {
  for (let i = 0; i < charactersData.length; i++) {
    const liElement = document.createElement("li");
    const articleElement = document.createElement("article");
    articleElement.classList.add(className);
    articleElement.setAttribute("id", `${charactersData[i].char_id}`);

    const imgElement = document.createElement("img");
    imgElement.src = `${charactersData[i].img}`;
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

    const statusText = document.createTextNode(`${charactersData[i].status}`);
    textElement.appendChild(statusText);

    const chAppArr = charactersData[i].appearance;
    const chApp = chAppArr.join(",");

 

    const ulApp = document.createElement("ul");
    const pApp = document.createElement("p");

    const pAppText = document.createTextNode(chApp);
    pApp.appendChild(pAppText);
    ulApp.appendChild(pApp);

    articleElement.appendChild(ulApp);

      if (chAppArr.length === 5) {
      const allSeasons = document.createElement("p");
      const allSeasonsText = document.createTextNode("Es un súperpersonaje")
      allSeasons.appendChild(allSeasonsText);
      articleElement.appendChild(allSeasons);
    }
  }
}

//Obtener los personajes de la API
function getCharacters() {
  fetch("./assets/data/characters.json")
    .then((response) => response.json())
    .then((data) => {
      characters = data;
      paintCharacters(data, allList, "allCharacters__list--article");
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