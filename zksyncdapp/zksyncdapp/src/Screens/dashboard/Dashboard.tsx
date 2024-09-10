
// import Nav from "../components/reuseables/Nav";
// import Image from "next/image";
import React from "react";
// import { logo2 } from "../lib/types/constant";
import DashboardLayout from "@/src/components/layout/dashboard/dashboardLayout"
import { Button } from "@/src/components/ui/button";
import Table from "./first";

function Dashboard() {
  return (
    <DashboardLayout>
    <div className="p-8 flex flex-col space-y-5 text-black">

      <h1 className="font-semibold text-black text-2xl">Waste Token</h1>
      <div className="flex space-x-2">
        <button className="bg-[#774ad8] px-24 py-3 rounded-full font-semibold">Submit waste</button>
        <button className="border border-gray-200 px-24 py-3 rounded-full text-gray-700 font-semibold">Redeem Rewards</button>
        
      </div>

      <Table/>
    </div>
    </DashboardLayout>
  );
}

export default Dashboard;
