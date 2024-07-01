const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, basketController.addToCart);
router.delete('/', authMiddleware, basketController.removeFromCart);
router.get('/', authMiddleware, basketController.getCart);

module.exports = router;