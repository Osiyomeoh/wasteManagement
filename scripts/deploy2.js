const { Bytes, Contract, ContractAbi, Web3 } = require("web3");
const {
  ContractFactory,
  types,
  Web3ZKsyncL2,
  ZKsyncPlugin,
  ZKsyncWallet,
} = require("web3-plugin-zksync");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

async function main() {
  try {
    // Initialize Web3 instance with zkSync Era L2 support
    const web3 = new Web3(process.env.SEPOLIA_RPC_URL || "https://sepolia.era.zksync.dev");
    web3.registerPlugin(
      new ZKsyncPlugin(Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia))
    );

    const zksync = web3.ZKsync;

    // Retrieve the private key and RPC URL from environment variables
    const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
    
    if (!PRIVATE_KEY) {
      throw new Error("Private key not found in environment variables");
    }

  

    console.log("✅ Private key and zkSync RPC URL loaded successfully", PRIVATE_KEY);

    // Initialize a wallet using the private key
    const wallet = new zksync.Wallet("0xcd1e3ad2e67471d576b5fdca01b715a1f2149d41516e3524fc51589aa44cb9a7");

    // Load ABI and Bytecode from the compiled contract
    const contractPath = "./artifacts-zk/contracts/DataStorage.sol/DataStorage.json";

    if (!fs.existsSync(contractPath)) {
      throw new Error(`Contract file not found at ${contractPath}`);
    }

    console.log("✅ Contract file found at:", contractPath);

    const contractData = JSON.parse(fs.readFileSync(contractPath, "utf8"));

    const contractAbi = contractData.abi;
    const contractBytecode = contractData.bytecode;

    if (!contractAbi || !contractBytecode) {
      throw new Error("ABI or bytecode missing from the contract JSON file");
    }

    console.log("✅ ABI and Bytecode loaded");

    // Create a ContractFactory using the ABI, bytecode, and wallet
    const contractFactory = new ContractFactory(
      contractAbi,
      contractBytecode,
      wallet
    );

    // Deploy the contract
    const contract = await contractFactory.deploy();

    if (!contract || !contract.options || !contract.options.address) {
      throw new Error("Failed to deploy contract");
    }

    console.log("✅ Contract deployed successfully!");
    console.log("Contract address:", contract.options.address);
  } catch (error) {
    console.error(`❌ Error executing script: ${error.message}`);
  }
}

main()
  .then(() => console.log("✅ Script executed successfully"))
  .catch((error) => console.error(`❌ Error in main: ${error.message}`));
