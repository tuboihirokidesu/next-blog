import React, { useState } from 'react'
import { IFields } from '../../types'
import { MdClose } from 'react-icons/md'

import Image from 'next/image'
import Link from 'next/link'
import { NextPage } from 'next'
import { Entry } from 'contentful'

const BlogCard: NextPage<{ item: Entry<IFields> }> = ({ item }) => {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <>
      <Image
        src={'https:' + item.fields.thumbnail.fields.file.url}
        alt={item.fields.title}
        className="object-contain cursor-pointer"
        onClick={() => setShowDetail(true)}
        layout="responsive"
        height="300"
        width="400"
      />
      <p className="my-2 text-center">{item.fields.title}</p>

      {showDetail && (
        <div className="absolute top-0 left-0 z-10 grid w-full h-full p-2 text-black bg-white md:grid-cols-2 gap-x-12 dark:text-white dark:bg-black">
          <Image
            className="object-contain"
            src={'https:' + item.fields.thumbnail.fields.file.url}
            alt={item.fields.title}
            layout="responsive"
            height="150"
            width="300"
          />
          <div className="flex justify-center my-4 space-x-3">
            <Link href={'/article/' + item.fields.slug}>
              <a className="flex items-center px-4 space-x-3 text-2xl font-bold bg-gray-200 dark:bg-dark-100 hover:text-orange">
                detail
              </a>
            </Link>
            <div className="flex items-center text-sm">
              {item.fields.type.map(tech => (
                <span
                  key={tech}
                  className="px-2 py-1 my-1 text-subtext dark:bg-dark-200"
                >
                  [{tech}]
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowDetail(false)}
            className="absolute p-1 bg-gray-200 rounded-full top-3 right-3 focus:outline-none dark:bg-dark-200"
          >
            <MdClose size={30} />
          </button>
        </div>
      )}
    </>
  )
}

export default BlogCard
