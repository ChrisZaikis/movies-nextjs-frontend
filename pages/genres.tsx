import Layout from '../components/Layout'
import { fetchAPI } from '../lib/api'
import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

const Genres = ({ genres }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Layout
        title="Movies Genres"
        description={`Watch your next movies from ${genres.length} genres`}
      >
        <div className="flex items-center pt-6 space-x-3">
          <Link href="/">
            <a className="text-red-500">&larr; Back to home</a>
          </Link>
        </div>

        <section className="grid items-stretch grid-cols-1 gap-1 py-10 space-y-6 sm:grid-cols-2 sm:gap-6 sm:space-y-0 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
          {genres.map((genre) => (
            <div key={genre.id} className="flex flex-col">
              <Link href={`/genres/${genre.id}`}>
                <a className="flex items-center justify-center px-3 py-10 text-3xl text-center text-red-500 bg-gray-800 rounded-lg shadow-lg">
                  {genre.attributes.name}
                  <br />({genre.attributes.movies.data.length})
                </a>
              </Link>
            </div>
          ))}
        </section>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetchAPI('/genres', { populate: '*' })
  const genres = res.data

  return {
    props: {
      genres,
    },
  }
}

export default Genres
