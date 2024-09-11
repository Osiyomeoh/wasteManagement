"use client";

import { useState, useEffect } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Web3 from "web3";
import { ZKsyncPlugin, Web3ZKsyncL2, types } from "web3-plugin-zksync";

// Import ABIs and parse ABI from JSON files
import fs from 'fs';
import path from 'path';


// Define the Transaction type
interface Transaction {
    type: string;
    weight?: number;
    tokens?: number;
    date: string;
  }

// Properly parse the ABI files
const wasteTokenArtifactPath = path.resolve(__dirname, './abis/WasteToken.json');
const wasteTokenAbi = JSON.parse(fs.readFileSync(wasteTokenArtifactPath).toString()).abi;

const wasteContractArtifactPath = path.resolve(__dirname, './abis/WasteToken/WasteCollectionRewards.json');
const wasteContractAbi = JSON.parse(fs.readFileSync(wasteContractArtifactPath).toString()).abi;

const paymasterArtifactPath = path.resolve(__dirname, './abis/Paymaster.json');
const paymasterAbi = JSON.parse(fs.readFileSync(paymasterArtifactPath).toString()).abi;


// zkSync provider initialization
const zkSyncProvider = Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia);
const web3 = new Web3();
web3.registerPlugin(new ZKsyncPlugin(zkSyncProvider));

// Addresses from environment variables
const wasteTokenAddress = process.env.NEXT_PUBLIC_WASTE_TOKEN_ADDRESS || "0xYourWasteTokenAddress";
const wasteContractAddress = process.env.NEXT_PUBLIC_WASTE_CONTRACT_ADDRESS || "0xYourWasteContractAddress";
const paymasterAddress = process.env.NEXT_PUBLIC_PAYMASTER_ADDRESS || "0xYourPaymasterAddress";

export default function WasteContractInteraction() {
  const { address, isConnected } = useAccount(); 
  const { data: walletClient } = useWalletClient(); 
  const [balance, setBalance] = useState<number | null>(null);
  const [wasteSubmissionLoading, setWasteSubmissionLoading] = useState(false);
  const [redeemRewardLoading, setRedeemRewardLoading] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);

  const zksync = web3.ZKsync;

  // Load and validate private key
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    throw new Error('Private key is required in the .env file');
  }

  // Initialize zkSync wallet with the private key
  const wallet = new zksync.Wallet("0xcd1e3ad2e67471d576b5fdca01b715a1f2149d41516e3524fc51589aa44cb9a7");

  // Initialize WasteToken, Paymaster, and WasteContract instances using zksync plugin
  const wasteTokenContract = new web3.eth.Contract(wasteTokenAbi, wasteTokenAddress);
  const wasteContract = new web3.eth.Contract(wasteContractAbi, wasteContractAddress);
  const paymasterContract = new web3.eth.Contract(paymasterAbi,paymasterAddress);

  // Fetch Waste Token balance
  // Fetch Waste Token balance
const fetchBalance = async () => {
    if (!walletClient?.account?.address) return;
  
    try {
      const balanceResult = await wasteTokenContract.methods.balanceOf(walletClient.account.address).call();
  
      // Check if balanceResult is a valid string and not an array or unexpected type
    if (balanceResult && typeof balanceResult === 'string') {
        const balance = web3.utils.fromWei(balanceResult, "ether"); // Convert from Wei to Ether
        setBalance(Number(balance)); // Set the balance as a number
      } else {
        console.error("Balance fetch returned an invalid value:", balanceResult);
        setBalance(0); // Default to 0 in case of invalid response
      }
        console.error("Balance fetch returned an invalid value:", balanceResult);
        setBalance(0); // Default to 0 in case of invalid response
      }
    catch (error) {
      console.error("Error fetching token balance:", error);
      setBalance(0); // Handle error case, default to 0
    }
  };
  

  const submitWaste = async (weightInKg: number) => {
    if (!walletClient?.account?.address) return;

    setWasteSubmissionLoading(true);

    try {
      // Encode the transaction data for waste submission
      const txData = wasteContract.methods.submitWaste(walletClient.account.address, weightInKg).encodeABI();

      // Prepare zkSync transaction with paymaster
      const tx = await wallet.sendTransaction({
        from: walletClient.account.address,
        to: wasteContractAddress,
        data: txData,
      });

      console.log(`Waste submitted successfully! ${weightInKg}kg`);

      // Record transaction in history
      setTransactionHistory((prev) => [
        ...prev,
        {
          type: "Waste Submission",
          weight: weightInKg,
          date: new Date().toISOString(),
        },
      ]);

      // Fetch updated balance
      fetchBalance();
    } catch (error) {
      console.error("Error submitting waste:", error);
    } finally {
      setWasteSubmissionLoading(false);
    }
  };

  // Redeem Tokens
  const redeemTokens = async (tokensToRedeem: number) => {
    if (!walletClient?.account?.address) return;

    setRedeemRewardLoading(true);

    try {
      // Encode the transaction data for token redemption
      const txData = wasteContract.methods.redeemTokens(tokensToRedeem).encodeABI();

      // Estimate gas and sign the transaction using zkSync paymaster
      const gasLimit = await wallet.sendTransaction({
        from: walletClient.account.address,
        to: wasteContractAddress,
        data: txData,
      });

      // Use paymaster to cover fees for redemption
      const paymasterTx = await paymasterContract.methods.addDeposit(walletClient.account.address, gasLimit).send({
        from: walletClient.account.address,
      });

      console.log(`Successfully redeemed ${tokensToRedeem} WasteTokens`);

      // Record transaction in history
      setTransactionHistory((prev) => [
        ...prev,
        {
          type: "Tokens Redeemed",
          tokens: tokensToRedeem,
          date: new Date().toISOString(),
        },
      ]);

      // Fetch updated balance
      fetchBalance();
    } catch (error) {
      console.error("Error redeeming tokens:", error);
    } finally {
      setRedeemRewardLoading(false);
    }
  };

  // Fetch data on mount and when wallet is connected
  useEffect(() => {
    if (isConnected) {
      fetchBalance();
    }
  }, [isConnected, walletClient]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-purple-700 text-white">
      <h1 className="text-2xl font-bold mb-4">WasteTokens DApp</h1>

      {/* Connect Wallet Button */}
      <ConnectButton />

      {isConnected ? (
        <>
          <div className="mt-4">
            <button
              onClick={() => submitWaste(5)} // Example: Submitting 5kg of waste
              className={`px-4 py-2 bg-black text-white rounded ${wasteSubmissionLoading ? "opacity-50" : ""}`}
              disabled={wasteSubmissionLoading}
            >
              {wasteSubmissionLoading ? "Submitting..." : "Submit 5kg Waste"}
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={() => redeemTokens(50)} // Example: Redeeming 50 tokens
              className={`px-4 py-2 bg-green-500 text-white rounded ${redeemRewardLoading ? "opacity-50" : ""}`}
              disabled={redeemRewardLoading}
            >
              {redeemRewardLoading ? "Redeeming..." : "Redeem 50 Tokens"}
            </button>
          </div>

          <div className="mt-4">
            <button onClick={fetchBalance} className="px-4 py-2 bg-blue-500 text-white rounded">
              Check Token Balance
            </button>
            {balance !== null && (
              <p>Your Waste Token Balance: {balance} WASTE</p>
            )}
          </div>

          {/* Transaction History */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Transaction History</h2>
            {transactionHistory.length > 0 ? (
              <ul className="list-disc mt-4">
                {transactionHistory.map((txn, index) => (
                  <li key={index} className="mb-2">
                    {txn.type}: {txn.weight ? `${txn.weight} kg` : `${txn.tokens} Tokens`} - {new Date(txn.date).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transactions yet.</p>
            )}
          </div>
        </>
      ) : (
        <p>Please connect your wallet to interact with the WasteTokens DApp.</p>
      )}
    </div>
  );
}
