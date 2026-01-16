const router = require("express").Router();
const ctrl = require("../controllers/authController");

router.post("/register", ctrl.register); // ✅ REGISTER
router.post("/login", ctrl.login);       // ✅ LOGIN

module.exports = router;
