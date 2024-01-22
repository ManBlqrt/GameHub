const app = {
  colors: ['red','green','blue','yellow'],
  sequence: [],
  indice: 0,
  myTimeout: undefined,

  bumpCell: function (color) {
    document.getElementById(color).style.borderWidth = '45px';
    setTimeout( () => {
      document.getElementById(color).style.borderWidth = '0px';
    }, 150);
  },

  newGame: function () {
    document.getElementById('playground').style.display = "flex";
    app.sequence = [];
    for (let index = 0; index < 3; index++) {
      let random = Math.floor(Math.random()*4);
      app.sequence.push( app.colors[random] );
    }
    app.simonSays(app.sequence);
    
  },

  simonSays: function (sequence) {
    if (sequence && sequence.length) {
      app.showMessage("Mémorisez la séquence")
      document.getElementById("playground").removeEventListener("click", app.handleClick);
      setTimeout( app.bumpCell, 500, sequence[0] );
      setTimeout( app.simonSays, 850, sequence.slice(1));
    } else {
      app.showMessage("Reproduisez la séquence");
      app.myTimeout = setTimeout(app.endGame, 5000);
      app.playerRepeat();
    }
    console.log(app.sequence)
  },

  init: function () {
    console.log('init');
    document.getElementById('go').addEventListener('click', app.newGame);
  },

  showMessage: function (message) {
    document.getElementById('message').innerHTML = message;
    document.getElementById('go').style.color = "#272bad";
    document.getElementById('go').style.backgroundColor = "#272bad";
  },

  showButton: function () {
    document.getElementById('go').style.color = "#fff";
    document.getElementById('go').style.backgroundColor = "#9957e4";
    document.getElementById('go').textContent = "Rejouer";
  },

  endGame: function() {
    let score = app.sequence.length-3;
    document.getElementById('playground').style.display = "none";

    app.sequence = [];
    if(score === 0) {
      app.showMessage(`Perdu !`)
    } else if(score === 1) {
    app.showMessage(`Partie terminée après ${score} enchaînement réussi !`)
    } else {
    app.showMessage(`Partie terminée après ${score} enchaînements réussis !`)
    }
    app.showButton();
  },

  playerRepeat: function() {
    app.indice=0
    document.getElementById("playground").addEventListener("click", app.handleClick)
  },

  handleClick: function(event) {
    clearTimeout(app.myTimeout);
    app.bumpCell(event.target.id);
    
    if(event.target.id !== app.sequence[app.indice]) {
        app.endGame();
        clearTimeout(app.myTimeout);
      } else if (app.indice !== app.sequence.length-1) {
        app.indice++;
        app.myTimeout = setTimeout(app.endGame, 5000);
      } else {
        app.nextMove() }
    },
   
  nextMove: function() {
    let random = Math.floor(Math.random()*4);
    app.sequence.push( app.colors[random] );
    app.simonSays(app.sequence);
    app.indice = 0
  },

  };

document.addEventListener('DOMContentLoaded', app.init);
