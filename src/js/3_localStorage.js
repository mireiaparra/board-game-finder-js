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
      const findArticleIndex = favCharacters.findIndex((eachChar) => eachChar.id === (eachArticle.id));

      //Comprobar si el objeto está en el array de favoritos
      if (findArticleIndex !== -1) {
        eachArticle.classList.add("favsCharacters__list--article");
      } 
    }
  }
}
