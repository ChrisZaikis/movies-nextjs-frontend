import Link from 'next/link'

export function MovieCard({ movie }) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <a className="flex flex-col mt-6 overflow-hidden">
        <img
          className="flex-1 block w-full rounded-lg"
          src={`${movie.attributes.cover}`}
          alt={movie.attributes.title}
        />
        <h2 className="justify-end mt-3 text-lg text-center text-red-500">
          {movie.attributes.title}
        </h2>
      </a>
    </Link>
  )
}
