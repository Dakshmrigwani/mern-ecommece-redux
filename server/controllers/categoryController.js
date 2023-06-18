import Category from "../models/Category.js";

// @desc    add category (post)
// @route http://localhost:5000/api/categories/add_category

export const addCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    const isExists = await Category.findOne({ name });

    if (isExists)
      return res.status(400).json({ message: "Category already exists" });

    const newCategory = await Category.create({ name, image });

    if (newCategory) {
      return res.status(201).json({ message: "Category added successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// @desc    get all categories (get)
// @route http://localhost:5000/api/categories/

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (categories) {
      return res.status(200).json({ categories });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// @desc    delete category (delete)
// @route http://localhost:5000/api/categories/delete_cat/:id

export const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(400).json("Category Not Found");
  }

  await category.remove();

  res.status(200).json({ message: "Category deleted successfully" });
};
