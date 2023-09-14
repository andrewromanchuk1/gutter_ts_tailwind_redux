import React from 'react'

type TagListProps = {
   list: string[]
}

const TagList: React.FC<TagListProps> = ({list}) => {
  return (
    <ul className='flex'>
      {list.map((item) => (
         <li key={item} className='text-conduit-tag font-light text-date border-conduit-lightenGray border mr-1 mb-0.2 px-tag rounded-tag'>
            {item}
         </li>
      ))}
      
    </ul>
  )
}

export default TagList