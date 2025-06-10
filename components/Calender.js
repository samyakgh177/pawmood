'use client'
import { baseRating, gradients, moodEmojis } from '@/utils'
import { Fugaz_One } from 'next/font/google'
import React, { useState } from 'react'
import Image from 'next/image'

const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] })

export default function Calendar(props) {
    const { demo, completeData, handleSetMood } = props
    const now = new Date()
    const currMonth = now.getMonth()
    const [selectedMonth, setSelectMonth] = useState(Object.keys(months)[currMonth])
    const [selectedYear, setSelectedYear] = useState(now.getFullYear())
    const [selectedDate, setSelectedDate] = useState(null)

    const numericMonth = monthsArr.indexOf(selectedMonth)
    const data = completeData?.[selectedYear]?.[numericMonth] || {}

    function handleIncrementMonth(val) {
        
        if (numericMonth + val < 0) {
            // set month value = 11 and decrement the year
            setSelectedYear(curr => curr - 1)
            setSelectMonth(monthsArr[monthsArr.length - 1])
        } else if (numericMonth + val > 11) {
            // set month val = 0 and increment the year
            setSelectedYear(curr => curr + 1)
            setSelectMonth(monthsArr[0])
        } else {
            setSelectMonth(monthsArr[numericMonth + val])
        }
    }

    const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)
    const firstDayOfMonth = monthNow.getDay()
    const daysInMonth = new Date(selectedYear, Object.keys(selectedMonth).indexOf(selectedMonth) + 1, 0).getDate()

    const daysToDisplay = firstDayOfMonth + daysInMonth

    const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

    const showMoodSelector = (dayIndex) => {
        if (demo) return
        setSelectedDate(dayIndex)
    }

    const handleMoodSelect = (mood) => {
        handleSetMood(mood)
        setSelectedDate(null)
    }

    return (
        <div className='flex flex-col gap-4 glass-effect p-6 relative'>
            <div className='flex items-center justify-between gap-4'>
                <button 
                    onClick={() => handleIncrementMonth(-1)} 
                    className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-50 text-blue-500 transition-colors'
                >
                    <i className="fa-solid fa-chevron-left text-xl"></i>
                </button>
                <div className='flex items-center gap-2'>
                    <Image src="/paw-print.svg" width={24} height={24} alt="Paw print" className='opacity-70' />
                    <p className={'text-center text-2xl md:text-3xl capitalized whitespace-nowrap textGradient ' + fugaz.className}>
                        {selectedMonth} {selectedYear}
                    </p>
                </div>
                <button 
                    onClick={() => handleIncrementMonth(+1)}
                    className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-50 text-blue-500 transition-colors'
                >
                    <i className="fa-solid fa-chevron-right text-xl"></i>
                </button>
            </div>

            <div className='grid grid-cols-7 gap-1 mb-2'>
                {dayList.map((day, index) => (
                    <div key={index} className='text-center font-medium text-xs text-blue-400 py-2'>
                        {day.slice(0, 3)}
                    </div>
                ))}
            </div>

            <div className='flex flex-col gap-1'>
                {[...Array(numRows).keys()].map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className='grid grid-cols-7 gap-1'>
                            {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                                let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)
                                let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true
                                let isToday = dayIndex === now.getDate() && selectedMonth === monthsArr[now.getMonth()] && selectedYear === now.getFullYear()

                                if (!dayDisplay) {
                                    return <div className='aspect-square' key={dayOfWeekIndex} />
                                }

                                let rating = demo ? baseRating[dayIndex] : (dayIndex in data ? data[dayIndex] : null)
                                let color = rating ? gradients.indigo[rating] : 'transparent'
                                let emoji = rating ? moodEmojis[rating] : null

                                return (
                                    <div 
                                        style={{ background: color }} 
                                        className={'relative aspect-square p-1 rounded-lg cursor-pointer transition-all hover:transform hover:scale-105 group ' + 
                                            (isToday ? 'ring-2 ring-blue-400 ring-offset-2' : '') + 
                                            (!rating ? ' hover:bg-blue-50' : '')} 
                                        key={dayOfWeekIndex}
                                        onClick={() => showMoodSelector(dayIndex)}
                                    >
                                        <span className={'absolute top-1 left-2 text-xs font-medium ' + 
                                            (rating ? 'text-white' : 'text-blue-500')}>
                                            {dayIndex}
                                        </span>
                                        {emoji && (
                                            <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg group-hover:scale-125 transition-transform'>
                                                {emoji}
                                            </span>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>

            {selectedDate && !demo && (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-4 z-10 min-w-[200px]'>
                    <div className='flex flex-col gap-3'>
                        <p className='text-center font-medium text-blue-600'>Select Mood</p>
                        <div className='grid grid-cols-5 gap-2'>
                            {[1, 2, 3, 4, 5].map((mood) => (
                                <button
                                    key={mood}
                                    onClick={() => handleMoodSelect(mood)}
                                    className='p-2 hover:bg-blue-50 rounded-lg transition-colors'
                                >
                                    <span className='text-xl'>{moodEmojis[mood]}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}