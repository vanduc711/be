const { Web3 } = require('web3');
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
const contractABI = require('../contracts/Treasury.json')
const contractAddress = '0xA4ea16b8bc097076d5a45346F4B76FD6561d8d20';

const contract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = {contract, web3};
