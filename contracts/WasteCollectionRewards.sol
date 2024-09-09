// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WasteCollectionRewards {

    struct WasteCollector {
        uint256 totalWasteCollected;  
        uint256 totalTokensEarned;    
    }

    struct TransactionHistory {
        uint256 amount;
        string transactionType;
        uint256 tokensAffected;
        uint256 transactionCost;  
        uint256 timestamp;
    }

    mapping(address => WasteCollector) public collectors;
    mapping(address => bool) public trustedCenters;
    mapping(address => TransactionHistory[]) public transactionHistories;

    address public admin;
    uint256 public tokensPerKg = 10;

    event WasteSubmitted(address indexed collector, uint256 weight, uint256 tokensEarned);
    event TokensRedeemed(address indexed collector, uint256 tokensRedeemed);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyTrustedCenter() {
        require(trustedCenters[msg.sender], "Only trusted centers can submit waste");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // Admin can set trusted waste collection centers
    function setTrustedCenter(address center, bool isTrusted) public onlyAdmin {
        trustedCenters[center] = isTrusted;
    }

    // Waste centers submit the waste on behalf of the user
    function submitWaste(address user, uint256 weightInKg) public onlyTrustedCenter {
        require(weightInKg > 0, "Weight must be greater than zero");

        uint256 tokensEarned = weightInKg * tokensPerKg;

        collectors[user].totalWasteCollected += weightInKg;
        collectors[user].totalTokensEarned += tokensEarned;

        // Record the transaction in history with zero fees
        transactionHistories[user].push(TransactionHistory({
            amount: weightInKg,
            transactionType: "Waste Submitted",
            tokensAffected: tokensEarned,
            transactionCost: 0,  // Gas fee is covered by paymaster
            timestamp: block.timestamp
        }));

        emit WasteSubmitted(user, weightInKg, tokensEarned);
    }

    function redeemTokens(uint256 tokens) public {
        require(tokens > 0, "Must redeem more than 0 tokens");
        require(collectors[msg.sender].totalTokensEarned >= tokens, "Insufficient tokens");

        collectors[msg.sender].totalTokensEarned -= tokens;

        // Record the redemption in history with zero fees
        transactionHistories[msg.sender].push(TransactionHistory({
            amount: tokens,
            transactionType: "Tokens Redeemed",
            tokensAffected: tokens,
            transactionCost: 0,  
            timestamp: block.timestamp
        }));

        emit TokensRedeemed(msg.sender, tokens);
    }

    function setTokensPerKg(uint256 newRate) public onlyAdmin {
        tokensPerKg = newRate;
    }

    // Fetch transaction history for a user
    function getTransactionHistory(address user) public view returns (TransactionHistory[] memory) {
        return transactionHistories[user];
    }
}
