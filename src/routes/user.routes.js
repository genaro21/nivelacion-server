const { Router } = require("express");
const controllers = require("../controllers");
const middleware = require("../middleware");

const router = Router();

router.post("/create", controllers.user.create);
router.get("/all", controllers.user.all);
router.post("/login", controllers.user.login);

module.exports = router;
