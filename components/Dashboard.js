'use client'
import { Fugaz_One } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import Calendar from './Calender';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Loading from './Loading';
import Login from './Login';
import Image from 'next/image';
import { moodDescriptions } from '@/utils';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });


export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth()
  const [data, setData] = useState({})
  const now = new Date()

  function countValues() {
    let total_number_of_days = 0
    let sum_moods = 0
    let happy_days = 0
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day]
          total_number_of_days++
          sum_moods += days_mood
          if (days_mood >= 4) happy_days++
        }
      }
    }
    return { 
      tracked_days: total_number_of_days, 
      happiness_score: Math.round((sum_moods / total_number_of_days) * 20) + '%',
      happy_streaks: happy_days + ' happy days'
    }
  }

  const statuses = {
    ...countValues(),
  }

  async function handleSetMood(mood) {
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    try {
      const newData = { ...userDataObj }
      if (!newData?.[year]) {
        newData[year] = {}
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {}
      }

      newData[year][month][day] = mood
      // update the current state
      setData(newData)
      // update the global state
      setUserDataObj(newData)
      // update firebase
      const docRef = doc(db, 'users', currentUser.uid)
      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: mood
          }
        }
      }, { merge: true })
    } catch (err) {
      console.log('Failed to set data: ', err.message)
    }
  }



  const moods = {
    'Needs Care 💊': '😿', // Level 1
    'Extra Love 💝': '😾', // Level 2
    'Content 😌': '😺',    // Level 3
    'Happy 🎾': '😸',      // Level 4
    'Best Day 🌟': '😻'    // Level 5
  }

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return
    }
    setData(userDataObj)
  }, [currentUser, userDataObj])

  if (loading) {
    return <Loading />
  }

  if (!currentUser) {
    return <Login />
  }

  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
      <div className='grid grid-cols-3 glass-effect p-6 gap-6 text-blue-600'>
        {Object.keys(statuses).map((status, statusIndex) => {
          const icons = {
            tracked_days: '📅',
            happiness_score: '💝',
            happy_streaks: '🌟'
          }
          return (
            <div key={statusIndex} className='flex flex-col gap-2 items-center text-center'>
              <span className='text-2xl'>{icons[status]}</span>
              <p className='font-medium capitalize text-xs sm:text-sm'>{status.split('_').join(' ')}</p>
              <p className={'text-base sm:text-xl font-bold ' + fugaz.className}>{statuses[status]}</p>
            </div>
          )
        })}
      </div>
      <div className='text-center space-y-2'>
        <h4 className={'text-4xl sm:text-5xl md:text-6xl ' + fugaz.className}>
          How's your <span className='textGradient'>pet</span> feeling today?
        </h4>
        <p className='text-gray-600'>Track their daily mood and well-being!</p>
      </div>
      <div className='flex items-stretch flex-wrap gap-4 max-w-3xl mx-auto w-full'>
        {Object.entries(moods).map(([mood, emoji], index) => {
          const moodLevel = index + 1;
          return (
            <button 
              onClick={() => {
                handleSetMood(moodLevel)
              }} 
              className='group relative p-6 rounded-2xl glass-effect duration-200 hover:transform hover:scale-105 text-center flex flex-col items-center gap-3 flex-1 min-w-[120px]'
              key={mood}
              title={moodDescriptions[moodLevel]}
            >
              <p className='text-4xl sm:text-5xl transition-transform group-hover:scale-110 duration-300'>{emoji}</p>
              <p className={'text-blue-600 text-xs sm:text-sm ' + fugaz.className}>{mood}</p>
            </button>
          )
        })}
      </div>
      <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  )
}