import Layout from '../../components/Layout'
import Link from 'next/link'
import { fetchAPI } from '../../lib/api'
import { GetStaticPaths, GetStaticProps } from 'next'

const Movie = ({ movie }) => {
  return (
    <Layout
      title={movie.attributes.title}
      description={movie.attributes.overview}
    >
      <div className="pt-6">
        <Link href="/">
          <a className="text-red-500">&larr; Back to home</a>
        </Link>
      </div>
      <section className="flex flex-col py-10 md:flex-row md:space-x-6">
        <div className="w-full md:w-auto">
          <img
            className="w-full rounded-lg sm:w-64"
            src={`${movie.attributes.cover}`}
            alt={movie.attributes.title}
          />
        </div>
        <div className="flex flex-col w-full mt-6 md:mt-0 md:flex-1">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-white">
              {movie.attributes.title}{' '}
              <span className="font-normal text-gray-400">
                ({new Date(movie.attributes.release_date).getFullYear()})
              </span>{' '}
            </h2>
            {movie.attributes.genres.data.map((genre) => (
              <Link key={genre.name} href={`/genres/${genre.id}`}>
                <a className="inline-block px-2 py-1 mt-3 mr-2 text-xs text-white uppercase bg-red-500 rounded-lg tracking wide">
                  {genre.attributes.name}
                </a>
              </Link>
            ))}
            <p className="mt-5 text-lg text-white">
              {movie.attributes.overview}
            </p>
          </div>
          <div className="flex flex-col mt-6 sm:flex-row sm:items-center sm:space-x-6 md:mt-0">
            <div className="flex items-end">
              <p className="text-sm text-white uppercase tracking-whide">
                Released on:
              </p>{' '}
              <time
                className="pl-2 text-sm tracking-wide text-gray-400 uppercase"
                dateTime={movie.release_date}
              >
                {new Date(movie.attributes.release_date).toDateString()}
              </time>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const movies = await fetchAPI('/movies')
  const paths = movies.data.map((movie) => {
    return {
      params: { id: String(movie.id) },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetchAPI(`/movies/${params!.id}`, { populate: '*' })
  const movie = res.data

  return {
    props: {
      movie,
    },
  }
}

export default Movie
