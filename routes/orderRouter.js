const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, orderController.createOrder); // Changed to handle the base path
router.get('/', authMiddleware, orderController.getAllOrders);
module.exports = router;