import React, { useState } from 'react'
import Head from 'next/head'
import { createClient, EntryCollection } from 'contentful'
import { InferGetStaticPropsType, NextPage } from 'next'
import BlogCard from '../components/BlogCard'
import Sidebar from '../components/BlogNavbar'
import { Category, IFields } from '../../types'

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  const response: EntryCollection<IFields> = await client.getEntries({
    content_type: 'article'
  })

  return {
    props: {
      article: response.items
    }
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ article }) => {
  const [articles, setArticles] = useState(article)
  const [active, setActive] = useState('dog')

  const handlerFilterCategory = (category: Category) => {
    if (category === 'dog') {
      setArticles(article)
      setActive(category)
      return
    }
    const newArray = article.filter(item => item.fields.type.includes(category))

    setArticles(newArray)
    setActive(category)
  }

  return (
    <div className="px-5 py-2 overflow-scroll">
      <Head>
        <title>Homepage</title>
      </Head>
      <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 ">
        {/* // do this div style later (after putting the content) */}
        <div className="h-full col-span-12 p-4 text-base text-center bg-white dark:bg-black lg:col-span-3 rounded-2xl shadow-custom-light dark:shadow-custom-dark ">
          <Sidebar
            handlerFilterCategory={handlerFilterCategory}
            active={active}
          />
        </div>
        <div className="flex flex-col col-span-12 overflow-hidden bg-white shadow-custom-light rounded-2xl lg:col-span-9 dark:bg-black">
          <div className="relative grid grid-cols-12 gap-4 my-3">
            {articles.map(item => (
              <div
                key={item.sys.id}
                className="col-span-12 p-2 bg-gray-200 rounded-lg sm:col-span-6 lg:col-span-4 dark:bg-dark-200"
              >
                <BlogCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
