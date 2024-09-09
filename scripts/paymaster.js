const dotenv = require('dotenv');
dotenv.config();
const { Contract, Web3 } = require("web3");
const {
  ContractFactory,
  types,
  Web3ZKsyncL2,
  ZKsyncPlugin,
  ZKsyncWallet,
} = require('web3-plugin-zksync');
const fs = require('fs');
const path = require('path');

// Load ABI and bytecode from the compiled contract
const contractArtifactPath = path.resolve(__dirname, '../artifacts-zk/contracts/MyPaymaster.sol/MyPaymaster.json');
const contractAbi = JSON.parse(fs.readFileSync(contractArtifactPath).toString()).abi;
const contractBytecode = JSON.parse(fs.readFileSync(contractArtifactPath).toString()).bytecode;

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

  // Ensure the private key is a string and valid
  const privateKeyString = typeof PRIVATE_KEY === 'string' ? PRIVATE_KEY : String(PRIVATE_KEY);
  if (!privateKeyString.match(/^[a-fA-F0-9]{64}$/)) {
    throw new Error('Private key is not a valid 64-character hex string');
  }

  console.log(`Private key successfully loaded: ${privateKeyString}`);

  // Initialize zkSync wallet
  const wallet = new zksync.Wallet("0xcd1e3ad2e67471d576b5fdca01b715a1f2149d41516e3524fc51589aa44cb9a7");

  // Create contract factory with the ABI and bytecode
  const contractFactory = new ContractFactory(contractAbi, contractBytecode, wallet);

  // Define constructor arguments
  const erc20Address = process.env.ERC20_ADDRESS; // Ensure this is set in your .env file
//   const feeAmount = process.env.FEE_AMOUNT || web3.utils.toWei('1', 'ether'); // Default to 1 token unit

  if (!erc20Address) {
    throw new Error('ERC20 token address is required in the .env file');
  }
//   const erc20TokenAddress = '0xYourERC20TokenAddress'; // Replace with the actual ERC20 token address
  const constructorArgs = [erc20Address];

  // Deploy the contract
  try {
    const contract = await contractFactory.deploy(constructorArgs);
    console.log('Contract deployed at address:', contract.options.address);
    console.log('Contract methods:', contract.methods);
  } catch (error) {
    console.error('Error deploying contract:', error);
  }
}

main()
  .then(() => console.log('✅ Deployment script executed successfully'))
  .catch((error) => {
    console.error(`❌ Error executing deployment script: ${error}`);
    process.exit(1);
  });
