const {Brand,SubCategory,Product, Category} = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController {
    
    async createBrand(req, res) {
      try {
          const { name, subcategoryId } = req.body;
          if (!name || !subcategoryId) {
              return res.status(400).json({ message: 'Name and subcategoryId are required' });
          }
          const brand = await Brand.create({ name, subcategoryId });
          return res.json(brand);
      } catch (e) {
          console.error(e); // Логируем ошибку для отладки
          res.status(500).json({ message: 'Failed to create brand', error: e.message });
      }
  }
  
  
      async getAll(req, res) {
       try {
    const brand = await Brand.findAll({
          include: {
            model: Product
          }
    });

    return res.status(201).json({ message: "okey", brand });
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

module.exports = new BrandController()