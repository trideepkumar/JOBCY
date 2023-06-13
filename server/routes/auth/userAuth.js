const { Router } = require("express");
const router = Router();
const { googleCallback } = require('../../controllers/auth/googleAuth');

// Routes
router.post("/google", googleCallback);


module.exports  = router
