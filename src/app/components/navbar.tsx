'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type KeyboardEvent, useState } from 'react'

export default function Navbar() {
  const router = useRouter()
  const [querySearch, setQuerySearch] = useState<string>('')

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && querySearch.trim() !== '') {
      setQuerySearch('')
      router.push(`/search?query=${querySearch}`)
    }
  }

  return (
    <header>
      <div className="flex flex-wrap justify-around p-8 bg-gray-900 sm:flex-nowrap">
        <div className="flex-1">
          <Link href="/" className="text-4xl text-white">
            Marvel Pedia
          </Link>
        </div>
        <div>
          <input
            value={querySearch}
            type="text"
            placeholder="Search"
            className="p-1 text-black outline-none ring-2 ring-black focus:ring-2 focus:ring-red-500 "
            onChange={e => setQuerySearch(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>
    </header>
  )
}
