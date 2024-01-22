const utilsModule = require("./utils");

const gameController = {
    displayHomepage(req, res) {
        res.render("index");
    },

    display404(req, res) {
        res.status(404).render("404");
    },

    displayGame(req, res, next) {
        const { gameName } = req.params;

        const game = utilsModule.findGame(gameName);

        if (game) {
            res.locals.game = game;
            console.log(res.locals);
            res.render(gameName);
        } else {
            next();
        }
    },
};

module.exports = gameController;
