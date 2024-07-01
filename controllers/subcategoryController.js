const {Brand,SubCategory,Product, Category} = require('../models/models')
const ApiError = require('../error/ApiError');


class subcategoryController {

async createSubCategory(req, res) {
    try {
      const { name, categoryId } = req.body; // Убедитесь, что categoryId передается в запросе
      const subCategory = await SubCategory.create({ name, categoryId });
      return res.json(subCategory);
    } catch (e) {
      console.error(e); // Логируем ошибку для отладки
      res.status(500).json({ message: 'Failed to create subcategory' });
    }
  }
  async getAll(req, res) {
    try {
 const subcategory = await SubCategory.findAll({
   include: {
     
       model: Brand,
       include: {
         model: Product
       }
     
   }
 });
 return res.status(201).json({ message: "okey", subcategory });
     } catch (e) {
       console.error(e); // Логируем ошибку для отладки
       res.status(500).json({ message: 'Failed to fetch brands', error: e.message });
     }
   }
}


module.exports = new subcategoryController()