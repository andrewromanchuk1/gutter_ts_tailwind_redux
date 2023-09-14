import React from 'react'
import Container from '../../../../common/components/container/container.component'
import ArticleList from '../article-list/article-list.component'
import FeedToggle from '../feed-toggle/feed-toggle.component'
import { useGetGlobalFeedQuery } from '../../api/repository'

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
   const { data, error, isLoading } = useGetGlobalFeedQuery('');

   if(isLoading) {
      return <Container>
         Is loading...
      </Container>
   }

   if(error) {
      return <Container>
         Some error has occured while loading feed.
      </Container>
   }

  return (
    <Container>
      <FeedToggle />
      <div className='flex'>
         <ArticleList list={data?.articles || []}/>
         <div className='w-1/4'>tags</div>
      </div>
    </Container>
  )
}

export default Feed