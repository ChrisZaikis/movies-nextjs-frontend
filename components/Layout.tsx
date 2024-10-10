import Link from 'next/link'
import Head from 'next/head'

export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <title>{title}</title>
      </Head>
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="container px-3 mx-auto xl:px-20">
          <div className="flex items-center justify-center h-20">
            <Link href="/">
              <a className="text-4xl font-semibold text-red-500">Next Movies</a>
            </Link>
          </div>
        </div>
      </header>
      <main className="min-h-screen bg-gray-900">
        <div className="container px-3 mx-auto xl:px-20">{children}</div>
      </main>
    </>
  )
}
