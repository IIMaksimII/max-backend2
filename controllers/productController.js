const uuid = require('uuid')
const path = require('path');
const ApiError = require('../error/ApiError');
const {Brand,SubCategory,Product, Category, ProductDescription} = require('../models/models')
const { title } = require('process');

class ProductController {
    async createProduct(req, res) {
        try {
          const { name, price, brandId, subCategoryId, characteristics } = req.body;
          const { img } = req.files;
    
          if (!img) {
            return res.status(400).json({ message: 'Image file is required' });
          }
    
          let fileName = uuid.v4() + ".jpg";
          const filePath = path.resolve(__dirname, '..', 'static', fileName);
          img.mv(filePath);
    
          const product = await Product.create({ name, price, img: fileName, brandId, subCategoryId });
    
          if (characteristics) {
            const parsedCharacteristics = JSON.parse(characteristics);
            parsedCharacteristics.forEach(async (char) => {
              await ProductDescription.create({
                title: char.title,
                description: char.description,
                productId: product.id
              });
            });
          }
    
          return res.json(product);
        } catch (error) {
          console.error('Failed to create product:', error);
          return res.status(500).json({ message: 'Failed to create product' });
        }
      }
    
      async getAll(req, res) {
        try {
          const products = await Product.findAll({
            include: [
              { model: Brand },
              { model: SubCategory }
            ]
          });
          return res.json(products);
        } catch (e) {
          console.error('Failed to fetch products:', e);
          return res.status(500).json({ message: 'Failed to fetch products' });
        }
      }
    

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findOne({
                where: { id },
                include: [
                    { model: ProductDescription, as: 'descriptions' },
                    { model: Brand },
                    { model: SubCategory }
                ]
            });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.json(product);
        } catch (e) {
            res.status(500).json({ message: 'Failed to fetch product' });
        }
    
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Product.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.json({ message: 'Product deleted successfully' });
        } catch (e) {
            res.status(500).json({ message: 'Failed to delete product' });
        }
    }
}

module.exports = new ProductController()