"use strict";
const allList = document.querySelector(".js-allCharactersList");
const favList = document.querySelector(".js-favCharactersList");
const favSection = document.querySelector(".js-favSection");
const searchBtn = document.querySelector(".js-searchBtn");
const searchInput = document.querySelector(".js-searchInput");
const container = document.querySelector(".js-main");
const logBtn = document.querySelector(".js-LogBtn");

let characters = [];
let favCharacters = [];
let favsLocal = JSON.parse(localStorage.getItem("favChars"));

"use strict";
function handleClickSearch(ev) {
  ev.preventDefault();

  //Filtrar objetos por nombre y estado según lo introducido en el input de búsqueda. Concatenar los resultados en un nuevo array
  const searchCharactersName = characters.filter((eachCharacter) =>
    eachCharacter.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  const searchCharactersStatus = characters.filter((eachCharacter) =>
    eachCharacter.status.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  let filteredCharacters = searchCharactersName.concat(searchCharactersStatus);

  //Pintar los resultados
  allList.innerHTML = "";
  paintCharacters(filteredCharacters, allList, "allCharacters__list--article");

  //Estilizar los resultados según si son favoritos o no
  const filteredChildrenLi = allList.children;
  setEventClick(filteredChildrenLi);
  for (let i = 0; i < filteredChildrenLi.length; i++) {
    filteredChildrenLi[i].addEventListener("click", handleClickFav);

    //Article de cada elemento de la lista de filtrados
    const eachFiltered = filteredChildrenLi[i].firstChild;

    if (favCharacters !== null && favCharacters !== []) {
    //Esto da el index del objeto de favoritos que tenga un id igual al del resultado de la búsqueda
    const findSearchIndex = favCharacters.findIndex((eachChar) => eachChar.char_id == parseInt(eachFiltered.id));
    
    //Comprobar si el objeto de la búsqueda estaba en el array de favoritos o no
    if (findSearchIndex !== -1) {
        eachFiltered.classList.add("favsCharacters__list--article");
      } else {
        eachFiltered.classList.add("allCharacters__list--article");
      }
    }
  }
}

searchBtn.addEventListener("click", handleClickSearch);

"use strict";
function paintFav(ev) {
  //Esto da el article padre del elemento sobre el que se haya hecho click
  let favElement = ev.target.parentElement;
  favElement.classList.add("favsCharacters__list--article");

  //Encontrar el objeto que tenga el mismo id que el article sobre el que se ha hecho click
  const findFav = characters.find((eachChar) => eachChar.char_id == parseInt(favElement.id));

  //Encontrar la posición del objeto en el que he hecho click en el array de favoritos
  const isFavIndex = favCharacters.findIndex((eachFav) => eachFav.char_id == parseInt(favElement.id));

  //Comprobar si el objeto NO estaba en el array y añadirlo o quitarlo si SÍ estaba
  if (isFavIndex === -1) {
    favCharacters.push(findFav);
  } else {
    favCharacters.splice(isFavIndex, 1);
    favElement.classList.remove("favsCharacters__list--article");
  }
  updateFavList();
}

function updateFavList() {
  favList.innerHTML = "";
  //Ocultar la sección de favoritos si está vacía y vaciar LS
  if (favCharacters.length === 0 || favCharacters === null) {
    favSection.classList.add("hidden");
    favSection.classList.remove("favsCharacters");
    container.classList.remove("main");
    removeLocalSt();
  
  //Mostrar y estilizar la sección de favoritos si NO está vacía y guardar en LS
  } else {
    favSection.classList.remove("hidden");
    favSection.classList.add("favsCharacters");
    paintCharacters(favCharacters, favList, "favsCharacters__list--articleBtn");
    styleFav();
    setLocalSt();
  }
}

function styleFav() {
  container.classList.add("main");
  const favArticles = document.querySelectorAll(".favsCharacters__list--articleBtn");
  //Localizar cada article de la lista de favoritos para añadirle una X
  for (const favArticle of favArticles) {
    const removeFavBtn = document.createElement("p");
    removeFavBtn.classList.add("removeFav");
    removeFavBtn.addEventListener("click", handleClickRemove);
    const removeFavText = document.createTextNode("X");
    removeFavBtn.appendChild(removeFavText);
    favArticle.appendChild(removeFavBtn);
  }
}

function handleClickRemove(ev) {
  ev.preventDefault();
  //Encontrar el article padre de la X en la que se hace click, encontrar el objeto con el mismo id de la lista de favoritos y eliminarlo
  const isFavIndex = favCharacters.findIndex((eachFav) => eachFav.char_id == parseInt(ev.target.parentElement.id));
  favCharacters.splice(isFavIndex, 1);

  //Encontrar el article padre de la X en la que se hace click, encontrar el article con el mismo id en la lista general y cambiarle el estilo
  const allLi = allList.children;
  const allLiArr = Array.prototype.slice.call(allLi);

  const oldFavCharacterLi = allLiArr.find((eachLi) => eachLi.firstChild.id == parseInt(ev.target.parentElement.id));
  oldFavCharacterLi.firstChild.classList.remove("favsCharacters__list--article");

  updateFavList();
}

function handleClickFav(ev) {
  ev.preventDefault();
  paintFav(ev);
}

logBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  console.log(`Tienes ${favCharacters.length} favoritos`);
});
"use strict";
function setLocalSt() {
  localStorage.setItem("favChars", JSON.stringify(favCharacters));
}
function removeLocalSt() {
  localStorage.removeItem("favChars");
}

function paintLocalSt() {
  //Mostrar elementos favoritos desde el LS si existe
  if (favsLocal !== null && favsLocal !== []) {
    favSection.classList.remove("hidden");
    favSection.classList.add("favsCharacters");
    favCharacters = favsLocal;
    paintCharacters(favsLocal, favList, "favsCharacters__list--articleBtn");
    styleFav();

    const allCharactersLi = allList.children;

    //Recorrer cada article de la lista general
    for (let i = 0; i < allCharactersLi.length; i++) {
      const eachArticle = allCharactersLi[i].firstChild;
    //Encontrar la posición de los objetos de favoritos que tengan un id igual a los articles de la lista general
      const findArticleIndex = favCharacters.findIndex((eachChar) => eachChar.char_id == parseInt(eachArticle.id));

      //Comprobar si el objeto está en el array de favoritos
      if (findArticleIndex !== -1) {
        eachArticle.classList.add("favsCharacters__list--article");
      } 
    }
  }
}

"use strict";
function createReset() {
  const resetBtn = document.createElement("button");
  const resetText = document.createTextNode("Delete All");
  resetBtn.appendChild(resetText);
  resetBtn.classList.add("favsCharacters__reset");
  favSection.appendChild(resetBtn);
  resetBtn.addEventListener("click", handleClickReset);
}

function handleClickReset() {
  favCharacters = [];
  favList.innerHTML = "";
  favSection.classList.add("hidden");
  favSection.classList.remove("favsCharacters");
  container.classList.remove("main");
  removeLocalSt();

  //Eliminar la clase de favoritos de cada article de la lista general
  for (const eachLi of allList.children) {
    eachLi.firstChild.classList.remove("favsCharacters__list--article");
  }
}

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
//# sourceMappingURL=main.js.map
