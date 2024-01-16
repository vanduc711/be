const mongoose = require('mongoose');
const { model } = require('mongoose');

const faucetLogSchema = new mongoose.Schema({
  userAddress: { type: String, required: true },
  transactionHash: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = model("Faucet", faucetLogSchema)
