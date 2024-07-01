const Router = require('express')
const router = new Router()
const subcategoryController = require('../controllers/subcategoryController')
const checkRole = require('../middleware/checkRoleMiddleware');


// Маршруты для подкатегорий
router.post('/', checkRole('ADMIN'), subcategoryController.createSubCategory);
router.get('/', subcategoryController.getAll)

// router.post('/', brandController.create);
// router.get('/', brandController.getAll);

// Delete работает так же
// router.delete('/:id', brandController.delete);

module.exports = router;