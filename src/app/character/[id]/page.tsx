'use client'
import Modal from '@/app/components/modal'
import Navbar from '@/app/components/navbar'
import { detailCharacter, getSeriesCharacter } from '@/app/service/api'
import type { Character } from '@/app/types/characters'
import type { Series } from '@/app/types/series'
import { useEffect, useRef, useState } from 'react'

interface CharacterPageProps {
  params: {
    id: string
  }
}

export default function CharacterPage({ params }: CharacterPageProps) {
  const { id } = params
  const [character, setCharacter] = useState<Character>()
  const [series, setSeries] = useState<Series[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSeriesLoading, setSeriesLoading] = useState<boolean>(true)
  const [isModalOpen, setModalOpen] = useState(false)
  const [offSet, setOffSet] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const lastUserRef = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver>(null)

  function closeModal() {
    setModalOpen(false)
  }

  function editHero(name: string, description: string) {
    if (character?.id) {
      setCharacter({
        ...character,
        name: name,
        description: description,
      })
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    observer.current = new IntersectionObserver(entries => {
      const lastEntry = entries[entries.length - 1]
      if (lastEntry.isIntersecting) {
        fetchSeries()
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
  }, [series, hasMore])

  const fetchSeries = async () => {
    const response = await getSeriesCharacter(id, offSet)
    if (response.results.length === 0) {
      setHasMore(false)
      setSeriesLoading(false)
    } else {
      setSeries([...series, ...response.results])
      setOffSet(offSet + 15)
    }
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const detailsData = await detailCharacter(id)
        setCharacter(detailsData.results[0])
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])

  return (
    <main className="mx-auto max-w-7xl">
      <Modal closeModal={closeModal} isopen={isModalOpen} editHero={editHero} />
      <Navbar />
      {isLoading ? (
        <div className="mt-10 w-80 mx-auto text-center ring-2 ring-black m-2 text-3xl font-bold bg-white">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-center">
          <div className="flex flex-wrap sm:flex-nowrap">
            <img
              className="mt-4 ring-2 ring-black shadow-black shadow-md"
              src={`${character?.thumbnail.path}.${character?.thumbnail.extension}`}
              alt={character?.name}
              width={500}
              height={400}
            />
            <div className="max-w-4xl flex flex-col items-center mt-4 p-4 text-center bg-white ring-2 ring-black">
              <div className="text-3xl font-bold mb-4">{character?.name}</div>
              {character?.description ? (
                <p className="text-sm font-light flex-1">
                  {character?.description}
                </p>
              ) : (
                <p className="text-sm font-light flex-1">no description</p>
              )}
              <button
                type="button"
                className="w-80 h-8 bg-blue-500 text-white ring-2 ring-black"
                onClick={() => setModalOpen(true)}
              >
                Edit
              </button>
            </div>
          </div>
          <h2 className="text-7xl p-2 bg-white ring-2 ring-black">Series</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 my-10">
            {series?.map(series => (
              <div
                key={series.id}
                className="flex flex-col items-center justify-center w-full"
              >
                <div className="relative ring-2 ring-black shadow-black shadow-md">
                  <img
                    className="object-fill w-[300px] h-[300px]"
                    src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
                    alt={series.title}
                  />
                  <div className="bg-white absolute bottom-4 right-0 ring-2 ring-black -skew-y-6">
                    <h2 className="p-2 text-lg text-black tracking-tight">
                      {series.title}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
