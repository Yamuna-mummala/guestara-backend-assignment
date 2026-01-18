const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");

// Create item
router.post("/", itemController.createItem);

// Get all items
router.get("/", itemController.getItems);
router.put("/:id", itemController.updateItem);


router.delete("/:id", itemController.deleteItem);


module.exports = router;
