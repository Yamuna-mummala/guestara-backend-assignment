const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,  // Each category must have a unique name
      trim: true
    },
    image: String,
    description: String,
    tax_applicable: {
      type: Boolean,
      default: false
    },
    tax_percentage: {
      type: Number,
      default: 0
    },
    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true } // createdAt and updatedAt
);

module.exports = mongoose.model("Category", categorySchema);
