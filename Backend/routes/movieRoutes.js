const router = require("express").Router();
const ctrl = require("../controllers/movieController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", ctrl.getMovies);
router.post("/", auth, admin, ctrl.addMovie);
router.delete("/:id", auth, admin, ctrl.deleteMovie);

module.exports = router;
