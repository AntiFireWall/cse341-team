const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  // #swagger.tags=['Test GET']
  res.send('Hello All!');
});
router.use('/books', require('./booksRoute'));


module.exports = router;
