"use strict";
function handleClickSearch(ev) {
  ev.preventDefault();

  //Filtrar objetos por nombre y estado según lo introducido en el input de búsqueda. Concatenar los resultados en un nuevo array
  const searchCharactersName = characters.filter((eachCharacter) =>
    eachCharacter.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  const searchCharactersStatus = characters.filter((eachCharacter) =>
    eachCharacter.type.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  let filteredCharacters = searchCharactersName.concat(searchCharactersStatus);
  console.log(filteredCharacters.length)

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
