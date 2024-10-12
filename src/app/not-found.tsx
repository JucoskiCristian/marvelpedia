import { Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mt-20 mx-auto text-cente justify-center items-center max-w-7xl flex flex-col bg-white ring-2 ring-black">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        className="bg-blue-500 flex gap-2 text-center m-2 p-2 w-32 ring-2 ring-black"
        href="/"
      >
        <Home />
        Return Home
      </Link>
    </div>
  )
}
