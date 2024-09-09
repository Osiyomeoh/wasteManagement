require('dotenv').config();
const { Web3 } = require('web3');
const {
  Web3ZKsyncL2,
  ZKsyncPlugin,
  ZKsyncWallet,
} = require('@zksync/web3js-plugin');
const fs = require('fs');
const path = require('path');

// Load ABI
const contractAbi = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './artifacts/WasteCollectionRewards.json')).toString()
).abi;
const contractAddress = '<CONTRACT_ADDRESS>';  

async function interact() {
  
  const web3 = new Web3();
  web3.registerPlugin(
    new ZKsyncPlugin(Web3ZKsyncL2.initWithDefaultProvider(types.Network[process.env.ZKSYNC_NETWORK]))
  );
  const zksync = web3.ZKsync;

  // Initialize zkSync wallet
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const wallet = new ZKsyncWallet(PRIVATE_KEY);

  // Get the deployed contract instance
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  // Specify the ERC-20 token for gas fees and paymaster setup
  const erc20TokenAddress = "<TOKEN_ADDRESS>";  
  const paymasterAddress = "<PAYMASTER_ADDRESS>"; 

  // Approve tokens for gas fee (if using Approval-Based flow)
  const amount = 5;
  
  const tx = await contract.methods.submitWaste(amount).send({
    from: wallet.address,
    gasPrice: 0,  
    customData: {
      paymasterParams: getPaymasterParams(paymasterAddress, {
        innerInput: new Uint8Array(), 
        minimalAllowance: 1n, 
        token: erc20TokenAddress, 
        type: 'ApprovalBased', 
      }),
    }
  });

  console.log('Transaction successful:', tx.transactionHash);
}

interact()
  .then(() => console.log('✅ Interaction executed successfully'))
  .catch((error) => console.error(`❌ Error executing interaction: ${error}`));
