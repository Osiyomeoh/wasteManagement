"use client";

import { useState, useEffect } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Web3 from "web3";
import { ZKsyncPlugin, Web3ZKsyncL2, types,getPaymasterParams } from "web3-plugin-zksync";

// Define the Transaction type
interface Transaction {
    type: string;
    weight?: number;
    tokens?: number;
    date: string;
}

// Directly import ABI JSON files as modules
import wasteToken from './abis/WasteToken.json';
// import WasteCollectionRewards from './abis/WasteCollectionRewards.json';
// import MyPaymaster from './abis/MyPaymaster.json';

// zkSync provider initialization
const web3 = new Web3(process.env.SEPOLIA_RPC_URL || "https://rpc2.sepolia.org");
web3.registerPlugin(
  new ZKsyncPlugin(Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia))
);

// Addresses from environment variables
const wasteTokenAddress = process.env.NEXT_PUBLIC_WASTE_TOKEN_ADDRESS || "0xYourWasteTokenAddress";
const wasteContractAddress = process.env.NEXT_PUBLIC_WASTE_CONTRACT_ADDRESS || "0xYourWasteContractAddress";
const paymasterAddress = process.env.NEXT_PUBLIC_PAYMASTER_ADDRESS || "0xYourPaymasterAddress";

export default function WasteContractInteraction() {
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [balance, setBalance] = useState<number | null>(null);
  const [wasteSubmissionLoading, setWasteSubmissionLoading] = useState(false);
  const [redeemRewardLoading, setRedeemRewardLoading] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  const [trustedCenterLoading, setTrustedCenterLoading] = useState(false); // New state for trusted center
  const [centerAddress, setCenterAddress] = useState(''); // State for the input address

  const zksync = web3.ZKsync;

  const wallet = new zksync.Wallet("0xcd1e3ad2e67471d576b5fdca01b715a1f2149d41516e3524fc51589aa44cb9a7");

  // Initialize WasteToken, Paymaster, and WasteContract instances using zksync plugin
  const wasteTokenContract = new web3.eth.Contract(wasteToken.abi, wasteTokenAddress);
  // const wasteContract = new web3.eth.Contract(WasteCollectionRewards.abi, wasteContractAddress);
  // const paymasterContract = new web3.eth.Contract(MyPaymaster.abi, paymasterAddress);

  // Fetch Waste Token balance
  const fetchBalance = async () => {
    if (!walletClient?.account?.address) {
      console.error("Wallet client or account address is missing.");
      return;
    }

    try {
      const balanceResult = await wasteTokenContract.methods.balanceOf(walletClient.account.address).call();

      if (balanceResult && typeof balanceResult === "string") {
        const balance = web3.utils.fromWei(balanceResult, "ether");
        setBalance(Number(balance));
      } else {
        console.error("Invalid balance result returned:", balanceResult);
        setBalance(0);
      }
    } catch (error) {
      console.error("Error fetching token balance:", error);
      setBalance(0);
    }
  };


  // Submit waste function (same as before)
  // Submit waste function
const submitWaste = async (weightInKg: number) => {
  if (!walletClient?.account?.address) return;

  setWasteSubmissionLoading(true);

  try {
    // Encode the transaction data for waste submission
    // const txData = wasteContract.methods.submitWaste(walletClient.account.address, weightInKg).encodeABI();

    // Call wallet.transfer using the Paymaster
    const tx = await wallet.transfer({
      token: wasteTokenAddress, // Token you are interacting with (can be USDC or any other token)
      to: wasteContractAddress, // Waste contract address
      amount: 0, // Assuming no tokens are transferred, you are only executing a contract call
      paymasterParams: getPaymasterParams(paymasterAddress, {
        type: "ApprovalBased",
        token: wasteTokenAddress, // Approval token
        minimalAllowance: web3.utils.toWei("1", "ether"), // Example minimal allowance
        innerInput: new Uint8Array(),
      }),
    });

    const result = await tx.wait();
    console.log(`Waste submitted successfully! Transaction Hash: ${result.transactionHash}`);
    setTransactionHistory((prev) => [...prev, { type: "Waste Submission", weight: weightInKg, date: new Date().toISOString() }]);
    fetchBalance();
  } catch (error) {
    console.error("Error submitting waste:", error);
  } finally {
    setWasteSubmissionLoading(false);
  }
};

// Redeem tokens function
const redeemTokens = async (tokensToRedeem: number) => {
  if (!walletClient?.account?.address) return;

  setRedeemRewardLoading(true);

  try {
    // const txData = wasteContract.methods.redeemTokens(tokensToRedeem).encodeABI();

    // Use Paymaster in a similar way to your transfer example
    const tx = await wallet.transfer({
      token: wasteTokenAddress,
      to: wasteContractAddress,
      amount: 0, // No tokens transferred, just a contract call
      paymasterParams: getPaymasterParams(paymasterAddress, {
        type: "ApprovalBased",
        token: wasteTokenAddress,
        minimalAllowance: web3.utils.toWei("1", "ether"), // Example minimal allowance
        innerInput: new Uint8Array(),
      }),
    });

    const result = await tx.wait();
    console.log(`Tokens redeemed successfully! Transaction Hash: ${result.transactionHash}`);
    setTransactionHistory((prev) => [...prev, { type: "Tokens Redeemed", tokens: tokensToRedeem, date: new Date().toISOString() }]);
    fetchBalance();
  } catch (error) {
    console.error("Error redeeming tokens:", error);
  } finally {
    setRedeemRewardLoading(false);
  }
};

// Set Trusted Center function
const setTrustedCenter = async () => {
  if (!walletClient?.account?.address) return;

  setTrustedCenterLoading(true);

  try {
    // const txData = wasteContract.methods.setTrustedCenter(center, isTrusted).encodeABI();

    // Use Paymaster for trusted center update
    const tx = await wallet.transfer({
      token: wasteTokenAddress, // Or another token depending on your use case
      to: wasteContractAddress,
      amount: 0, // No tokens transferred, just a contract call
      paymasterParams: getPaymasterParams(paymasterAddress, {
        type: "ApprovalBased",
        token: wasteTokenAddress, // Approval token
        minimalAllowance: web3.utils.toWei("1", "ether"),
        innerInput: new Uint8Array(),
      }),
    });

    const result = await tx.wait();
    console.log(`Trusted Center updated successfully! Transaction Hash: ${result.transactionHash}`);
  } catch (error) {
    console.error("Error setting trusted center:", error);
  } finally {
    setTrustedCenterLoading(false);
  }
};


  // Fetch data on mount and when wallet is connected
  useEffect(() => {
    if (isConnected) {
     
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
            <button onClick={() => submitWaste(5)} className={`px-4 py-2 bg-black text-white rounded ${wasteSubmissionLoading ? "opacity-50" : ""}`} disabled={wasteSubmissionLoading}>
              {wasteSubmissionLoading ? "Submitting..." : "Submit 5kg Waste"}
            </button>
          </div>

          <div className="mt-4">
            <button onClick={() => redeemTokens(50)} className={`px-4 py-2 bg-green-500 text-white rounded ${redeemRewardLoading ? "opacity-50" : ""}`} disabled={redeemRewardLoading}>
              {redeemRewardLoading ? "Redeeming..." : "Redeem 50 Tokens"}
            </button>
          </div>

          <div className="mt-4">
            <button onClick={fetchBalance} className="px-4 py-2 bg-blue-500 text-white rounded">Check Token Balance</button>
            {balance !== null && <p>Your Waste Token Balance: {balance} WASTE</p>}
          </div>

          {/* Trusted Center form */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Set Trusted Center</h2>
            <input
              type="text"
              placeholder="Enter center address"
              value={centerAddress}
              onChange={(e) => setCenterAddress(e.target.value)}
              className="mt-4 p-2 text-black"
            />
            <button onClick={() => setTrustedCenter()} className={`px-4 py-2 bg-green-500 text-white rounded mt-4 ${trustedCenterLoading ? "opacity-50" : ""}`} disabled={trustedCenterLoading}>
              {trustedCenterLoading ? "Updating..." : "Set Trusted Center"}
            </button>
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
