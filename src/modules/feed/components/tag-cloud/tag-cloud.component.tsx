import React, { useEffect } from 'react'
import TagList from '../tag-list/tag-list.component'
import { useGetPopularTagsQuery } from '../../api/repository'

type TagCloudProps = {}

const TagCloud: React.FC<TagCloudProps> = () => {
const {data, isLoading, isFetching, error} = useGetPopularTagsQuery('');


  return (
    <div className='bg-conduit-gray-100 p-3 pt-1.5'>
      <p className='mb-2'>Popular tags</p>
      {
         isLoading || isFetching ? <p className='mb-2'>Loading popular tags...</p> : 
         error ? <p className='mb-2'>Error while loading popular tags</p> : 
         <TagList list={data!.tags} itemStyle='DARK' itemAs='a'/> 
      }
    </div>
  )
}

export default TagCloud