import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Layout from '../components/Layout'
import { MovieCard } from '../components/MovieCard'
import { fetchAPI } from '../lib/api'

const Home: NextPage = ({
  movies,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="Next Movies" description="Watch your next movies">
      <section className="grid items-stretch grid-cols-1 gap-1 py-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
        {movies.data.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const movies = await fetchAPI('/movies', { populate: '*' })

  return {
    props: {
      movies,
    },
  }
}

export default Home
