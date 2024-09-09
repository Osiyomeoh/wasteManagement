const dotenv = require('dotenv');
dotenv.config();
const { Web3 } = require("web3");
const {
  ContractFactory,
  Web3ZKsyncL2,
  ZKsyncPlugin,
  ZKsyncWallet,
  types,
} = require('web3-plugin-zksync');
const fs = require('fs');
const path = require('path');

// Load ABI and bytecode from the compiled contract
const wasteTokenArtifactPath = path.resolve(__dirname, '../artifacts-zk/contracts/wasteToken.sol/WasteToken.json');
const wasteTokenAbi = JSON.parse(fs.readFileSync(wasteTokenArtifactPath).toString()).abi;

async function main() {
  // Initialize Web3 with zkSync Plugin for Layer 2
  const web3 = new Web3(process.env.SEPOLIA_RPC_URL || "https://rpc2.sepolia.org");
  web3.registerPlugin(
    new ZKsyncPlugin(Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia)),
  );
  
  const zksync = web3.ZKsync;

  // Load and validate private key
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    throw new Error('Private key is required in the .env file');
  }

  // Initialize zkSync wallet with the private key
  const wallet = new zksync.Wallet("0xcd1e3ad2e67471d576b5fdca01b715a1f2149d41516e3524fc51589aa44cb9a7");

  // Get the deployed WasteToken and Paymaster contract addresses from environment
  const wasteTokenAddress = process.env.WASTE_TOKEN_ADDRESS;  // Ensure this is set in your .env file
  const paymasterAddress = process.env.PAYMASTER_ADDRESS;     // Ensure this is set in your .env file

  if (!wasteTokenAddress || !paymasterAddress) {
    throw new Error('WasteToken address and Paymaster address are required in the .env file');
  }

// Initialize WasteToken contract instance
//   const wasteTokenContract = new web3.eth.Contract(wasteTokenAbi, wasteTokenAddress);

const wasteTokenContract = new web3.eth.Contract(wasteTokenAbi, wasteTokenAddress);

// Define the amount of tokens to mint
const mintAmount = web3.utils.toWei('100', 'ether'); // 100 WasteToken (you can adjust the amount)

console.log(`Minting ${web3.utils.fromWei(mintAmount, 'ether')} WasteTokens to the Paymaster at ${paymasterAddress}...`);
console.log(wallet.address, "adreess");
try {
  // Create the transaction data for minting tokens
      // Create the transaction data for minting tokens
      const txData = wasteTokenContract.methods.mint(paymasterAddress, mintAmount).encodeABI();

      // Get current gas price and define gas parameters for EIP-1559
      const gasLimit = await web3.eth.estimateGas({
        from: wallet.address,
        to: wasteTokenAddress,
        data: txData,
      });
      const gasPrice = await web3.eth.getGasPrice();
      
      const maxPriorityFeePerGas = web3.utils.toWei('2', 'gwei');  
      const maxFeePerGas = web3.utils.toWei('50', 'gwei');         
  
      // Sign and send the transaction
      const signedTx = await web3.eth.accounts.signTransaction(
        {
          to: wasteTokenAddress,
          data: txData,
          gas: gasLimit,
          maxPriorityFeePerGas: maxPriorityFeePerGas,
          maxFeePerGas: maxFeePerGas,
          from: wallet.address,
        },
        "0xcd1e3ad2e67471d576b5fdca01b715a1f2149d41516e3524fc51589aa44cb9a7"
      );
  
      // Send the signed transaction
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
      console.log(`✅ Minting successful! Transaction hash: ${receipt.transactionHash}`);
    } catch (error) {
      console.error(`❌ Error minting tokens: ${error.message}`);
    }
  }

//   console.log(`Minting ${web3.utils.fromWei(mintAmount, 'ether')} WasteTokens to the Paymaster at ${paymasterAddress}...`);
//   const balance_sender_eth_before = await wallet.getBalance();
//   console.log(balance_sender_eth_before, "Sender ETH before");
//    // Supplying paymaster with ETH
//    console.log("Funding paymaster with ETH...");
  
//    const tx = 
//      await wallet.transfer({
//        to: paymasterAddress,
//        value: ethers.parseEther("0.06"),
//      })
//      const result = await tx.wait();
//      console.log("transaction", result.transactionHash);
//      const balance_sender_eth_after = await wallet.getBalance();

//      console.log(balance_sender_eth_after, "Sender ETH after(equal)");

//   try {
//     // Ensure the transaction is signed by the zkSync wallet
//     const tx = await contractFactory.methods.mint(paymasterAddress, mintAmount).send({
//       from: wallet.address,    // Use the wallet's address to mint
//       gas: 1000000,            // Set a gas limit, adjust if necessary
//     });

//     console.log(`✅ Minting successful! Transaction hash: ${tx.transactionHash}`);
//     console.log(`Paymaster contract has been minted ${web3.utils.fromWei(mintAmount, 'ether')} WasteTokens`);
//   } catch (error) {
//     console.error(`❌ Error minting tokens: ${error.message}`);
//   }
// }

main()
  .then(() => console.log('✅ Script executed successfully'))
  .catch((error) => {
    console.error(`❌ Error executing script: ${error}`);
    process.exit(1);
  });
