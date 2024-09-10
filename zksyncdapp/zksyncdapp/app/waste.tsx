"use client";

import { useState, useEffect } from "react";
import { useAccount, useSigner } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Web3 from "web3";
import { ZKsyncPlugin, Web3ZKsyncL2, ZKsyncWallet } from "web3-plugin-zksync";
import wasteTokenAbi from "./abis/WasteToken.json";
import wasteContractAbi from "./abis/WasteContract.json";
import paymasterAbi from "./abis/Paymaster.json";

// zkSync provider initialization
const zkSyncProvider = Web3ZKsyncL2.initWithDefaultProvider(Web3ZKsyncL2.Network.Sepolia);
const web3 = new Web3();
web3.registerPlugin(new ZKsyncPlugin(zkSyncProvider));

// Addresses from environment variables
const wasteTokenAddress = process.env.NEXT_PUBLIC_WASTE_TOKEN_ADDRESS || "0xYourWasteTokenAddress";
const wasteContractAddress = process.env.NEXT_PUBLIC_WASTE_CONTRACT_ADDRESS || "0xYourWasteContractAddress";
const paymasterAddress = process.env.NEXT_PUBLIC_PAYMASTER_ADDRESS || "0xYourPaymasterAddress";

export default function WasteContractInteraction() {
  const { address, isConnected } = useAccount(); // Get wallet connection status
  const { data: signer } = useSigner(); // Get the wallet signer
  const [balance, setBalance] = useState<number | null>(null);
  const [wasteSubmissionLoading, setWasteSubmissionLoading] = useState(false);
  const [redeemRewardLoading, setRedeemRewardLoading] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]); // Store user transactions

  // Initialize zkSync Wallet with the signer
  const zkSyncWallet = signer ? new ZKsyncWallet(signer) : null;

  // Initialize contracts using zksync plugin
  const wasteTokenContract = new web3.ZKsync.Contract(wasteTokenAddress, wasteTokenAbi, zkSyncWallet);
  const wasteContract = new web3.ZKsync.Contract(wasteContractAddress, wasteContractAbi, zkSyncWallet);
  const paymasterContract = new web3.ZKsync.Contract(paymasterAddress, paymasterAbi, zkSyncWallet);

  // Fetch Waste Token balance
  const fetchBalance = async () => {
    if (!zkSyncWallet || !address) return;

    try {
      const balance = await wasteTokenContract.methods.balanceOf(address).call();
      setBalance(Number(Web3.utils.fromWei(balance, "ether")));
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };

  // Waste Submission
  const submitWaste = async (weightInKg: number) => {
    if (!zkSyncWallet || !address) return;

    setWasteSubmissionLoading(true);

    try {
      // Encode the transaction data for waste submission
      const txData = wasteContract.methods.submitWaste(address, weightInKg).encodeABI();

      // Estimate gas and submit the transaction
      const gasLimit = await web3.ZKsync.estimateGas({
        from: address,
        to: wasteContractAddress,
        data: txData,
      });

      // Use paymaster to cover fees
      await paymasterContract.methods.addDeposit(address, gasLimit).send({ from: address });

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
    if (!zkSyncWallet || !address) return;

    setRedeemRewardLoading(true);

    try {
      // Encode the transaction data for token redemption
      const txData = wasteContract.methods.redeemTokens(tokensToRedeem).encodeABI();

      // Estimate gas and redeem the tokens
      const gasLimit = await web3.ZKsync.estimateGas({
        from: address,
        to: wasteContractAddress,
        data: txData,
      });

      // Use paymaster to cover fees for redemption
      await paymasterContract.methods.addDeposit(address, gasLimit).send({ from: address });

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
  }, [isConnected, signer]);

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
