import React from "react";
import QRCode from "@/public/images/QR Code.png"
import Image from "next/image";


function SubmitWaste() {
  return (
    <div className="w-screen h-screen bg-[#774ad8] flex justify-center items-center">
        {/* <button className="bg-white text-black rounded-full p-3 m-10">
            Go Back
        </button> */}

        <div className="bg-[#4A4453] h-1/2 rounded-lg text-center p-6">
<h2 className="text-2xl font-semibold">Submit Waste</h2>
<p>The waste center will scan this to recognize the user</p>

<div className="border-[10px] border-red-400 rounded-3xl">
    <Image src={QRCode} alt="qrcode" className="w-full rounded-3xl"/>

</div>

<p>User ID: 0x1234...ABCD</p>
        </div>

    </div>
  );
}

export default SubmitWaste;
