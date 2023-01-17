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
