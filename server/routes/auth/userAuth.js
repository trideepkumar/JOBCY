const { Router } = require("express");
const router = Router();
const { googleCallback } = require('../../controllers/auth/googleAuth');

// Routes
router.get("/google", googleCallback);


module.exports  = router
