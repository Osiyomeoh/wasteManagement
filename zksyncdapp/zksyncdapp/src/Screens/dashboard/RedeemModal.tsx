import React from 'react'
import { CustomModal } from './CustomModal'
import { Button } from '@/src/components/ui/button'
import Image from 'next/image'

import ModalImage from '@/public/images/Modal.png'

type TProps = {
  isOpen: boolean
  onClose: () => void
  email?: string
  title?: string
  onAction?: () => void
  isLoading?: boolean
}

function RedeemModal({ isOpen, onClose,  }: TProps) {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      className='max-w-sm md:max-w-md'
    >
         <div className='w-full -mt-7'>
            <Image src={ModalImage} alt='modalPic' className='w-full'/>
          </div>
      <div className='-mt-3 text-center'>
     
        <h1 className='text-2xl font-bold text-black'>Reward Name</h1>
        <p className='mt-2 text-sm font-light'>
          Text describing   the reward showing TOKENS required
          
        </p>
        <div className='between mt-2.5'>
          
          <div className='mt-2 flex items-center justify-end gap-3'>
            <Button className='w-full rounded-full' variant={'outline'} onClick={onClose}>
              Cancel
            </Button>
            <Button className='w-full bg-[#774ad8] rounded-full'>Redeem</Button>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export default RedeemModal