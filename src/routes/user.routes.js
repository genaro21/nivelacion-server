const { Router } = require("express");
const controllers = require("../controllers");
const middleware = require("../middleware");

const router = Router();

router.post("/create", controllers.user.create);
router.get("/all", middleware.users.isValid, controllers.user.all);
router.post("/login", controllers.user.login);
router.delete("/remove/:id", controllers.user.remove);

module.exports = router;
