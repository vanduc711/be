const mongoose = require('mongoose');

const faucetLogSchema = new mongoose.Schema({
  userAddress: { type: String, required: true },
  transactionHash: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const FaucetLog = mongoose.model('FaucetLog', faucetLogSchema);
