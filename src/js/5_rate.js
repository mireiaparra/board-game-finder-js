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
