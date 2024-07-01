const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware');


router.post('/', checkRole('ADMIN'), brandController.createBrand);
router.get('/', brandController.getAll); // Уже существующий маршрут





// Маршруты для продуктов


// router.post('/', brandController.create);
// router.get('/', brandController.getAll);

// Delete работает так же
router.delete('/:id', brandController.delete);

module.exports = router;