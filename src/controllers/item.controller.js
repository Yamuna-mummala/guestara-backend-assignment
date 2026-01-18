const Item = require("../models/item.model");

// Create Item
exports.createItem = async (req, res) => {
  try {
    const { name, category_id, base_price, description, image } = req.body;

    const item = new Item({
      name,
      category_id: category_id,
      base_price,
      description,
      image
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all active items
// const Item = require("../models/item.model");
const { calculateFinalPrice } = require("../utils/pricing.util");

// Get all active items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ is_active: true })
      .populate("category_id", "name tax_applicable tax_percentage");

    const formattedItems = items.map((item) => {
      const final_price = calculateFinalPrice(
        item.base_price,
        item.category_id.tax_applicable,
        item.category_id.tax_percentage
      );

      return {
        _id: item._id,
        name: item.name,
        description: item.description,
        image: item.image,
        base_price: item.base_price,
        final_price,
        is_available: item.is_available,
        category: item.category_id
      };
    });

    res.json(formattedItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft delete Item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { is_active: false },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({
      message: "Item deleted (soft delete)",
      item
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Item
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

