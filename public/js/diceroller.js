const game = {
    nbDices: null,
    victory: 0,
    defeat: 0,
    playerScore: 0,
    ingame: false,

    init() {
        game.boards = document.querySelectorAll(".board");
        game.diceNumberInput = document.getElementById("dice-number-input");
        game.diceNumberInput.addEventListener("input", game.changeNumber);

        const gameForm = document.getElementById("game-form");
        gameForm.addEventListener("submit", game.play);
        document.addEventListener("keyup", (event) => {
            if (event.code === "Space") {
                game.play();
            }
        });

        // J'exécute une première fois la fonction pour récuperer la valeur initiale
        game.changeNumber();
    },

    changeNumber() {
        const diceNumberElement = document.getElementById("dice-number");
        // Je récupère le nombre de dés souhaités par l'utilisateur
        game.nbDices = game.diceNumberInput.value;
        diceNumberElement.textContent = game.nbDices;
    },

    play(event) {
        // J'empêche la soumission du formulaire
        event.preventDefault();

        // si on est pas déjà en cours de partie
        if (!game.ingame) {
            // dorénavant on y est
            game.ingame = true;

            // on vide l'interface
            game.reset();

            // On déclenche le lancer des dés du joueur après 3 secondes
            setTimeout(() => {
                // on crée les dés pour le joueur et on récupère son score
                // on le stocke en propriété l'objet game on en aura besoin plus tard
                game.playerScore = game.createAllDices("player");
            }, 3000);

            // on déclenchera le lancer du dealer dans 3 secondes
            setTimeout(game.dealerPlay, 3000);

            // on crée le compteur
            game.createCounter();
        }
    },

    // méthode pour supprimer les dés et réinitialiser les scores
    reset() {
        // on parcours chaque board
        for (let boardIndex = 0; boardIndex < game.boards.length; boardIndex++) {
            // on cible le board et on le vide
            game.boards[boardIndex].innerHTML = "";
        }
    },

    // méthode retournant un nombre aléatoire dans une plage donnée
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // méthode pour le lancer le bon nombre dés et retourner le score total
    createAllDices(player) {
        // on initialise le score
        let score = 0;
        // on crée le nombre voulu de dé
        for (let nbDice = 0; nbDice < Number(game.nbDices); nbDice++) {
            // on crée un dé et on récupère sa valeur
            const diceScore = game.createDice(player);
            // on ajoute la valeur au score
            score += diceScore;
        }
        // on retourne le score
        return score;
    },

    // on récupère l'index du joueur en paramètre pour incrémenter son score
    createDice(player) {
        // on crée une div
        const dice = document.createElement("div");
        // on récupère un nombre aléatoire
        const diceValue = game.getRandom(1, 6);
        // on définit le décalage à appliquer sur l'image
        const imageOffset = (diceValue - 1) * 100;
        // on ajoute une classe
        dice.className = "dice";
        // on n'écrit rien dans la div
        dice.textContent = "";
        // on change le style de la position de l'arrière plan
        dice.style.backgroundPosition = `-${imageOffset}px 0`;
        // on ajoute la div créée dans le board du joueur en fonction de son id
        document.getElementById(player).appendChild(dice);
        // on retourne la valeur du dé
        return diceValue;
    },

    // méthode pour le lancer de l'adversaire
    dealerPlay() {
        // on crée les dés pour l'adversaire et on recupère son score
        const dealerScore = game.createAllDices("dealer");

        // si le score de l'adversaire est plus élevé on a perdu
        if (dealerScore > game.playerScore) {
            game.defeat++;
        }
        // si notre score est plus élevé on a gagné
        else if (dealerScore < game.playerScore) {
            game.victory++;
        }
        // en cas de match nul on ne change rien

        // on met à jour l'interface avec les résultats
        game.displayResult("player", game.victory);
        game.displayResult("dealer", game.defeat);

        // la partie est finie on peut ensuite en lancer une autre
        game.ingame = false;
    },

    // méthode pour ajouter une div avec le nombre de victoires pour chaque joueur
    displayResult(board, counter) {
        // on crée une div
        const result = document.createElement("div");
        // on lui met une classe
        result.className = "result";
        // on écrit le nombre de victoire du joueur récuperé en paramètre
        result.textContent = counter;
        // on ajoute la div créée dans le board qui a l'id passé en paramètre
        document.getElementById(board).appendChild(result);
    },

    // méthode pour initialiser le compteur
    createCounter() {
        // on itinitialise un compteur
        game.counter = 3;

        // on crée et on ajoute un élément au DOM
        game.counterElement = document.createElement("div");
        game.counterElement.textContent = game.counter;
        game.counterElement.className = "counter";
        document.getElementById("app").appendChild(game.counterElement);

        // on stocke l'identifiant retourné par setInterval dans une variable pour pouvoir l'arrêter plus tard avec clearInterval
        // setInterval permet d'éxécuter un callback tous les X. Ici on éxécute coutdown toutes les 1000 millisecondes (soit 1 seconde)
        game.counterInterval = setInterval(game.countdown, 1000);
    },

    // méthode pour décrémenter le compteur
    countdown() {
        // on décrémente le compteur
        game.counter--;

        // on met à jour l'élement dans le DOM
        game.counterElement.textContent = game.counter;

        // si on arrive à 0
        if (game.counter === 0) {
            game.deleteCounter();
        }
    },

    // méthode pour stopper et supprimer le compteur du DOM
    deleteCounter() {
        // on stoppe l'intervalle
        clearInterval(game.counterInterval);

        // on supprime le compteur du DOM
        // on doit cibler le parent de l'élement et lui supprimer l'enfant qui nous interesse
        game.counterElement.remove();
    },
};

// on execute init seulement quand on est sûr que le document est prêt
document.addEventListener("DOMContentLoaded", game.init);
