import Product from "../models/Product.js";

// @desc    add product (post)
// @route http://localhost:5000/api/products/add_product

export const addProduct = async (req, res) => {
  try {
    const { name, price, category, desc, image } = req.body;
    const isExists = await Product.findOne({ name });
    if (isExists)
      return res.status(400).json({ message: "Product already exists" });

    const product = await Product.create({
      name,
      price,
      category,
      desc,
      image,
    });

    return res
      .status(201)
      .json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   get products (get)
// @route http://localhost:5000/api/products/

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   get product by id (get)
// @route http://localhost:5000/api/products/:id

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   delete product id (delete)
// @route http://localhost:5000/api/products/delete_product/:id

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// @desc   search product (get)
// @route http://localhost:5000/api/products/search?searchQuery=apple

export const getProductsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  console.log(searchQuery);

  try {
    const name = new RegExp(searchQuery, "i");
    const products = await Product.find({ name });
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
