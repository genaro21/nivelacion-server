const { Router } = require("express");
const controllers = require("../controllers");
const middleware = require("../middleware");

const router = Router();

router.post("/create", controllers.message.create);
router.post("/chat", controllers.message.chat);

module.exports = router;
