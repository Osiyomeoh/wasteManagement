// components/Sidebar.tsx

import { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`fixed flex justify-between flex-col h-screen ${isOpen ? 'w-3/12' : 'w-20'} bg-[#7F56D9] p-4`}>
      {/* Sidebar */}
      <div className='flex flex-col w-full space-y-2 text-white'>
      
      <Link href={'/'} className='w-[95%] mx-auto bg-[#774ad8] h-[40px] p-3 rounded-[8px]'>Home</Link>
      <Link href={'/'} className='w-[95%] mx-auto  h-[40px] p-3 rounded-md hover:bg-[#774ad8] transition-colors'>Submit Waste</Link>
      <Link href={'/'} className='w-[95%] mx-auto  h-[40px] p-3 rounded-md hover:bg-[#774ad8] transition-colors'>Redeem Rewards</Link>
      <Link href={'/'} className='w-[95%] mx-auto  h-[40px] p-3 rounded-md hover:bg-[#774ad8] transition-colors'>Transaction History</Link>

      </div>

      <div className='flex flex-col w-full space-y-2 text-white'>

      <Link href={'/'} className='w-[95%] mx-auto  h-[40px] p-3 rounded-md hover:bg-[#774ad8] transition-colors'>Support</Link>
      <Link href={'/'} className='w-[95%] mx-auto  h-[40px] p-3 rounded-md hover:bg-[#774ad8] transition-colors'>Settings</Link>

      <div className='bg-[#774ad8] w-[95%] mx-auto p-4 rounded-[8px]'>
        <p>You have **** tokens</p>
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
