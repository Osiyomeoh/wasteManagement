"use client";

import { useState, useEffect } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Web3 from "web3";
import { ZKsyncPlugin, Web3ZKsyncL2, types, getPaymasterParams } from "web3-plugin-zksync";

// Define the Transaction type
interface Transaction {
  type: string;
  weight?: number;
  tokens?: number;
  date: string;
}

// Define Paymaster balance type
interface PaymasterBalance {
  eth: number;
}

//import wasteToken from './abis/WasteToken.json';

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
  const [balance, setBalance] = useState<{ eth: number; customToken: number } | null>(null);
  const [paymasterBalance, setPaymasterBalance] = useState<PaymasterBalance | null>(null);
  const [previousBalance, setPreviousBalance] = useState<number | null>(null);
  const [wasteSubmissionLoading, setWasteSubmissionLoading] = useState(false);
  const [redeemRewardLoading, setRedeemRewardLoading] = useState(false);
  const [mintingLoading, setMintingLoading] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  const [trustedCenterLoading, setTrustedCenterLoading] = useState(false);
  const [centerAddress, setCenterAddress] = useState('');
  const [ethBalance, setEthBalance] = useState<number | null>(null);

  const zksync = web3.ZKsync;
  const wallet = new zksync.Wallet("0xcd1e3ad2e67471d576b5fdca01b715a1f2149d41516e3524fc51589aa44cb9a7");
  const l2Provider = wallet.provider; // Ensure this is not undefined

  const fetchBalance = async () => {
    if (!walletClient?.account?.address || !l2Provider) {
      console.error("Wallet client or L2 provider is missing.");
      return;
    }

    try {
      const senderAddress = walletClient.account.address;
      const customTokenAddress = process.env.NEXT_PUBLIC_WASTE_TOKEN_ADDRESS || "0xYourWasteTokenAddress";

      const balanceSenderEth = await l2Provider.getBalance(senderAddress);
      const balanceSenderCustomToken = await l2Provider.getTokenBalance(customTokenAddress, senderAddress);

      const balanceEth = web3.utils.fromWei(balanceSenderEth, "ether");
      const balanceCustomToken = web3.utils.fromWei(balanceSenderCustomToken, "ether");

      setBalance({
        eth: Number(balanceEth),
        customToken: Number(balanceCustomToken),
      });

      // Update ETH balance state
      setEthBalance(Number(balanceEth));
    } catch (error) {
      console.error("Error fetching balances:", error);
      setBalance({ eth: 0, customToken: 0 });
      setEthBalance(null);
    }
  };

  const fetchPaymasterBalance = async () => {
    if (!l2Provider) {
      console.error("L2 provider is missing.");
      return;
    }

    try {
      const paymasterBalance = await l2Provider.getBalance(paymasterAddress);
      const balanceEth = web3.utils.fromWei(paymasterBalance, "ether");
      setPaymasterBalance({
        eth: Number(balanceEth),
      });
    } catch (error) {
      console.error("Error fetching paymaster balance:", error);
      setPaymasterBalance({ eth: 0 });
    }
  };

  const submitWaste = async (weightInKg: number) => {
    if (!walletClient?.account?.address) return;

    setWasteSubmissionLoading(true);

    try {
      await fetchBalance();
      setPreviousBalance(balance?.customToken ?? 0); // Set the balance before the transaction

      const tx = await wallet.transfer({
        token: wasteTokenAddress,
        to: wasteContractAddress,
        amount: 0,
        paymasterParams: getPaymasterParams(paymasterAddress, {
          type: "ApprovalBased",
          token: wasteTokenAddress,
          minimalAllowance: web3.utils.toWei("1", "ether"),
          innerInput: new Uint8Array(),
        }),
      });

      const result = await tx.wait();
      console.log(`Waste submitted successfully! Transaction Hash: ${result.transactionHash}`);

      await fetchBalance();
      await fetchPaymasterBalance();

      setTransactionHistory((prev) => [
        ...prev,
        { type: "Waste Submission", weight: weightInKg, date: new Date().toISOString() }
      ]);
    } catch (error) {
      console.error("Error submitting waste:", error);
    } finally {
      setWasteSubmissionLoading(false);
    }
  };

  const redeemTokens = async (tokensToRedeem: number) => {
    if (!walletClient?.account?.address) return;

    setRedeemRewardLoading(true);

    try {
      await fetchBalance();
      setPreviousBalance(balance?.customToken ?? 0); // Set the balance before the transaction

      const tx = await wallet.transfer({
        token: wasteTokenAddress,
        to: wasteContractAddress,
        amount: 0,
        paymasterParams: getPaymasterParams(paymasterAddress, {
          type: "ApprovalBased",
          token: wasteTokenAddress,
          minimalAllowance: web3.utils.toWei("1", "ether"),
          innerInput: new Uint8Array(),
        }),
      });

      const result = await tx.wait();
      console.log(`Tokens redeemed successfully! Transaction Hash: ${result.transactionHash}`);

      await fetchBalance();
      await fetchPaymasterBalance();

      setTransactionHistory((prev) => [
        ...prev,
        { type: "Tokens Redeemed", tokens: tokensToRedeem, date: new Date().toISOString() }
      ]);
    } catch (error) {
      console.error("Error redeeming tokens:", error);
    } finally {
      setRedeemRewardLoading(false);
    }
  };

  const mintTokens = async (amount: number) => {
    if (!walletClient?.account?.address) return;

    setMintingLoading(true);

    try {
      const tx = await wallet.transfer({
        token: wasteTokenAddress,
        to: walletClient.account.address,
        amount: web3.utils.toWei(amount.toString(), "ether"),
        paymasterParams: getPaymasterParams(paymasterAddress, {
          type: "ApprovalBased",
          token: wasteTokenAddress,
          minimalAllowance: web3.utils.toWei("1", "ether"),
          innerInput: new Uint8Array(),
        }),
      });

      const result = await tx.wait();
      console.log(`Tokens minted successfully! Transaction Hash: ${result.transactionHash}`);
      
      await fetchBalance();
      await fetchPaymasterBalance();

      setTransactionHistory((prev) => [
        ...prev,
        { type: "Tokens Minted", tokens: amount, date: new Date().toISOString() }
      ]);
    } catch (error) {
      console.error("Error minting tokens:", error);
    } finally {
      setMintingLoading(false);
    }
  };

  const setTrustedCenter = async () => {
    if (!walletClient?.account?.address || !centerAddress) return;

    setTrustedCenterLoading(true);

    try {
      const tx = await wallet.transfer({
        token: wasteTokenAddress,
        to: centerAddress,
        amount: 0,
        paymasterParams: getPaymasterParams(paymasterAddress, {
          type: "ApprovalBased",
          token: wasteTokenAddress,
          minimalAllowance: web3.utils.toWei("1", "ether"),
          innerInput: new Uint8Array(),
        }),
      });

      const result = await tx.wait();
      console.log(`Trusted center set successfully! Transaction Hash: ${result.transactionHash}`);
    } catch (error) {
      console.error("Error setting trusted center:", error);
    } finally {
      setTrustedCenterLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchBalance();
      fetchPaymasterBalance();
    }
  }, [isConnected, walletClient]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-purple-700 text-white">
      <h1 className="text-2xl font-bold mb-4">WasteTokens DApp</h1>

      <ConnectButton />

      {isConnected ? (
        <>
          <p className="mt-2">Connected Account: {walletClient?.account?.address}</p>

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
            <button onClick={() => mintTokens(100)} className={`px-4 py-2 bg-blue-500 text-white rounded ${mintingLoading ? "opacity-50" : ""}`} disabled={mintingLoading}>
              {mintingLoading ? "Minting..." : "Mint 100 Tokens"}
            </button>
          </div>

          <div className="mt-4">
            <input
              type="text"
              value={centerAddress}
              onChange={(e) => setCenterAddress(e.target.value)}
              placeholder="Enter trusted center address"
              className="px-4 py-2 bg-gray-800 text-white rounded"
            />
            <button onClick={setTrustedCenter} className={`px-4 py-2 bg-yellow-500 text-white rounded ${trustedCenterLoading ? "opacity-50" : ""}`} disabled={trustedCenterLoading}>
              {trustedCenterLoading ? "Setting..." : "Set Trusted Center"}
            </button>
          </div>

          <div className="mt-4">
            <button onClick={fetchBalance} className="px-4 py-2 bg-blue-500 text-white rounded">Check Token Balance</button>
            {balance && (
              <>
                <p>Your Waste Token Balance: {balance.customToken} WASTE</p>
                {previousBalance !== null && <p>Previous Balance: {previousBalance} WASTE</p>}
                <p>Your ETH Balance: {ethBalance} ETH</p>
              </>
            )}
          </div>

          <div className="mt-4">
            <button onClick={fetchPaymasterBalance} className="px-4 py-2 bg-blue-500 text-white rounded">Check Paymaster Balance</button>
            {paymasterBalance && (
              <>
                <p>Paymaster Balance: {paymasterBalance.eth} ETH</p>
                {paymasterBalance.eth < 1 && ( // Adjust the threshold as needed
                  <button onClick={() => mintTokens(10)} className="px-4 py-2 bg-red-500 text-white rounded mt-4">
                    Mint Tokens for Paymaster
                  </button>
                )}
              </>
            )}
          </div>

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
