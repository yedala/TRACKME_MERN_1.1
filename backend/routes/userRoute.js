const express =  require("express");
const {registerUser,authUser, allUsers, fetchUser} = require("../controllers/userController")
const authGaurd = require("../middleware/authMiddleware");


const router = express.Router();

router.post('/signup',registerUser);
router.post('/login',authUser);
router.route("/all").get(authGaurd,allUsers);
router.route("/:userId").get(authGaurd,fetchUser)

module.exports= router;