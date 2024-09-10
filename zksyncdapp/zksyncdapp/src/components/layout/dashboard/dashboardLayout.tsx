"use client"

// import Nav from "../components/reuseables/Nav";

// import Image from "next/image";
import React from "react";

import Sidebar from "./Sidebar";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
    
    <Sidebar />
    <div className="w-full ml-[400px] ">

    {children}

  </div>
  </div>
    
  );
}

export default DashboardLayout;
