import Layout from '../../components/Layout'
import Link from 'next/link'
import { fetchAPI } from '../../lib/api'
import { MovieCard } from '../../components/MovieCard'
import { GetStaticPaths, GetStaticProps } from 'next'

const Genre = ({ genre }) => {
  return (
    <Layout
      title={`${genre.attributes.name} movies`}
      description={`Watch ${genre.attributes.name} movies`}
    >
      <div className="flex items-center pt-6 space-x-3">
        <Link href="/">
          <a className="text-red-500">Home {'>'}</a>
        </Link>
        <Link href="/genres">
          <a className="text-red-500">genres {'>'}</a>
        </Link>
        <Link href={`/genres/${genre.id}`}>
          <a className="text-red-500">{genre.attributes.name}</a>
        </Link>
      </div>
      <section className="grid items-stretch grid-cols-1 gap-1 py-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
        {genre.attributes.movies.data.map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const genres = await fetchAPI('/genres')
  const paths = genres.data.map((genre) => {
    return {
      params: { id: String(genre.id) },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetchAPI(`/genres/${params!.id}`, { populate: '*' })
  const genre = res.data

  return {
    props: {
      genre,
    },
  }
}

export default Genre
