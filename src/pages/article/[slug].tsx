import React from 'react'
import { createClient, EntryCollection } from 'contentful'
import Layout from '../../components/Layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { GetStaticPaths, GetStaticProps } from 'next'
import moment from 'moment'
import { IResponse, IArticle } from '../../../types'
import Image from 'next/image'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY
})

export const getStaticPaths: GetStaticPaths = async () => {
  const res: EntryCollection<IResponse> = await client.getEntries({
    content_type: 'article'
  })

  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'article',
    'fields.slug': params.slug
  })

  // if (!items.length) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false
  //     }
  //   }
  // }

  return {
    props: { article: items[0] }
  }
}

const Article: React.FC<IArticle> = ({ article }) => {
  console.log(article.fields.content)

  return (
    <div className="flex items-center justify-center ">
      <Layout title={article.fields.title}></Layout>
      <div>
        <div className="flex justify-between">
          <h1 className="mt-10 text-orange ">{article.fields.title}</h1>
          <h3>{moment(article.fields.date).utc().format('YYYY/MM/DD')}</h3>
        </div>
        <div>
          {documentToReactComponents(article.fields.content, {
            renderNode: {
              // eslint-disable-next-line react/display-name
              [BLOCKS.EMBEDDED_ASSET]: node => {
                console.log(node)

                return (
                  <Image
                    className="object-contain"
                    src={'https:' + node.data.target.fields.file.url}
                    width={600}
                    height={700}
                    //node.data.target.fields.file.detail.image.width
                  />
                )
              }
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Article
