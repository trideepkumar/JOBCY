const express = require("express");
const {signup,login,verifyEmail,verifyToken} = require("../controllers/organisation");

const router = express.Router();


router.post("/signup", signup);
router.post("/login",login)

router.get('/verify/:token', verifyEmail)



module.exports = router;
