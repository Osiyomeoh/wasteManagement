

# WasteTokens: Blockchain-Based Waste Collection Rewards DApp

**WasteTokens** is a decentralized application (DApp) that incentivizes recycling by rewarding users with tokens for verified waste submissions. Users submit their waste to trusted waste collection centers, earn tokens, and redeem them for rewards, all while benefiting from gas-free transactions powered by zkSync’s paymaster.

## Project Overview

WasteTokens leverages zkSync’s paymaster feature to cover transaction fees using a designated token (e.g., stablecoins or a project-specific token), ensuring a seamless, gas-free experience for users. Users can submit waste, earn tokens, and redeem rewards without needing ETH for gas fees.

## Features

- **Wallet Connection**: Users can connect their Ethereum wallet (e.g., MetaMask) to the DApp.
- **Waste Submission**: Trusted waste collection centers submit verified waste on behalf of users, recording the submission on-chain.
- **Gas-Free Transactions**: Users do not pay any gas fees in ETH. zkSync’s paymaster funds transactions using an alternative token (e.g., stablecoins).
- **Token Rewards**: Users earn tokens for verified waste submissions and can redeem them for rewards.
- **Transaction History**: Users can view their waste submissions and reward redemptions with zero transaction fees shown (fees covered by the paymaster).

## Technology Stack

- **zkSync Paymaster**: zkSync’s paymaster feature is used to cover gas fees in designated tokens rather than ETH.
- **Next.js**: The frontend of the DApp is built with Next.js for a fast and efficient user experience.
- **Web3**: Interactions with the blockchain and wallet connection are powered by Web3.js.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version >= 18.17.0)
- **npm** or **yarn**
- **MetaMask** (or another Ethereum-compatible wallet)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-repo/waste-tokens.git
cd waste-tokens
npm install
```

## Running the App Locally

To run the DApp locally on your machine:

1. Ensure you have Node.js (>= 18.17.0) installed.
2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

4. Open your browser and go to `http://localhost:3000`.

## Smart Contracts Deployment

The smart contracts were deployed using the zkSync paymaster plugin to handle gas fees. The paymaster ensures that all user transactions (e.g., waste submissions and reward redemptions) are gas-free, with fees covered by designated tokens such as stablecoins.

### zkSync Paymaster Setup

The zkSync paymaster allows us to cover gas fees using alternative tokens rather than ETH. For this project, the paymaster is integrated with the waste collection and token reward system.

To deploy and interact with the contracts:

1. **Deploy Contracts**: Deploy the smart contracts using Hardhat and the zkSync paymaster plugin.

    ```bash
    npx hardhat run scripts/deploy.js --network zkSync
    ```

2. **Fund Paymaster**: Ensure the paymaster is funded with the designated token (e.g., stablecoins) to cover transaction fees.

## Frontend Interaction

The frontend of the DApp allows users to:

- **Connect Wallet**: Users connect their wallet to the DApp (MetaMask or any Ethereum-compatible wallet).
- **Submit Waste**: Verified waste submissions are recorded by trusted waste collection centers.
- **View Rewards**: Users can browse and redeem their earned tokens for rewards.
- **Transaction History**: Users can view past waste submissions and reward redemptions, with transaction fees showing as zero (paid by the paymaster).

## Environment Variables

Set up environment variables by creating a `.env.local` file at the root of the project and adding the following keys:

```bash
NEXT_PUBLIC_ZKSYNC_PAYMASTER_CONTRACT=<your_zksync_paymaster_contract_address>
NEXT_PUBLIC_INFURA_API_KEY=<your_infura_api_key>
NEXT_PUBLIC_CHAIN_ID=<network_chain_id>
NEXT_PUBLIC_REWARD_CONTRACT=<your_reward_contract_address>
```

## Deployment

The application can be deployed on any platform that supports Node.js. Ensure that the environment is set to Node.js version >= 18.17.0.

For example, to deploy on **Vercel**:

1. Link the project to your Vercel account.
2. Set the environment variables in Vercel.
3. Deploy the project.

Alternatively, the app can be deployed using **Fleek** or any other decentralized hosting provider.

## Contributing

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License.

---

