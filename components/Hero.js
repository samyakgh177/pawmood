import { Fugaz_One } from 'next/font/google';
import React from 'react'
import Button from './Button';
import Calendar from './Calender';
import Link from 'next/link';
import CallToAction from './CallToAction';
import Image from 'next/image';
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Hero() {
    return (
        <div className='py-4 md:py-10 flex flex-col gap-8 sm:gap-10'>
            <div className='flex flex-col items-center gap-4'>
                <Image
                    src="/paw-print.svg"
                    alt="Paw Print"
                    width={60}
                    height={60}
                    className="animate-bounce"
                />
                <h1 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className}>
                    <span className='textGradient'>PawMood</span> tracks your pet&apos;s <span className='textGradient'>daily</span> wellbeing!
                </h1>
            </div>
            <p className='text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[700px]'>
                Because every tail wag, purr, and happy bark matters! Monitor your furry friend&apos;s mood and health
                <span className='font-semibold'> every single day</span> 🐾
            </p>
            <CallToAction />
            <div className='relative'>
                <Calendar demo />
                <div className='absolute -top-4 right-4 transform rotate-12'>
                    <Image
                        src="/pet-emoji.svg"
                        alt="Happy Pet"
                        width={40}
                        height={40}
                    />
                </div>
            </div>
        </div>
    )
}