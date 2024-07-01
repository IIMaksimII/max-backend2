const { Order, OrderProduct, User, Product }  = require('../models/models');

class OrderController {
    async createOrder(req, res) {
        const { userId, deliveryType, address, paymentType, products, totalPrice } = req.body;

        if (!userId || !deliveryType || !paymentType || !products || products.length === 0) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const orderNumber = Math.floor(1000 + Math.random() * 9000).toString();
            const order = await Order.create({
                userId,
                deliveryType,
                address,
                orderNumber,
            });

            // Link products to the order in order_product table
            for (let product of products) {
                await OrderProduct.create({
                    orderId: order.id,
                    productId: product.productId,
                    quantity: product.quantity,
                });
            }

            console.log('Order created:', order);
            return res.json(order);
        } catch (error) {
            console.error('Error creating order:', error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['email'] // Fetch only the email of the user
                    },
                ]
            });
            res.json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Failed to fetch orders' });
        }
    }
}

    


module.exports = new OrderController();