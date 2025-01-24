const mongoose = require('mongoose');

const connect = async () => {
    const dbUrl = process.env.DB_URL || `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`;
  try {
    await mongoose.connect(dbUrl);
    if (dbUrl === process.env.DB_URL) {
        console.log('Connected to MongoDB Atlas');
        }
    console.log('Connected to Database');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

module.exports = { connect };