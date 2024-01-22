const app = {
maxNumber: 500,
searchedNumber: null,
enteredNumber: null,
count: 1,

play: function () {
    const searchedNumber = Math.round(Math.random() * app.maxNumber);
    app.searchedNumber = searchedNumber
    console.log(app.searchedNumber)
    const form = document.getElementById("game-form")
    form.addEventListener("submit", app.reagirSubmit);
},

reagirSubmit: function (event) {
    event.preventDefault();
    const enteredNumber = document.getElementById("number-input");
    app.enteredNumber = enteredNumber.value;
    
    if(app.enteredNumber === "") {
        return;
    }

    if(app.enteredNumber != app.searchedNumber) {
        app.displayScore();
    }

    if(app.enteredNumber == app.searchedNumber) {
        app.endGame();
    }

    enteredNumber.value = "";
  },

displayScore: function () {
    const scoreContainer = document.getElementById("score")

    if (app.enteredNumber < app.searchedNumber) {
        const scoreElem = document.createElement("p")
        scoreElem.className = "scoreElem";
        scoreElem.innerHTML = `<span class="countNumber">${app.count}.</span> Vous avez entré <span class="enteredNumber">${app.enteredNumber}</span> : <span class="plusOuMoins">C'est plus ! ⬆️</span>`;
        scoreContainer.appendChild(scoreElem)
    }

    else {
        const scoreElem = document.createElement("p")
        scoreElem.className = "scoreElem";
        scoreElem.innerHTML = `<span class="countNumber">${app.count}.</span> Vous avez entré <span class="enteredNumber">${app.enteredNumber}</span> : <span class="plusOuMoins">C'est moins !  ⬇️</span>`;
        scoreContainer.appendChild(scoreElem)
    }
    app.count += 1;
},

endGame: function() {
    const scoreContainer = document.getElementById("score")
    const scoreElem = document.createElement("p")
    scoreElem.className = "scoreElem";
    scoreElem.id = "bravo"
    scoreElem.innerHTML = `🎉 Bravo ! Vous avez trouvé le nombre <span class="enteredNumber">${app.searchedNumber}</span>  ! <span class="plusOuMoins">Vous avez réussi en <u>${app.count} coups.</u></span>`;
    scoreContainer.appendChild(scoreElem)

    const button = document.createElement("button");
    button.className = "replayButton";
    button.type = "button";
    button.textContent = "Rejouer ?";
    scoreContainer.appendChild(button)
    button.addEventListener("click", app.reset)
},

reset: function() {
    const scoreElems = document.querySelectorAll(".scoreElem");
    const button = document.querySelector(".replayButton")
    scoreElems.forEach(elem => elem.remove());
    button.remove();
    app.count = 1;

    app.play()
},

};

document.addEventListener('DOMContentLoaded', app.play());





