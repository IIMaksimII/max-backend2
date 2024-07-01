const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), categoryController.createCategory)

router.get('/', categoryController.getAll)

router.delete('/:id', categoryController.delete);

module.exports = router