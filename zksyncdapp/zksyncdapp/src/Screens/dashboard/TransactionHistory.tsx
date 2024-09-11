
import React from "react";

import DashboardLayout from "@/src/components/layout/dashboard/dashboardLayout"

import Table from "./first";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/src/components/ui/tabs";

function TransactionHistory() {
  return (
    <DashboardLayout>
    <div className=" w-full p-8 flex flex-col space-y-5 text-black">

      <div className="flex space-x-2">
      <h1 className="font-semibold text-black text-2xl">Transaction History</h1>
        
      </div>
        <TabComp />
    </div>
    </DashboardLayout>
  );
}

export default TransactionHistory;

function TabComp() {
    return (
      <Tabs defaultValue="wasteSubs" className="w-[90vw] md:w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger className="text-xs md:text-sm" value="wasteSubs">
            All Waste Submission
          </TabsTrigger>
          <TabsTrigger className="text-xs md:text-sm" value="rewardRedemptions">
            All Reward Redemptions
          </TabsTrigger>
          
        </TabsList>
        <TabsContent value="wasteSubs">
          
          <Table />
        </TabsContent>
        <TabsContent value="rewardRedemptions">
          
          <Table />
        </TabsContent>
       
      </Tabs>
    );
  }
  