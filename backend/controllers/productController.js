import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//Description: Fetch all products
//Route: method GET /api/products
//Access: Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
})

//Description: Fetch a single product
//Route: method GET /api/products/:id
//Access: Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  };
});

export { getProducts, getProductById }
