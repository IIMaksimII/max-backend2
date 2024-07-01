const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/', userController.getAllUsers);
router.get('/', userController.getAllRoles);

router.put('/:id', authMiddleware, userController.updateUser); // Маршрут для редактирования пользователя
router.delete('/:id', authMiddleware, userController.deleteUser); // Маршрут для удаления пользователя

// Delete работает так же
// router.delete('/:id', authMiddleware, userController.delete);

module.exports = router;