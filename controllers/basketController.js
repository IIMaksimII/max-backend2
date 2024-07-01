const { User, Product, Cart, } = require('../models/models');


class BasketController {
    async addToCart(req, res) {
        const { productId, quantity } = req.body;
        const userId = req.user.id; // Assuming user ID is obtained from authentication middleware
    
        try {
          let cartItem = await Cart.findOne({ where: { userId, productId } });
    
          if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
          } else {
            cartItem = await Cart.create({ userId, productId, quantity });
          }
    
          return res.json(cartItem);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Something went wrong' });
        }
      }
    
      async removeFromCart(req, res) {
        const { productId } = req.body;
        const userId = req.user.id;
    
        try {
          await Cart.destroy({ where: { userId, productId } });
          return res.json({ message: 'Product removed from cart' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Something went wrong' });
        }
      }
    
      async getCart(req, res) {
        const userId = req.user.id;
    
        try {
          const cartItems = await Cart.findAll({
            where: { userId },
            include: [{ model: Product }]
          });
          return res.json(cartItems);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Something went wrong' });
        }
      }

      
    }
    



module.exports = new BasketController();