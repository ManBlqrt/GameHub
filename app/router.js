const {Router} = require("express");
const gameController = require("./controllers/gameController");

const router = Router();

router.get("/",gameController.displayHomepage);
router.get("/game/:gameName",gameController.displayGame);
router.use(gameController.display404);

module.exports = router;