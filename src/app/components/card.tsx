import Link from 'next/link'
import type { Character } from '../types/characters'
interface CharacterCardProps {
  characters: Character[]
}

export default function Card({ characters }: CharacterCardProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 my-10">
      {characters.map(character => (
        <Link key={character.id} href={`character/${character.id}`}>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="relative ring-2 ring-black shadow-black shadow-md">
              <img
                className="object-fill w-[300px] h-[300px]"
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />
              <div className="bg-white absolute bottom-4 right-0 ring-2 ring-black -skew-y-6">
                <h2 className="p-2 text-lg text-black tracking-tight">
                  {character.name}
                </h2>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
