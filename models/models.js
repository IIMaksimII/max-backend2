

const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Role = sequelize.define('role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const UserRole = sequelize.define('user_role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

const ProductDescription = sequelize.define('product_description', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
});

const Brand = sequelize.define('brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  subcategoryId: { type: DataTypes.INTEGER, allowNull: false },
});

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const SubCategory = sequelize.define('subcategory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Supplier = sequelize.define('supplier', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  deliveryType: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: true },
  orderNumber: { type: DataTypes.STRING, unique: true, allowNull: false },
  
});

const PaymentType = sequelize.define('payment_type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const DeliveryType = sequelize.define('delivery_type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Warehouse = sequelize.define('warehouse', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const OrderProduct = sequelize.define('order_product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const Cart = sequelize.define('Cart', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
});

Cart.belongsTo(User);
Cart.belongsTo(Product);

User.belongsToMany(Product, { through: Cart });
Product.belongsToMany(User, { through: Cart });

Product.hasMany(ProductDescription, { as: 'descriptions' });
ProductDescription.belongsTo(Product);

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

Product.belongsTo(Brand);
Brand.hasMany(Product);

Category.hasMany(SubCategory);
SubCategory.belongsTo(Category);

SubCategory.hasMany(Product);
Product.belongsTo(SubCategory);

Product.belongsTo(Supplier);
Supplier.hasMany(Product);

Product.belongsToMany(Order, { through: OrderProduct });
Order.belongsToMany(Product, { through: OrderProduct });

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsTo(PaymentType);
PaymentType.hasMany(Order);

Order.belongsTo(DeliveryType);
DeliveryType.hasMany(Order);

Product.belongsTo(Warehouse);
Warehouse.hasMany(Product);

Brand.belongsTo(SubCategory);
SubCategory.hasMany(Brand);

Product.belongsTo(Brand);
Product.belongsTo(SubCategory);

// User.belongsToMany(Product, { through: Cart });
// Product.belongsToMany(User, { through: Cart });


module.exports = {
  sequelize,
  User,
  Role,
  UserRole,
  Product,
  Brand,
  Category,
  SubCategory,
  Supplier,
  Order,
  PaymentType,
  DeliveryType,
  Warehouse,
  OrderProduct,
  ProductDescription,
  Cart,
};