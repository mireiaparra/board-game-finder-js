"use strict";
function paintFav(ev) {
  //Esto da el article padre del elemento sobre el que se haya hecho click
  let favElement = ev.currentTarget.firstChild;
  favElement.classList.add("favsCharacters__list--article");

  //Encontrar el objeto que tenga el mismo id que el article sobre el que se ha hecho click
  const findFav = characters.find((eachChar) => eachChar.id === (favElement.id));

  //Encontrar la posición del objeto en el que he hecho click en el array de favoritos
  const isFavIndex = favCharacters.findIndex((eachFav) => eachFav.id === (favElement.id));

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
    askRate();
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
  const isFavIndex = favCharacters.findIndex((eachFav) => eachFav.id === (ev.target.parentElement.id));
  favCharacters.splice(isFavIndex, 1);

  // //Encontrar el article padre de la X en la que se hace click, encontrar el article con el mismo id en la lista general y cambiarle el estilo
  const allLi = allList.children;
  const allLiArr = Array.prototype.slice.call(allLi);
  const oldFavCharacterLi = allLiArr.find((eachLi) => eachLi.firstChild.id === (ev.target.parentElement.id));
  oldFavCharacterLi.firstChild.classList.remove("favsCharacters__list--article");
  updateFavList();
}

function handleClickFav(ev) {
  ev.preventDefault();
  paintFav(ev);
}
