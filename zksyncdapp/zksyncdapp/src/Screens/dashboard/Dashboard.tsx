
// import Nav from "../components/reuseables/Nav";
import Image from "next/image";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React from "react";
// import { logo2 } from "../lib/types/constant";
import DashboardLayout from "@/src/components/layout/dashboard/dashboardLayout"
// import { Button } from "@/src/components/ui/button";
import Table from "./first";

import ChartImage from "@/public/images/Chart_mini.svg"

import {
  Card,
  CardContent,
  
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"

import { ArrowUpIcon } from "@radix-ui/react-icons";
// import Example from "./Chart";

function CardWithForm() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <h3 className="text-xs">Total Waste Submitted</h3></CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent  className="flex justify-between">
     <div>
        <h1 className="text-6xl font-bold">2,420 kg</h1>
        <p className="flex space-x-2"><span className="flex items-center text-[#774ad8]"><ArrowUpIcon />40%</span> vs last month</p>

     </div>

        <div className="items-end">

        <Image src={ChartImage} alt="chart"/>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t ">
        <p className="text-[#774ad8] text-right right-0 ">View transaction history</p>
      </CardFooter>
    </Card>
  )
}

function Dashboard() {
  return (
    <DashboardLayout>
    <div className=" w-full p-8 flex flex-col space-y-5 text-black">

      <h1 className="font-semibold text-black text-2xl">Waste Token</h1>
      <div className="flex justify-between space-x-4">
        <CardWithForm />
        <CardWithForm />
      </div>
      <div className="flex space-x-2">
        <button className="bg-[#774ad8] px-24 py-3 rounded-full font-semibold text-white">Submit waste</button>
        <button className="border border-gray-200 px-24 py-3 rounded-full text-gray-700 font-semibold">Redeem Rewards</button>
        
      </div>

      <Table/>
    </div>
    </DashboardLayout>
  );
}

export default Dashboard;



