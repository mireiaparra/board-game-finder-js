"use strict";
const allList = document.querySelector(".js-allBoardGamesList");
const favList = document.querySelector(".js-favBoardGamesList");
const favSection = document.querySelector(".js-favSection");
const searchBtn = document.querySelector(".js-searchBtn");
const searchInput = document.querySelector(".js-searchInput");
const container = document.querySelector(".js-main");
const logBtn = document.querySelector(".js-LogBtn");

let BoardGames = [];
let favBoardGames = [];
let favsLocal = JSON.parse(localStorage.getItem("favChars"));

"use strict";
function handleClickSearch(ev) {
  ev.preventDefault();

  //Filtrar objetos por nombre y estado según lo introducido en el input de búsqueda. Concatenar los resultados en un nuevo array
  const searchBoardGamesName = BoardGames.filter((eachBoardGame) =>
    eachBoardGame.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  const searchBoardGamesStatus = BoardGames.filter((eachBoardGame) =>
    eachBoardGame.type.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  let filteredBoardGames = searchBoardGamesName.concat(searchBoardGamesStatus);

  //Pintar los resultados
  allList.innerHTML = "";
  paintBoardGames(filteredBoardGames, allList, "allBoardGames__list--article");

  //Estilizar los resultados según si son favoritos o no
  const filteredChildrenLi = allList.children;
  setEventClick(filteredChildrenLi);
  for (let i = 0; i < filteredChildrenLi.length; i++) {
    filteredChildrenLi[i].addEventListener("click", handleClickFav);

    //Article de cada elemento de la lista de filtrados
    const eachFiltered = filteredChildrenLi[i].firstChild;

    if (favBoardGames !== null && favBoardGames !== []) {
    //Esto da el index del objeto de favoritos que tenga un id igual al del resultado de la búsqueda
    const findSearchIndex = favBoardGames.findIndex((eachChar) => eachChar.char_id == parseInt(eachFiltered.id));
    
    //Comprobar si el objeto de la búsqueda estaba en el array de favoritos o no
    if (findSearchIndex !== -1) {
        eachFiltered.classList.add("favsBoardGames__list--article");
      } else {
        eachFiltered.classList.add("allBoardGames__list--article");
      }
    }
  }
}

searchBtn.addEventListener("click", handleClickSearch);

"use strict";
function paintFav(ev) {
  //Esto da el article padre del elemento sobre el que se haya hecho click
  let favElement = ev.currentTarget.firstChild;
  favElement.classList.add("favsBoardGames__list--article");

  //Encontrar el objeto que tenga el mismo id que el article sobre el que se ha hecho click
  const findFav = BoardGames.find((eachChar) => eachChar.id === (favElement.id));

  //Encontrar la posición del objeto en el que he hecho click en el array de favoritos
  const isFavIndex = favBoardGames.findIndex((eachFav) => eachFav.id === (favElement.id));

  //Comprobar si el objeto NO estaba en el array y añadirlo o quitarlo si SÍ estaba
  if (isFavIndex === -1) {
    favBoardGames.push(findFav);
  } else {
    favBoardGames.splice(isFavIndex, 1);
    favElement.classList.remove("favsBoardGames__list--article");
  }
  updateFavList();
}

function updateFavList() {
  favList.innerHTML = "";
  //Ocultar la sección de favoritos si está vacía y vaciar LS
  if (favBoardGames.length === 0 || favBoardGames === null) {
    favSection.classList.add("hidden");
    favSection.classList.remove("favsBoardGames");
    container.classList.remove("main");
    removeLocalSt();
  
  //Mostrar y estilizar la sección de favoritos si NO está vacía y guardar en LS
  } else {
    favSection.classList.remove("hidden");
    favSection.classList.add("favsBoardGames");
    paintBoardGames(favBoardGames, favList, "favsBoardGames__list--articleBtn");
    askRate();
    styleFav();
    setLocalSt();
  }
}

function styleFav() {
  container.classList.add("main");
  const favArticles = document.querySelectorAll(".favsBoardGames__list--articleBtn");
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
  const isFavIndex = favBoardGames.findIndex((eachFav) => eachFav.id === (ev.target.parentElement.id));
  favBoardGames.splice(isFavIndex, 1);

  // //Encontrar el article padre de la X en la que se hace click, encontrar el article con el mismo id en la lista general y cambiarle el estilo
  const allLi = allList.children;
  const allLiArr = Array.prototype.slice.call(allLi);
  const oldFavBoardGameLi = allLiArr.find((eachLi) => eachLi.firstChild.id === (ev.target.parentElement.id));
  oldFavBoardGameLi.firstChild.classList.remove("favsBoardGames__list--article");
  updateFavList();
}

function handleClickFav(ev) {
  ev.preventDefault();
  paintFav(ev);
}

"use strict";
function setLocalSt() {
  localStorage.setItem("favChars", JSON.stringify(favBoardGames));
}
function removeLocalSt() {
  localStorage.removeItem("favChars");
}

function paintLocalSt() {
  //Mostrar elementos favoritos desde el LS si existe
  if (favsLocal !== null && favsLocal.length > 0) {
    favSection.classList.remove("hidden");
    favSection.classList.add("favsBoardGames");
    favBoardGames = favsLocal;
    paintBoardGames(favsLocal, favList, "favsBoardGames__list--articleBtn");
    styleFav();
    askRate();

    const allBoardGamesLi = allList.children;

    //Recorrer cada article de la lista general
    for (let i = 0; i < allBoardGamesLi.length; i++) {
      const eachArticle = allBoardGamesLi[i].firstChild;
    //Encontrar la posición de los objetos de favoritos que tengan un id igual a los articles de la lista general
      const findArticleIndex = favBoardGames.findIndex((eachChar) => eachChar.id === (eachArticle.id));

      //Comprobar si el objeto está en el array de favoritos
      if (findArticleIndex !== -1) {
        eachArticle.classList.add("favsBoardGames__list--article");
      } 
    }
  }
}

"use strict";
function createReset() {
  const resetBtn = document.createElement("button");
  const resetText = document.createTextNode("Delete All");
  resetBtn.appendChild(resetText);
  resetBtn.classList.add("favsBoardGames__reset");
  favSection.appendChild(resetBtn);
  resetBtn.addEventListener("click", handleClickReset);
}

function handleClickReset() {
  favBoardGames = [];
  favList.innerHTML = "";
  favSection.classList.add("hidden");
  favSection.classList.remove("favsBoardGames");
  container.classList.remove("main");
  removeLocalSt();

  //Eliminar la clase de favoritos de cada article de la lista general
  for (const eachLi of allList.children) {
    eachLi.firstChild.classList.remove("favsBoardGames__list--article");
  }
}

function askRate() {
    const favBoardGamesNL = document.querySelectorAll(".favsBoardGames__list--articleBtn");
    const favBoardGames = Array.from(favBoardGamesNL);
    
    for (const eachArticle of favBoardGames) {
   
        const eachFiltered = favBoardGames.find((eachBoardGame) => eachArticle.id === eachBoardGame.id);
        if(eachFiltered.rate !== undefined && eachFiltered.rate !== null) {
            const rateTextEl = document.createElement("p");
            const rateText = document.createTextNode(eachFiltered.rate);
            rateTextEl.appendChild(rateText);
            eachArticle.appendChild(rateTextEl);
        } else {
            const rateInputEl = document.createElement("input");
            rateInputEl.type = "text";
            rateInputEl.classList.add("js-rateInput");
            const rateBtnEl = document.createElement("button");
            const rateBtnText = document.createTextNode("Rate");
            rateBtnEl.appendChild(rateBtnText);
            rateBtnEl.classList.add("js-rateBtn");
            eachArticle.appendChild(rateInputEl);
            eachArticle.appendChild(rateBtnEl);
      

        rateBtnEl.addEventListener('click',() =>{
            const rateValue = rateInputEl.value;
            rateInputEl.classList.add("hidden");
            rateBtnEl.classList.add("hidden");
            const rateTextEl = document.createElement("p");
            const rateText = document.createTextNode(rateValue);
            rateTextEl.appendChild(rateText);
            eachArticle.appendChild(rateTextEl);

            eachFiltered.rate = rateValue;
            setLocalSt();
        }); 
    }
}
}

"use strict";

//Función base para pintar los elementos de las listas con DOM avanzado
function paintBoardGames(BoardGamesData, list, className) {
  for (let i = 0; i < BoardGamesData.length; i++) {
    const liElement = document.createElement("li");
    const articleElement = document.createElement("article");
    articleElement.classList.add(className);
    articleElement.setAttribute("id", `${BoardGamesData[i].id}`);

    const imgElement = document.createElement("img");
    imgElement.src = `${BoardGamesData[i].image_url}`;
    imgElement.alt = `Photo of ${BoardGamesData[i].name}`;
    imgElement.style.height = "150px";
    imgElement.style.width = "120px";
    articleElement.appendChild(imgElement);

    const titleElement = document.createElement("h2");
    articleElement.appendChild(titleElement);
    const textElement = document.createElement("p");
    articleElement.appendChild(textElement);

    liElement.appendChild(articleElement);
    list.appendChild(liElement);

    const nameText = document.createTextNode(`${BoardGamesData[i].name}`);
    titleElement.appendChild(nameText);

    const statusText = document.createTextNode(`${BoardGamesData[i].type}`);
    textElement.appendChild(statusText);

    if (BoardGamesData[i].player_counts){
    const chAppArr = BoardGamesData[i].player_counts;
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
function getBoardGames() {
  fetch("https://api.boardgameatlas.com/api/search?order_by=popularity&client_id=fedCzdzOWG")
    .then((response) => response.json())
    .then((data) => {
      BoardGames = data.games;
      paintBoardGames(BoardGames, allList, "allBoardGames__list--article");
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
getBoardGames();
createReset();
//# sourceMappingURL=main.js.map
