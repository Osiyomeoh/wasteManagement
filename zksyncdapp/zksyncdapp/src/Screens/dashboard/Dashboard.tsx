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
import { ZKsyncPlugin, Web3ZKsyncL2, types } from "web3-plugin-zksync";

// Directly import ABI JSON files as modules
import wasteToken from "@/app/abis/WasteToken.json";
import WasteCollectionRewards from "@/app/abis/WasteCollectionRewards.json";
import MyPaymaster from "@/app/abis/MyPaymaster.json";

// Addresses from environment variables
const wasteTokenAddress = process.env.NEXT_PUBLIC_WASTE_TOKEN_ADDRESS || "0xYourWasteTokenAddress";
const wasteContractAddress = process.env.NEXT_PUBLIC_WASTE_CONTRACT_ADDRESS || "0xYourWasteContractAddress";
const paymasterAddress = process.env.NEXT_PUBLIC_PAYMASTER_ADDRESS || "0xYourPaymasterAddress";

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
  
  const web3 = new Web3(process.env.SEPOLIA_RPC_URL || "https://rpc2.sepolia.org");
  web3.registerPlugin(new ZKsyncPlugin(Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia)));

  const wasteContract = new web3.eth.Contract(WasteCollectionRewards.abi, wasteContractAddress);
  const paymasterContract = new web3.eth.Contract(MyPaymaster.abi, paymasterAddress);

  // Submit waste function
  const submitWaste = async () => {
    if (!walletClient?.account?.address) {
      console.error("No wallet connected.");
      return;
    }

    setWasteSubmissionLoading(true);

    try {
      // Prepare the transaction data for submitting waste
      const txData = wasteContract.methods
        .submitWaste(walletClient.account.address, wasteAmount) // Use the input waste amount
        .encodeABI();

      // Use paymaster for submitting the waste transaction
      const tx = await walletClient.transfer({
        token: wasteTokenAddress,
        to: wasteContractAddress,
        amount: 0, // No tokens transferred
        paymasterParams: {
          type: "ApprovalBased",
          token: wasteTokenAddress,
          minimalAllowance: web3.utils.toWei("1", "ether"), // Adjust allowance if needed
          innerInput: new Uint8Array(),
        },
      });

      const result = await tx.wait();
      console.log(`Waste submitted successfully! Transaction Hash: ${result.transactionHash}`);

      // Update transaction history or any state necessary
      // fetchBalance(); // Optional: Update balance or data after submission
    } catch (error) {
      console.error("Error submitting waste:", error);
    } finally {
      setWasteSubmissionLoading(false);
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
          {/* Input for waste amount */}
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
            onClick={submitWaste} // Submit waste based on input value
            className={`bg-[#774ad8] px-24 py-3 rounded-full font-semibold text-white ${
              wasteSubmissionLoading ? "opacity-50" : ""
            }`}
            disabled={wasteSubmissionLoading || wasteAmount <= 0} // Disable if wasteAmount is not valid
          >
            {wasteSubmissionLoading ? "Submitting..." : "Submit waste"}
          </button>

          <button className="border border-gray-200 px-24 py-3 rounded-full text-gray-700 font-semibold">
            Redeem Rewards
          </button>
        </div>

        <Table />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
