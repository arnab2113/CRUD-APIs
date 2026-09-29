const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const {
  createProductValidation,
  updateProductValidation,
  productIdParamValidation,
  paginationQueryValidation,
} = require('../validators/product.validator');
const validate = require('../middleware/validate');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', paginationQueryValidation, validate, getProducts);
router.get('/:id', productIdParamValidation, validate, getProductById);

router.post('/', authenticate, createProductValidation, validate, createProduct);
router.put('/:id', authenticate, updateProductValidation, validate, updateProduct);
router.delete('/:id', authenticate, productIdParamValidation, validate, deleteProduct);

module.exports = router;
