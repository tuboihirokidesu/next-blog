import React from 'react'
import { useTheme } from 'next-themes'
import { Category } from '../../types'
import { SunIcon } from '@heroicons/react/outline'
import { MoonIcon } from '@heroicons/react/solid'

export const NavItem: React.FC<{
  value: Category
  handlerFilterCategory: (category: Category) => void
  active: string
}> = ({ value, handlerFilterCategory, active }) => {
  let className = 'capitalize cursor-pointer hover:text-orange'
  if (active === value) className += ' text-orange'

  return (
    <li className={className} onClick={() => handlerFilterCategory(value)}>
      {value}
    </li>
  )
}

const BlogNavbar: React.FC<{
  handlerFilterCategory: (category: Category) => void
  active: string
}> = props => {
  const { theme, setTheme } = useTheme()
  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="flex flex-col justify-between min-h-full">
      <div className="flex justify-between">
        <h3 className="text-3xl font-medium tracking-wider text-purple font-kaushan dark:text-subtext">
          Blog
        </h3>
        {theme === 'light' ? (
          <SunIcon className="h-8" />
        ) : (
          <MoonIcon className="h-8" />
        )}
      </div>
      <div className="flex flex-col py-6 space-x-3 overflow-x-auto list-none">
        <NavItem value="dog" {...props} />
        <NavItem value="Border Collie" {...props} />
        <NavItem value="bulldog" {...props} />
        <NavItem value="husky" {...props} />
      </div>
      <button
        onClick={changeTheme}
        className="py-2 my-4 text-white bg-black rounded-full cursor-pointer bg-gradient-to-r from-orange to-purple dark:from-subtext dark:to-darkblue focus:outline-none hover:scale-105"
      >
        {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  )
}

export default BlogNavbar
