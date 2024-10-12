'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { searchCharacters } from '../service/api'
import type { Character } from '../types/characters'
import Navbar from '../components/navbar'
import Card from '../components/card'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const querySearch = searchParams.get('query')
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await searchCharacters(querySearch)
        setCharacters(data.results)
      } catch (error) {
        console.error(error)
      }
      setIsLoading(false)
    }

    if (querySearch) {
      fetchData()
    }
  }, [querySearch])

  return (
    <main className="mx-auto max-w-7xl p-2">
      <Navbar />
      <h1 className="w-80 mx-auto text-center ring-2 ring-black m-2 text-3xl font-bold bg-white">
        Search for <span>&quot;{querySearch}&quot;</span>
      </h1>
      {isLoading ? (
        <div className="mt-10 w-80 mx-auto text-center ring-2 ring-black m-2 text-3xl font-bold bg-white">
          <h1>Loading...</h1>
        </div>
      ) : characters.length ? (
        <Card characters={characters} />
      ) : (
        <div className="mt-10 w-80 mx-auto text-center ring-2 ring-black m-2 text-3xl font-bold bg-white">
          <h1>Not found</h1>
        </div>
      )}
    </main>
  )
}
