const router = require('express').Router();
const passport = require("passport");
const utilities = require("../utilities/index");

router.use('/', require('./swagger'));

router.get('/', utilities.isAuthenticated, (req, res) => {
  // #swagger.tags=['Test GET']
  if (req.session.user === undefined) {
    return res.send("Hello, please kindly login with your gmail account");}
  res.send(`Hello ${req.session.user.name}!`);
});
router.use(
  // #swagger.tags=['Books']
  '/books', utilities.isAuthenticated, require('./booksRoute'));
router.use(
  // #swagger.tags=['Staff']
  '/staff', utilities.isAuthenticated, require('./staffRoute'));

router.use(
  // #swagger.tags=['Checkout']
  '/checkout', utilities.isAuthenticated, require('./checkoutRoute'));

//route to users
router.use(
  // #swagger.tags=['User]
  '/users', utilities.isAuthenticated, require('./usersRoute'));

  
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
