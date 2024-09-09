const dotenv = require('dotenv');
dotenv.config();
const { Bytes, Contract, Web3 } = require("web3");
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
const contractArtifactPath = path.resolve(__dirname, '../artifacts-zk/contracts/WasteCollectionRewards.sol/WasteCollectionRewards.json');
const contractAbi = JSON.parse(fs.readFileSync(contractArtifactPath).toString()).abi;
const contractBytecode = JSON.parse(fs.readFileSync(contractArtifactPath).toString()).bytecode;

async function main() {
  // Initialize Web3 with zkSync Plugin for Layer 2
  const web3 = new Web3(process.env.SEPOLIA_RPC_URL || "https://rpc2.sepolia.org");
  web3.registerPlugin(
    new ZKsyncPlugin(Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia)),
  );
  const zksync = web3.ZKsync;

  const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  throw new Error('Private key is required in the .env file');
}

// Ensure the private key is a string
const privateKeyString = typeof PRIVATE_KEY === 'string' ? PRIVATE_KEY : String(PRIVATE_KEY);

// Perform additional checks for valid length (64 characters hex without 0x prefix)
if (!privateKeyString.match(/^[a-fA-F0-9]{64}$/)) {
  throw new Error('Private key is not a valid 64-character hex string');
}

console.log(`Private key successfully loaded: ${privateKeyString}`);

  const wallet = new zksync.Wallet("0xcd1e3ad2e67471d576b5fdca01b715a1f2149d41516e3524fc51589aa44cb9a7");

  // ContractFactory with "create" deployment type (non-deterministic address)
  const contractFactory = new ContractFactory(contractAbi, contractBytecode, wallet);

  // Optionally, deploy with constructor arguments
  const constructorArgs = []; // If the contract has constructor params, add them here

  try {
    const contract = await contractFactory.deploy(constructorArgs);
    console.log('Contract deployed at address:', contract.options.address);
    console.log('Contract methods:', contract.methods);
  } catch (error) {
    console.error('Error deploying contract:', error);
  }
}

main()
  .then(() => console.log('✅ Script executed successfully'))
  .catch((error) => console.error(`❌ Error executing script: ${error}`));
