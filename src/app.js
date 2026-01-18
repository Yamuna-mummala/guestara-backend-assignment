const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Guestara Backend is Running 🚀");
});

// ===== Add Category routes here =====
const categoryRoutes = require("./routes/category.routes");
app.use("/categories", categoryRoutes);

const itemRoutes = require("./routes/item.routes");
app.use("/items", itemRoutes);


// Export app
module.exports = app;
