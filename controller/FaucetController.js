// import contract from '../config/contract';
// import web3 from '../config/web3';
const contract = require('../config/contract')
const web3 = require('../config/web3')
// import { isAddress } from 'web3-validator';


const adminAddress = '0x99C18D7d718d0866b42AAd86128C645887818114';

async function handleFaucet(userAddress) {
  try {
    // Kiểm tra tính hợp lệ của địa chỉ người dùng (có thể thêm kiểm tra bổ sung nếu cần)
    if (!isAddress(userAddress)) {
      return { success: false, error: 'Invalid user address' };
    }

    // Gọi chức năng faucet từ smart contract
    const gasPrice = await web3.eth.getGasPrice();
    const result = await contract.methods.receiveTokenERC20(userAddress).send({ from: adminAddress, gasPrice });

    // Lưu thông tin faucet vào MongoDB (hoặc nơi lưu trữ khác)
    await saveFaucetLog(userAddress, result.transactionHash);

    return { success: true, transactionHash: result.transactionHash };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Internal Server Error' };
  }
}

async function saveFaucetLog(userAddress, transactionHash) {
    try {
      const faucetLog = new FaucetLog({
        userAddress: userAddress,
        transactionHash: transactionHash,
      });
  
      await faucetLog.save();
      console.log('Faucet log saved successfully.');
    } catch (error) {
      console.error('Error saving faucet log:', error);
    }
  }

module.exports = handleFaucet;
