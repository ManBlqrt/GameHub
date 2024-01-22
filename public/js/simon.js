const app = {
    colors: ["red", "green", "blue", "yellow"],
    sequence: [],
    indice: 0,
    myTimeout: undefined,

    // Méthode pour initialiser le jeu
    init() {
        console.log("init");
        document.getElementById("go").addEventListener("click", app.newGame);
    },

    // Méthode pour lancer la partie
    newGame() {
        // le playground est passé en display="none" à la fin d'une partie / on le repasse en "flex" en début de partie
        document.getElementById("playground").style.display = "flex";

        // Je vide ma séquence de couleurs à deviner, et je la complète avec une première séquence de 3 couleurs random
        app.sequence = [];
        for (let index = 0; index < 3; index++) {
            const random = Math.floor(Math.random() * 4);
            app.sequence.push(app.colors[random]);
        }
        app.simonSays(app.sequence);
    },

    // Méthode qui fait parler Simon
    simonSays(sequence) {
        if (sequence && sequence.length) {
            app.showMessage("Mémorisez la séquence");
            // Empêcher l'utilisateur de cliquer pendant la mémorisation de la séquence
            document.getElementById("playground").removeEventListener("click", app.handleClick);
            // Déclencher un effet sur la première couleur de la séquence
            setTimeout(app.bumpCell, 500, sequence[0]);
            // Puis, déclencher récursivement la fonction simonSays avec le reste de la séquence (on enlève le premier élément de la séquence)
            setTimeout(app.simonSays, 850, sequence.slice(1));
        } else {
            app.showMessage("Reproduisez la séquence");
            // SI le joueur ne répond pas dans les 5 secondes, on termine la partie
            app.myTimeout = setTimeout(app.endGame, 5000);
            app.playerRepeat();
        }
        console.log(app.sequence);
    },

    // Méthode pour créer un effet sur les cases activées dans la séquence
    bumpCell(color) {
        document.getElementById(color).style.borderWidth = "45px";
        setTimeout(() => {
            document.getElementById(color).style.borderWidth = "0px";
        }, 150);
    },

    // Méthode pour permettre au joueur de répéter la séquence
    playerRepeat() {
        app.indice = 0;
        document.getElementById("playground").addEventListener("click", app.handleClick);
    },

    // Méthode appelée lorsqu'un joueur clique sur une case de couleur
    handleClick(event) {
        // Je supprime le timeout des 5 secondes puisque le joueur a cliqué
        clearTimeout(app.myTimeout);
        // J'ajoute un effet visuel sur la case cliquée
        app.bumpCell(event.target.id);

        // Si la couleur cliquée ne correspond pas à celle de la [séquence], je termine la partie
        if (event.target.id !== app.sequence[app.indice]) {
            app.endGame();
            clearTimeout(app.myTimeout);
        // Si la couleur cliquée est OK mais que la séquence n'est pas terminée, j'incrémente l'indice et je relance un timeout de 5 secondes éliminatoire entre chaque clic
        } else if (app.indice !== app.sequence.length - 1) {
            app.indice++;
            app.myTimeout = setTimeout(app.endGame, 5000);
        // Si la couleur cliquée est OK est que la séquence est finie, on appelle nextMove
        } else {
            app.nextMove();
        }
    },

    // Méthode qui ajoute une nouvelle couleur générée aléatoirement à la séquence
    nextMove() {
        const random = Math.floor(Math.random() * 4);
        app.sequence.push(app.colors[random]);
        // Je relance le tour de Simon avec la nouvelle séquence générée et je réinitialise l'indice du joueur 
        app.simonSays(app.sequence);
        app.indice = 0;
    },

    // Méthode qui déclenche la fin de la partie
    endGame() {
        // J'initialise le score qui constitue la longueur de la séquence moins les 3 premières couleurs générées au premier tour
        const score = app.sequence.length - 3;
        // Cacher le playground à la fin de la partie
        document.getElementById("playground").style.display = "none";

        app.sequence = [];
        if (score === 0) {
            app.showMessage(`Perdu !`);
        } else if (score === 1) {
            app.showMessage(`Partie terminée après ${score} enchaînement réussi !`);
        } else {
            app.showMessage(`Partie terminée après ${score} enchaînements réussis !`);
        }
        // Je réaffiche le bouton PLAY
        app.showButton();
    },

    // Méthode qui permet d'afficher un message passé en argument
    showMessage(message) {
        document.getElementById("message").innerHTML = message;
        // Je cache le bouton Play pendant la partie
        document.getElementById("go").style.color = "#272bad";
        document.getElementById("go").style.backgroundColor = "#272bad";
    },

    // Méthode qui permet de réaffciher le bouton PLAY
    showButton() {
        document.getElementById("go").style.color = "#fff";
        document.getElementById("go").style.backgroundColor = "#9957e4";
        document.getElementById("go").textContent = "Rejouer";
    },
};

document.addEventListener("DOMContentLoaded", app.init);
