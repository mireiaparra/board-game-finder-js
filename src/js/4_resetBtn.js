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
