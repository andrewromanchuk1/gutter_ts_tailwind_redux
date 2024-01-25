import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'

enum TagListStyle {
  DARK = 'DARK',
  LIGHT = 'LIGHT'
}
interface TagListProps {
   list: string[],
   itemStyle?: keyof typeof TagListStyle,
   itemAs?: 'li' | 'a'
}
const TagList: React.FC<TagListProps> = ({
  list,
  itemStyle = TagListStyle.LIGHT,
  itemAs = 'li'
 }) => {
  const itemClasses = clsx(
    'font-light text-date border mr-1 mb-0.2 px-tag rounded-tag',
    {
      'border-gutter-gray-300 text-gutter-gray-600': itemStyle === TagListStyle.LIGHT,
      'bg-gutter-gray-800 text-white border-gutter-gray-800 hover:bg-gutter-gray-900': itemStyle === TagListStyle.DARK,
      'hover:text-white hover:no-underline': itemStyle === TagListStyle.DARK && itemAs === 'a',
    }
  );
  return (
    <ul className='flex flex-wrap'>
      {list.map((item) => {
        return itemAs === 'li' ? (
          <li key={item} className={itemClasses}>
            {item}
          </li>
        ) : (
          <Link to={`/gutter_ts_tailwind_redux/?tag=${item}`} key={item} className={itemClasses}>
            {item}
          </Link>
        )
      })}      
    </ul>
  )
}

export default TagList