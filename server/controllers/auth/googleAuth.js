const passport = require("passport");

// Google OAuth callback handler
const googleCallback = (req, res, next) => {
  passport.authenticate("google", { failureRedirect: "/posts" })(req, res, next);
};

module.exports = { googleCallback };
