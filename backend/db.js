const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://gofood:food345@cluster0.i54l0pw.mongodb.net/gofood?appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = mongoDB;
