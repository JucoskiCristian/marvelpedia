'use client'

import { getCharacters } from './service/api'
import Navbar from './components/navbar'
import { useEffect, useRef, useState } from 'react'
import type { Character } from './types/characters'
import Card from './components/card'

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSeriesLoading, setSeriesLoading] = useState<boolean>(true)
  const [offSet, setOffSet] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const lastUserRef = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    observer.current = new IntersectionObserver(entries => {
      const lastEntry = entries[entries.length - 1]
      if (lastEntry.isIntersecting) {
        fetchCharacters()
      }
    })
    if (lastUserRef.current) {
      observer.current.observe(lastUserRef.current)
    }
    return () => {
      if (lastUserRef.current && observer.current) {
        observer.current.unobserve(lastUserRef.current)
      }
    }
  }, [characters, hasMore])
  const fetchCharacters = async () => {
    const response = await getCharacters(offSet)
    if (response.results.length === 0) {
      setHasMore(false)
    } else {
      setCharacters([...characters, ...response.results])
      setOffSet(offSet + 20)
    }
  }
  return (
    <main className="mx-auto max-w-7xl">
      <Navbar />
      {isLoading ? (
        <div className="mt-10 w-80 mx-auto text-center ring-2 ring-black m-2 text-3xl font-bold bg-white">
          <h1>Loading...</h1>
        </div>
      ) : (
        <Card characters={characters} />
      )}
      {isSeriesLoading ? (
        <div
          ref={lastUserRef}
          className="my-20 w-80 mx-auto text-center ring-2 ring-black m-2 text-3xl font-bold bg-white"
        >
          <h1>Loading...</h1>
        </div>
      ) : (
        <></>
      )}
    </main>
  )
}
