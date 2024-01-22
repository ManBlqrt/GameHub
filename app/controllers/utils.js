const games = require("../models/games.json");

const utilsModule = {
    setLocals(req, res, next) {
        res.locals = {
            games,
        };

        next();
    },

    /**
   * Indique si un jeu est présent dans la liste des jeux
   * @param {*} name
   * @returns
   */

    findGame(name) {
        return games.find((game) => game.name == name);
    },
};

module.exports = utilsModule;
