require("@matterlabs/hardhat-zksync");
require("@matterlabs/hardhat-zksync-solc");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  zksolc: {
    version: "1.5.3",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "zkSyncTestnet",
  networks: {
    zkSyncTestnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "sepolia",
      zksync: true,
      accounts: ["0xcd1e3ad2e67471d576b5fdca01b715a1f2149d41516e3524fc51589aa44cb9a7"], // Make sure the private key is loaded correctly
    },
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
