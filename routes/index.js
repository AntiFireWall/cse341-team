const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  // #swagger.tags=['Test GET']
  res.send('Hello All!');
});
router.use(
  // #swagger.tags=['Books']
  '/books', require('./booksRoute'));
router.use(
  // #swagger.tags=['Staff']
  '/staff', require('./staffRoute'));

router.use(
  // #swagger.tags=['Checkout']
  '/checkout', require('./checkoutRoute'));

module.exports = router;
