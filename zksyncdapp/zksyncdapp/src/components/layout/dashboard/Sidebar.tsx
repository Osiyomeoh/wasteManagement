// components/Sidebar.tsx

import { useState } from 'react';
import Link from 'next/link';

import Setting from "@/public/icons/setting.svg"
import LifeBuoy from "@/public/icons/life-buoy-01.svg"
import Check from "@/public/icons/check-done-01.svg"
import Icon from "@/public/icons/Icon.svg"
import Stack from "@/public/icons/layers-three-01.svg"
import Home from "@/public/icons/home-line.svg"
import ProgressBar from "@/public/icons/Progress circle.svg"
import Image from 'next/image';
import { XIcon } from 'lucide-react';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`fixed flex justify-between flex-col h-screen ${isOpen ? 'w-3/12' : 'w-20'} bg-[#7F56D9] p-4`}>
      {/* Sidebar */}
      <div className='flex flex-col w-full space-y-2 text-white'>
      
      <Link href={'/dashboard'} className='w-[95%] mx-auto bg-[#774ad8] h-[50px] p-4 rounded-[8px] flex items-center'>
      <Image src={Home} alt='text' /> 
      <p className='ml-3 p-4'>Home</p>
      </Link>

      <Link href={'/dashboard'} className='w-[95%] mx-auto  h-[50px] p-4 rounded-md hover:bg-[#774ad8] transition-colors flex items-center'>
      <Image src={Icon} alt='text' /> 
      <p className='ml-3'>Submit Waste</p>
      </Link>

      <Link href={'/dashboard/redeemreward'} className='w-[95%] mx-auto  h-[50px] p-4 rounded-md hover:bg-[#774ad8] transition-colors flex items-center'>
      <Image src={Stack} alt='text' /> 
      <p className='ml-3'>Redeem Rewards</p>
      </Link>

      <Link href={'/dashboard/transactionhistory'} className='w-[95%] mx-auto  h-[50px] p-4 rounded-md hover:bg-[#774ad8] transition-colors flex items-center'>
      <Image src={Check} alt='text' /> 
      <p className='ml-3'>Transaction History</p>
      </Link>

      </div>

      <div className='flex flex-col w-full space-y-2 text-white'>

      <Link href={'/'} className='w-[95%] mx-auto  h-[50px] p-4 rounded-md hover:bg-[#774ad8] transition-colors flex items-center'>
      <Image src={LifeBuoy} alt='text' /> 
      <p className='ml-3'>Support</p>
      </Link>
      <Link href={'/'} className='w-[95%] mx-auto  h-[50px] p-4 rounded-md hover:bg-[#774ad8] transition-colors flex items-center'> 
      <Image src={Setting} alt='text' /> 
      <p className='ml-3'>Settings</p>
      </Link>

      <div className='bg-[#774ad8] w-[95%] mx-auto p-4 rounded-[8px] flex flex-col space-y-4 relative'>
        <Image src={ProgressBar} alt='progress'/>
        <XIcon className='absolute right-8 top-3'/>
        <p className='font-semibold'>You have **** tokens</p>
        <p>You have enough tokens to claim the rewards</p>

<div className='flex justify-between'>
        <span>Dismiss</span>

        <span className='font-semibold'>Redeem Rewards</span>
</div>

      </div>
      </div>

    </div>
  );
};

export default Sidebar;
