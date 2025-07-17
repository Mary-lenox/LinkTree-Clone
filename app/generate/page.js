'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSearchParams, useRouter } from 'next/navigation'

const Home = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [handle, setHandle] = useState(searchParams.get('handle') || '')
  const [linkText, setLinkText] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [links, setLinks] = useState([])
  const [profileUrl, setProfileUrl] = useState('')
  const [desc, setDesc] = useState('')

  const addLink = () => {
    if (linkText && linkUrl) {
      setLinks([...links, { text: linkText, url: linkUrl }])
      setLinkText('')
      setLinkUrl('')
    }
  }

  const handleSubmit = async () => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      links: links,
      text_link: linkText,
      handle: handle.trim(),
      profile: profileUrl,
      desc: desc
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    const res = await fetch('http://localhost:3000/api/generate', requestOptions)
    const result = await res.json()

    if (!handle || !profileUrl || links.length === 0 || !desc) {
      return toast.warning('Please complete all fields and add at least one link.')
    }

    if (result.success) {
      toast.success(result.message)
      router.push(`/${handle.trim()}`)
      setLinkText('')
      setLinkUrl('')
      setLinks([])
      setHandle('')
      setProfileUrl('')
      setDesc('')
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Left: Form */}
        <div className="flex flex-col justify-start items-start px-12 pb-16 pt-40 md:px-24 max-w-full min-h-screen w-full bg-[#10232e]">
          <h1 className="text-3xl font-bold text-emerald-400 mb-8">Add BitTree</h1>

          {/* Step 1: Handle */}
          <div className="w-full mb-6">
            <h2 className="text-lg font-semibold text-emerald-300 mb-2">Step 1: Claim your handle</h2>
            <input
              type="text"
              placeholder="linkt.ee/yourname"
              value={handle || ''}
              onChange={(e) => setHandle(e.target.value)}
              className="w-full px-4 py-3 border border-emerald-600 bg-[#1a2f3a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Step 2: Add Links */}
          {/* Step 2: Add Links */}
          <div className="w-full mb-6">
            <h2 className="text-lg font-semibold text-emerald-300 mb-2">Step 2: Add Links</h2>

            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap mb-3">
              <input
                type="text"
                placeholder="Link Text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="w-full md:flex-1 px-4 py-3 border border-emerald-600 bg-[#1a2f3a] text-white rounded-lg"
              />
              <input
                type="text"
                placeholder="https://link-url.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full md:flex-1 px-4 py-3 border border-emerald-600 bg-[#1a2f3a] text-white rounded-lg"
              />
              <button
                type="button"
                disabled={!linkText || !linkUrl}
                onClick={addLink}
                className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-lg"
              >
                Add Link
              </button>
            </div>

            <ul className="text-sm text-gray-200 list-disc list-inside">
              {links.map((link, i) => (
                <li key={i}>
                  <strong>{link.text}</strong>: {link.url}
                </li>
              ))}
            </ul>
          </div>


          {/* Step 3: Profile Pic & Desc */}
          <div className="w-full mb-6 flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-emerald-300 mb-2">
              Step 3: Add Profile Picture Link and Description
            </h2>
            <input
              type="text"
              placeholder="https://your-image.com/pic.jpg"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="w-full px-4 py-3 border border-emerald-600 bg-[#1a2f3a] text-white rounded-lg"
            />

            <input
              type="text"
              placeholder="Description ..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-4 py-3 border border-emerald-600 bg-[#1a2f3a] text-white rounded-lg"
            />
          </div>

          {/* Final Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!handle || !profileUrl || links.length === 0 || !desc}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg disabled:bg-emerald-400"
          >
            Create Your Linktree
          </button>
        </div>

        {/* Right: Image */}
        <div className="relative flex items-center justify-center object-contain bg-[#0f172a]">
          <Image
            src="/image.png"
            alt="Preview"
            fill={true}
            className="rounded-xl object-cover shadow-emerald-700/30 shadow-lg"
          />
        </div>
      </section>
      <ToastContainer />
    </div>
  )
}

export default Home
