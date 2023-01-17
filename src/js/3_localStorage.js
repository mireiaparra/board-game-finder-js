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
