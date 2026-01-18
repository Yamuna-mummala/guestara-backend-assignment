const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    description: String,

    image: String,

    base_price: {
      type: Number,
      required: true
    },

    is_available: {
      type: Boolean,
      default: true
    },

    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
