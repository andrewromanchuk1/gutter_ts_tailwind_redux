import React from 'react'

type TagListProps = {}

const TagList: React.FC<TagListProps> = () => {
  return (
    <ul className='flex'>
      <li className='text-conduit-tag font-light text-date border-conduit-lightenGray border mr-1 mb-0.2 px-tag rounded-tag'>
         qwe
      </li>
      <li className='text-conduit-tag font-light text-date border-conduit-lightenGray border mr-1 mb-0.2 px-tag rounded-tag'>
         qwe
      </li>
      <li className='text-conduit-tag font-light text-date border-conduit-lightenGray border mr-1 mb-0.2 px-tag rounded-tag'>
         qwe
      </li>
      <li className='text-conduit-tag font-light text-date border-conduit-lightenGray border mr-1 mb-0.2 px-tag rounded-tag'>
         qwe
      </li>
    </ul>
  )
}

export default TagList