"use client";
import React, { useState } from 'react';
import Image from "next/image";
import HeroImage from '@/public/images/heroImage.png'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#774ad8] flex">
      <div className=" flex-1 bg-white flex items-center justify-center">
      <button className="bg-black px-24 py-3 rounded-full font-semibold">Connect Wallet</button>
      <Link href={'/dashboard'}>
        <button className="bg-black px-24 py-3 rounded-full font-semibold">Go to Dashboard</button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 p-4 ">

     
      <Image src={HeroImage} alt="graphs" className="w-[80%]"/>

      <Carousel />
    </div>
    </div>

  );
}



const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Verified Waste Submission',
      description:
        'Help keep the environment clean by submitting your waste through our app. Each submission is verified to ensure proper recycling and waste management.',
    },
    {
      title: 'Earn Token Rewards',
      description:
        'For every verified waste submission, you earn tokens! These tokens reflect your positive impact and can be accumulated with every eco-friendly action you take.',
    },
    {
      title: 'Redeem Your Rewards',
      description:
        'Once you’ve gathered enough tokens, you can redeem them for exciting rewards—ranging from eco-friendly products to discounts on sustainable services.',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-6 text-white rounded-lg">

      <div className="text-center w-[85%] mx-auto">
        <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
        <p className="mt-2">{slides[currentSlide].description}</p>
      </div>

      <div className="flex items-center space-x-12">

        <button
          onClick={prevSlide}
          className="text-white  p-2 rounded-full "
        >
         <ChevronLeftIcon className='w-6 h-6' />
        </button>

        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`h-[5px] w-10 rounded-full ${
                currentSlide === index ? 'bg-[#9E77ED]' : 'bg-[#6941C6]'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="text-white  p-2 rounded-full"
        >
          <ChevronRightIcon className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
};