"use client";
import Image from "next/image";
import HeroImage from '@/public/images/heroImage.png'
// import { Button } from "@/src/components/ui/button";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#774ad8] flex">
      <div className=" flex-1 bg-white flex items-center justify-center">
      <button className="bg-black px-24 py-3 rounded-full font-semibold">Connect Wallet</button>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 p-4 ">

     
      <Image src={HeroImage} alt="graphs" className="w-[80%]"/>
      {/* <div className="flex flex-col items-center w-[80%] mx-auto space-y-4 px-5 text-center">
<h1 className="font-semibold text-2xl">Earn Token rewards</h1>
<p className="text-lg">For every verified waste submission, you earn tokens! These tokens reflect your positive impact and can be accumulated with every eco-friendly action you take.</p>


      </div> */}

      <Carousel />
    </div>
    </div>

  );
}

import React, { useState } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of text content for each slide
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

  // Navigate to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Navigate to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-6 text-white rounded-lg">
      {/* Text Content */}
      <div className="text-center w-[85%] mx-auto">
        <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
        <p className="mt-2">{slides[currentSlide].description}</p>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-12">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="text-white  p-2 rounded-full "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Dots */}
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

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="text-white  p-2 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};


