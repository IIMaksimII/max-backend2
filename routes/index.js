const Router = require('express')
const router = new Router()


const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const brandRouter = require('./brandRouter');
const categoryRouter = require('./categoryRouter');
const subcategoryRouter = require('./subcategoryRouter');
const basketRouter = require('./basketRouter');
const orderRouter = require('./orderRouter');

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/brand', brandRouter);
router.use('/product', productRouter);
router.use('/subcategory', subcategoryRouter);
router.use('/basket', basketRouter);
router.use('/order', orderRouter); 

module.exports = router;