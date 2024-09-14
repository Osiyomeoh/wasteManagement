Product Requirements Document (PRD)

Project Title:
WasteTokens: Blockchain-Based Waste Collection Rewards App

Project Overview:
WasteTokens is a blockchain-based decentralized application (DApp) designed to reward users for verified waste submissions by trusted waste collection centers. The app uses zkSync’s paymaster feature, allowing users to interact with the blockchain without paying gas fees. Instead, transaction fees are covered using a designated token (e.g., stablecoins or utility tokens), rather than requiring ETH. This ensures a seamless and cost-free experience for users when submitting waste or redeeming rewards.

Target Audience:
Primary Users: Individuals involved in recycling programs, who want to earn tokens for verified waste submissions.
Secondary Users: Trusted waste collection centers and local businesses offering rewards.

Goals:
Accurate Waste Submissions: All waste submissions are verified by trusted waste collection centers to ensure accurate token rewards.
Gas-Free Interactions Using Tokens: zkSync’s paymaster is funded by a designated token (e.g., stablecoins or project-specific tokens) to cover transaction fees, so users do not need to hold or spend ETH.
Clear Transaction History: Users can view their submission and redemption history, including transaction fees paid by the designated token, but shown as zero for users.
Simple, Efficient User Flow: Minimal user input required, focusing on an easy-to-use interface for submitting waste and redeeming rewards.

Core Features:
Connect Wallet: Users connect their Ethereum wallet (e.g., MetaMask) to interact with the DApp.
Submit Waste: Users visit trusted waste collection centers to submit waste, and the verified waste is recorded on-chain.
Redeem Rewards: Users redeem tokens earned for rewards.
View Transaction History: Users can view their waste submission and token redemption history, with zero transaction fees displayed, since the paymaster covers the fees using a designated token.
Gas-Free Transactions: Users do not pay any transaction fees in ETH. Instead, the zkSync paymaster funds transactions using an alternative token (e.g., stablecoins).

User Flow Overview:
1. Onboarding (Optional):
Scenario: A new user visits the WasteTokens DApp for the first time.
Flow:
Welcome Screen: The user is introduced to the app and its key features: verified waste submissions, token rewards, and redeeming rewards.
Connect Wallet: The user is prompted to connect their Ethereum wallet (e.g., MetaMask). Once connected, the user’s wallet address is displayed on the dashboard.
2. Dashboard:
Scenario: The user views their current stats on the dashboard.
Flow:
View Stats: The dashboard displays the user’s total waste collected (in kilograms) and total tokens earned.
Submit Waste: A “Submit Waste” button directs the user to the nearest trusted waste collection center, where they can submit waste to earn tokens.
Redeem Rewards: A “Redeem Rewards” button allows the user to browse available rewards and use their tokens for redemption.
View Transaction History: The user can check their submission and redemption history by navigating to the “Transaction History” screen.
3. Submit Waste (At Trusted Centers):
Scenario: The user submits waste at a trusted waste collection center.
Flow:
Visit Collection Center: The user brings their waste to a trusted collection center.
Center Weighs Waste: The waste is weighed and verified by the center.
Submit Waste via DApp: The trusted center submits the waste on behalf of the user, specifying the weight and the user’s wallet address.
Transaction Signed and Paymaster Covers Fees: The user signs the transaction (if needed), and zkSync’s paymaster covers the gas fees using a designated token (e.g., stablecoins or project-specific tokens).
Earn Tokens: Upon successful submission, the user’s token balance is updated, and they see the tokens earned for the submission.
Transaction Recorded: The submission is recorded in the user’s transaction history, with the transaction cost showing as zero for the user (fees covered by the paymaster).
4. Redeem Rewards:
Scenario: The user wants to redeem their earned tokens for rewards.
Flow:
Browse Rewards: The user clicks “Redeem Rewards” to browse a list of available rewards (e.g., vouchers, discounts).
Select Reward: The user selects a reward and clicks the “Redeem” button.
Transaction Signed and Paymaster Covers Fees: The user signs the transaction, and zkSync’s paymaster covers the gas fees using the designated token.
Reward Confirmation: Upon successful redemption, the user receives confirmation of the reward, and their token balance is updated.
Transaction Recorded: The redemption is recorded in the user’s transaction history, with the transaction cost showing as zero for the user (fees covered by the paymaster).
5. Transaction History:
Scenario: The user checks their past activity on the platform.
Flow:
View Transaction History: The user can see all past waste submissions and token redemptions.
Zero-Fee Transactions: Each transaction will display the amount of waste submitted, tokens earned or redeemed, and the zero-fee transaction cost for the user, while the paymaster handles the real cost using the designated token.

Screens:
1. Home/Dashboard Screen:
Purpose: Display user statistics and provide navigation to submit waste or redeem rewards.
Key Elements:
Total waste submitted (in kilograms).
Total tokens earned.
Call-to-action buttons: “Submit Waste,” “Redeem Rewards,” and “View Transaction History.”
Wallet address display after connection.
2. Submit Waste Screen:
Purpose: Waste is submitted by trusted collection centers on behalf of the user.
Key Elements:
QR code or user wallet ID used for submission.
Weight of waste submitted.
Tokens earned for the submission.
Transaction fee: Displayed as zero fees for the user (covered by the designated token via the zkSync paymaster).
Confirmation of successful submission.
3. Rewards Screen:
Purpose: Allow users to redeem their tokens for rewards.
Key Elements:
List of available rewards.
Tokens required for each reward.
Redeem button with confirmation modal.
Transaction fee: Displayed as zero fees for the user (covered by the designated token via the zkSync paymaster).
4. Transaction History Screen:
Purpose: Allow users to view past waste submissions and reward redemptions.
Key Elements:
List of all waste submissions (with weight, tokens earned, date, and transaction cost).
List of all reward redemptions (with tokens spent, reward redeemed, date, and transaction cost).
Zero-fee transactions: Each transaction will display the fee as 0, with the paymaster using a designated token to cover the actual transaction cost.

Key Features to Emphasize:
Gas-Free Transactions Using Tokens:
zkSync’s paymaster covers all transaction fees using a designated token (e.g., stablecoins), allowing users to submit waste and redeem rewards without paying any gas fees in ETH.
Users experience seamless interactions, with the paymaster funding transactions using tokens from a predefined source (e.g., the DApp’s token treasury or partner tokens).
Accurate Waste Submissions:
Waste submissions are verified by trusted collection centers to ensure accurate measurements and token rewards.
Users can trust that the tokens they receive are based on verified data from authorized sources.
Simple User Experience:
The DApp maintains a simple, intuitive design with minimal screens (Dashboard, Submit Waste, Rewards, Transaction History) for easy navigation.
Blockchain interactions are seamless, allowing users to focus on earning tokens and redeeming rewards.

Paymaster and Token Integration:
Designated Token for Fees: Instead of using ETH for gas fees, zkSync’s paymaster allows the use of alternative tokens (e.g., stablecoins or the app’s native token) to cover transaction costs. The user experiences zero fees, but the paymaster deducts tokens from a treasury or external funding source.
Smart Contract Handling: Transactions initiated by the user (e.g., waste submission or reward redemption) will include the paymasterParams to trigger zkSync’s paymaster, which covers the transaction fee using the designated token.





