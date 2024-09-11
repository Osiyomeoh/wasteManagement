import React from "react";
import DashboardLayout from "@/src/components/layout/dashboard/dashboardLayout"
import Table from "./rewardTable";


function RedeemReward() {
  return (
    <DashboardLayout>
    <div className=" w-full p-8 flex flex-col space-y-5 text-black">

      <div className="flex space-x-2">
      <h1 className="font-semibold text-black text-2xl">Redeem Rewards</h1>
        
      </div>

      <Table/>
    </div>
    </DashboardLayout>
  );
}

export default RedeemReward;

