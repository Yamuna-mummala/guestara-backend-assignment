const Category = require("../models/category.model");

// Create a new Category
exports.createCategory = async (req, res) => {
  try {
    const { name, image, description, tax_applicable, tax_percentage } = req.body;

    const category = new Category({ name, image, description, tax_applicable, tax_percentage });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ is_active: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Soft delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, { is_active: false }, { new: true });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted (soft delete)", category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
