import { Fugaz_One } from 'next/font/google';
import React from 'react'
import Image from 'next/image';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Button(props) {
    const { text, dark, full, clickHandler, icon } = props

    return (
        <button 
            onClick={clickHandler} 
            className={'group relative rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg border-2 border-solid ' + 
                (dark ? 'text-white bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600' : 
                       'text-blue-500 border-blue-500 hover:bg-blue-50') + 
                (full ? ' grid place-items-center w-full' : '')}
        >
            <div className={'flex items-center justify-center gap-2 px-6 sm:px-10 py-2 sm:py-3 ' + fugaz.className}>
                {icon && (
                    <Image 
                        src={icon} 
                        width={20} 
                        height={20} 
                        alt="Button icon"
                        className={'transition-transform group-hover:scale-110 ' + 
                            (dark ? 'brightness-200' : '')}
                    />
                )}
                <span className='whitespace-nowrap'>{text}</span>
            </div>
        </button>
    )
}