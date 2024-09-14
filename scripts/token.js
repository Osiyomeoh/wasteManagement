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
const path = require('path')

// Load ABI and bytecode of the ERC-20 contract
const contractAbi = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../artifacts-zk/contracts/wasteToken.sol/WasteToken.json')).toString()
).abi;
const contractBytecode = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../artifacts-zk/contracts/wasteToken.sol/WasteToken.json')).toString()
).bytecode;

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
const wallet = new zksync.Wallet("0xcd1e3ad2e67471d576b5fdca01b715a1f2149d41516e3524fc51589aa44cb9a7");

  // ContractFactory for ERC-20 token deployment
  const contractFactory = new ContractFactory(contractAbi, contractBytecode, wallet);

  // Deploy the ERC-20 token with an initial supply (e.g., 1 million tokens)
  const initialSupply = web3.utils.toWei('1000000', 'ether');  // 1 million tokens
  const contract = await contractFactory.deploy([initialSupply]);

  console.log('ERC-20 Token deployed at address:', contract.options.address);
  console.log('Token methods:', contract.methods);
}

main()
  .then(() => console.log('✅ Token deployment successful'))
  .catch((error) => console.error(`❌ Error deploying token: ${error}`));
