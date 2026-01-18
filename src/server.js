require("dotenv").config();        // Load .env variables
const app = require("./app");      // Import express app
const connectDB = require("./config/db");  // Import DB connector

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
