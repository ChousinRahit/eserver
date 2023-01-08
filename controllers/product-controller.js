const Product = require('../models/Product');
const Category = require('../models/Category');
const asyncHandler = require('../middlewares/asyncHandler');
const httpError = require('../utils/httpError');

//#region ~ POST - /api/v1/product - Upload a Product - Private
exports.addProduct = asyncHandler(async (req, res, next) => {
  let { name, desc, slug, image, category, price } = req.body;

  let categoryFromData = await Category.find({ name: category });
  if (!categoryFromData) {
    categoryFromData = await Category.create({ name: category });
  }

  const product = await Product.create({
    name,
    desc,
    slug,
    image,
    price,
    category: categoryFromData._id,
  });
  product.save();
  return res.status(201).json({ item: product.toObject({ getters: true }) });
});
//#endregion

//#region ~ GET - /api/v1/products/category/:category - GET PRODUCTS - PRIVATE
exports.getProducts = asyncHandler(async (req, res, next) => {
  const { category } = req.params;
  const items = await Product.find().populate('category');
  let resItems = items.filter(item => item.category.name === category);
  res.status(200).json(items);
});
//#endregion

//#region ~ GET - /api/v1/products/:slug - GET Individual PRODUCT - PRIVATE
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const item = await Product.find({ slug });
  console.log(item);
  if (!item.length) {
    return next(new httpError('No Item found', 404));
  }
  res.status(200).json(item[0]);
});
//#endregion
