const router = require('express').Router();
const passport = require("passport");
const utilities = require("../utilities/index");

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  // #swagger.tags=['Test GET']
  res.send(`Hello ${req.session.user.name}!`);
});
router.use(
  // #swagger.tags=['Books']
  '/books', require('./booksRoute'));
router.use(
  // #swagger.tags=['Staff']
  '/staff', require('./staffRoute'));

//route to users
router.use(
  // #swagger.tags=['User]
  '/users', require('./usersRoute'));

  
// route to auth users using google oauth
router.get('/login', passport.authenticate('google', {
  scope: ['email', 'profile'],
  prompt: 'select_account',
  session: false
}));

//route to google oauth callback
router.get("/oauth/google/callback", passport.authenticate("google", {
  failureRedirect: "/api-docs", session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

//route to logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
        });
    });
    res.redirect("/api-docs");
})

module.exports = router;
