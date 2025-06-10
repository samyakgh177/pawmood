'use client'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

export default function CallToAction() {
    const { currentUser } = useAuth()

    if (currentUser) {
        return (
            <div className='max-w-[600px] mx-auto w-full'>
                <Link href={'/dashboard'}>
                    <Button dark full text="Track Your Pet's Day" />
                </Link>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center gap-4'>
            <p className='text-lg text-gray-600'>Join our pack of caring pet parents!</p>
            <div className='grid grid-cols-2 gap-4 w-fit'>
                <Link href={'/dashboard'}>
                    <Button text="Join Now" />
                </Link>
                <Link href={'/dashboard'}>
                    <Button text="Welcome Back" dark />
                </Link>
            </div>
        </div>
    )
}