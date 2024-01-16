const { Web3 } = require('web3');
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
const contractABI = require('../contracts/Treasury.json')
const contractAddress = '0xdCE02248F75d8fF3B457aD822cfB747677E19b1F';

const contract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = {contract, web3};
