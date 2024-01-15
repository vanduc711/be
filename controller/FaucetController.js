const {contract, web3} = require('../config/contract')
// const isAddress = require('web3-validator')

const contractAddress = '0xA4ea16b8bc097076d5a45346F4B76FD6561d8d20';

const handleFaucet = async (req, res) => {
  const userAddress = req.body.address;
  try {
    const gasPrice = await web3.eth.getGasPrice();
    
    // console.log(contract.methods.getToken().call().then(data => console.log(data)));
    const result = await contract.methods.receiveTokenERC20(userAddress).send({ from: "0x99C18D7d718d0866b42AAd86128C645887818114" });

    // await saveFaucetLog(userAddress, result.transactionHash);

    return { success: true, transactionHash: result.transactionHash };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Internal Server Error' };
  }
}
const saveFaucetLog = async (userAddress, transactionHash) => {
    try {
      const faucetLog = new faucetLogSchema({
        userAddress: userAddress,
        transactionHash: transactionHash,
      });
  
      await faucetLog.save();
      console.log('Faucet log saved successfully.');
    } catch (error) {
      console.error('Error saving faucet log:', error);
    }
  }

module.exports = { handleFaucet, saveFaucetLog };
