const mongoose = require('mongoose');

// Kết nối đến MongoDB
mongoose.connect('mongodb+srv://Vanduc711:vanduc711@cluster0.682ao.mongodb.net/faucet?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
