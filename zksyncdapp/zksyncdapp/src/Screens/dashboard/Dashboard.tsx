"use client"
import React, { useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/src/components/layout/dashboard/dashboardLayout";
import Table from "./first";
import ChartImage from "@/public/images/Chart_mini.svg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { useWalletClient } from "wagmi";
import Web3 from "web3";
import { ZKsyncPlugin, Web3ZKsyncL2, types, getPaymasterParams, utils } from "web3-plugin-zksync";

// Directly import ABI JSON files as modules
import wasteToken from "@/app/abis/WasteToken.json";
import WasteCollectionRewards from "@/app/abis/WasteCollectionRewards.json";
import MyPaymaster from "@/app/abis/MyPaymaster.json";

// Addresses from environment variables
const wasteTokenAddress = process.env.NEXT_PUBLIC_WASTE_TOKEN_ADDRESS || "0xYourWasteTokenAddress";
const wasteContractAddress = process.env.NEXT_PUBLIC_WASTE_CONTRACT_ADDRESS || "0xYourWasteContractAddress";
const paymasterAddress = process.env.NEXT_PUBLIC_PAYMASTER_ADDRESS || "0xYourPaymasterAddress";

const DEFAULT_GAS_PER_PUBDATA_LIMIT = 80000;

function CardWithForm() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <h3 className="text-xs">Total Waste Submitted</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div>
          <h1 className="text-6xl font-bold">2,420 kg</h1>
          <p className="flex space-x-2">
            <span className="flex items-center text-[#774ad8]">
              <ArrowUpIcon />
              40%
            </span>{" "}
            vs last month
          </p>
        </div>
        <div className="items-end">
          <Image src={ChartImage} alt="chart" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t ">
        <p className="text-[#774ad8] text-right right-0 ">
          View transaction history
        </p>
      </CardFooter>
    </Card>
  );
}

function Dashboard() {
  const { data: walletClient } = useWalletClient();
  const [wasteSubmissionLoading, setWasteSubmissionLoading] = useState(false);
  const [wasteAmount, setWasteAmount] = useState<number>(0); // State to hold the input waste amount
  const [centerAddress, setCenterAddress] = useState<string>(""); // State for the trusted center address
  const [trustedCenterLoading, setTrustedCenterLoading] = useState(false); // Loading state for setTrustedCenter

  const web3 = new Web3(process.env.SEPOLIA_RPC_URL || "https://sepolia.era.zksync.dev");
  web3.registerPlugin(new ZKsyncPlugin(Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia)));
  const zksync = web3.ZKsync;

  const wallet = new zksync.Wallet("0xcd1e3ad2e67471d576b5fdca01b715a1f2149d41516e3524fc51589aa44cb9a7");

  // Initialize WasteToken, Paymaster, and WasteContract instances using zksync plugin
  const wasteTokenContract = new web3.eth.Contract(wasteToken.abi, wasteTokenAddress);
  const wasteContract = new web3.eth.Contract(WasteCollectionRewards.abi, wasteContractAddress);
  const paymasterContract = new web3.eth.Contract(MyPaymaster.abi, paymasterAddress);

  // Submit waste function (as before)
  const submitWaste = async () => {
    if (!walletClient?.account?.address) {
      console.error("No wallet connected.");
      return;
    }
  
    setWasteSubmissionLoading(true);
  
    try {
      // Get the paymaster balance from the contract
      const paymasterBalanceResult = await wasteTokenContract.methods.balanceOf(paymasterAddress).call();
      
      // Ensure the result is a valid string representing the balance
      if (!paymasterBalanceResult || paymasterBalanceResult.length === 0) {
        const mintTx = await wasteTokenContract.methods
        .mint(paymasterAddress, web3.utils.toWei("100", "ether"))
        .send({ from: walletClient.account.address });

      console.log(`Minted ${"100"} WasteTokens to paymaster. Transaction: ${mintTx.transactionHash}`);
        console.error("Invalid paymaster balance received.");
        return;
      }
  
      // Convert the result (balance in Wei) to a number for easier manipulation
      // const paymasterBalance = web3.utils.fromWei(paymasterBalanceResult, 'ether');
  
      console.log(`Paymaster WasteToken balance: ${paymasterBalanceResult} WasteTokens`);
  
      // Ensure the paymaster has enough tokens to cover gas fees
      // if (parseFloat(paymasterBalance) === 0) {
      //   console.error("Paymaster has insufficient WasteTokens to cover the gas fees.");
      //   return;
      // }
  
      // Proceed with transaction logic here
      const txData = wasteContract.methods
        .submitWaste(walletClient.account.address, wasteAmount)
        .encodeABI();
  
      const paymasterParams = getPaymasterParams(paymasterAddress, {
        type: "ApprovalBased",
        token: wasteTokenAddress,
        minimalAllowance: web3.utils.toWei("1", "ether"),
        innerInput: new Uint8Array(),
      });
  
      const gasLimit = await wasteContract.methods
        .submitWaste(walletClient.account.address, wasteAmount)
        .estimateGas({ from: walletClient.account.address });
  
      const gasPrice = await web3.eth.getGasPrice();
  
      const tx = {
        to: wasteContractAddress,
        data: txData,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        customData: {
          paymasterParams: paymasterParams,
          gasPerPubdata: DEFAULT_GAS_PER_PUBDATA_LIMIT,
        },
      };
  
      const result = await wallet.sendTransaction(tx);
      const receipt = await result.wait();
      console.log(`Waste submitted successfully! Transaction Hash: ${receipt.transactionHash}`);
    } catch (error) {
      console.error("Error submitting waste:", error);
    } finally {
      setWasteSubmissionLoading(false);
    }
  };
  
  
  
  // New: Set Trusted Center function
  const setTrustedCenter = async () => {
    if (!walletClient?.account?.address) {
      console.error("No wallet connected.");
      return;
    }

    setTrustedCenterLoading(true);

    try {
      const txData = wasteContract.methods
        .setTrustedCenter(centerAddress, true) // Set the center as trusted
        .encodeABI();

      const paymasterParams = getPaymasterParams(paymasterAddress, {
        type: "ApprovalBased",
        token: wasteTokenAddress,
        minimalAllowance: web3.utils.toWei("1", "ether"),
        innerInput: new Uint8Array(),
      });

      const gasLimit = await wasteContract.methods
        .setTrustedCenter(centerAddress, true)
        .estimateGas({ from: walletClient.account.address });

      const gasPrice = await web3.eth.getGasPrice();

      const tx = {
        to: wasteContractAddress,
        data: txData,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        customData: {
          paymasterParams: paymasterParams,
          gasPerPubdata: DEFAULT_GAS_PER_PUBDATA_LIMIT,
        },
      };

      const result = await wallet.sendTransaction(tx);
      const receipt = await result.wait();
      console.log(`Trusted center set successfully! Transaction Hash: ${receipt.transactionHash}`);
    } catch (error) {
      console.error("Error setting trusted center:", error);
    } finally {
      setTrustedCenterLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full p-8 flex flex-col space-y-5 text-black">
        <h1 className="font-semibold text-black text-2xl">Waste Token</h1>
        <div className="flex justify-between space-x-4">
          <CardWithForm />
          <CardWithForm />
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Enter the amount of waste (in kg):
          </label>
          <input
            type="number"
            value={wasteAmount}
            onChange={(e) => setWasteAmount(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter kg"
          />
        </div>

        <div className="flex space-x-2 mt-4">
          <button
            onClick={submitWaste}
            className={`bg-[#774ad8] px-24 py-3 rounded-full font-semibold text-white ${
              wasteSubmissionLoading ? "opacity-50" : ""
            }`}
            disabled={wasteSubmissionLoading || wasteAmount <= 0}
          >
            {wasteSubmissionLoading ? "Submitting..." : "Submit waste"}
          </button>
          
          <button className="border border-gray-200 px-24 py-3 rounded-full text-gray-700 font-semibold">
            Redeem Rewards
          </button>
        </div>

        {/* Input for Trusted Center */}
        <div className="mt-8">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Enter Trusted Center Address:
          </label>
          <input
            type="text"
            value={centerAddress}
            onChange={(e) => setCenterAddress(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter address"
          />
          <button
            onClick={setTrustedCenter}
            className={`bg-[#774ad8] px-24 py-3 rounded-full font-semibold text-white mt-4 ${
              trustedCenterLoading ? "opacity-50" : ""
            }`}
            disabled={trustedCenterLoading || !centerAddress}
          >
            {trustedCenterLoading ? "Setting Trusted Center..." : "Set Trusted Center"}
          </button>
        </div>

        <Table />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
