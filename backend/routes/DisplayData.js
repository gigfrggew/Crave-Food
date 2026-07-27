// routes/DisplayData.js
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

router.post('/foodData', async (req, res) => {
  try {
    const db = mongoose.connection.db;

    const foodItems = await db.collection("food_items").find({}).toArray();
    const foodCategory = await db.collection("foodCategory1").find({}).toArray();

    res.json([foodItems, foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
