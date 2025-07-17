"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Home = () => {
  const [text, setText] = useState('')
  const router = useRouter()

  const createTree = () => {
    if(text.trim() !== ''){
      router.push(`/generate?handle=${text}`)
    } else {
      router.push('/generate')
    }
  }
  
  return (
    <div>
      <section className="bg-[#254f1a] min-h-screen">
        <main className='text-white'>
          <section className='grid grid-cols-2 min-h-screen'>
            <div className='flex flex-col items-baseline justify-start pl-20 gap-7 my-60'>
              <p className='text-yellow-300 font-extrabold text-7xl flex flex-col justify-start'>
                <span>Everything you</span>
                <span>are. In one,</span>
                <span> simple link in bio.</span>
              </p>
              <p className='text-xl font-semibold'>Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>

              <div className='flex gap-3 items-baseline justify-center'>
                <input value={text} onChange={(e)=>setText(e.target.value)} type="text" placeholder='linkt.ee/' className='rounded-lg text-black placeholder:text-gray-400 bg-white py-5 px-4' />
                <button onClick={()=>createTree()} className='bg-purple-300  font-bold rounded-full text-black px-5 py-5'>Claim your LinkTree</button>
              </div>
            </div>
            <div>
              
            </div>

          </section>
        </main>
      </section>
    </div>
  )
}

export default Home
