
const {Brand,SubCategory,Product, Category} = require('../models/models')
const AppiError = require('../error/ApiError');

class CategoryController {
    async createCategory(req, res) {
        try {
          const { name } = req.body;
          const category = await Category.create({ name });
          return res.json(category);
        } catch (e) {
          console.error(e); // Логируем ошибку для отладки
          res.status(500).json({ message: 'Failed to create category' });
        }
      }
      async getAll(req, res) {
        try {
     const categories = await Category.findAll({
       include: {
         model: SubCategory,
         include: {
           model: Brand,
           include: {
             model: Product
           }
         }
       }
     });
     return res.status(201).json({ message: "okey", categories });
         } catch (e) {
           console.error(e); // Логируем ошибку для отладки
           res.status(500).json({ message: 'Failed to fetch brands', error: e.message });
         }

         
       }
   
       async delete(req, res) {
        try {
          const { id } = req.params;
          const deleted = await Brand.destroy({ where: { id } });
          if (!deleted) {
            return res.status(404).json({ message: 'Brand not found' });
          }
          return res.json({ message: 'Brand deleted successfully' });
        } catch (e) {
          res.status(500).json({ message: 'Failed to delete brand' });
        }
      }
    
  
}

module.exports = new CategoryController()