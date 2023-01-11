const router = require('express').Router();
const {
  addProduct,
  getProducts,
  getProduct,
  getCategories,
} = require('../controllers/product-controller');
const { authRoutes } = require('../middlewares/auth');

router.route('/').post(authRoutes, addProduct);
router.route('/categories').get(getCategories);
router.route('/category/:category').get(getProducts);
router.route('/:slug').get(getProduct);

module.exports = router;
