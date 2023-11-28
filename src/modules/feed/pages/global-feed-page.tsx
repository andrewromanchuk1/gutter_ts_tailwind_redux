import React from 'react'
import Banner from '../../../common/components/banner/banner.component'
import Feed from '../components/feed/feed.component'
import { useGetGlobalFeedQuery } from '../api/repository'
import { useSearchParams } from 'react-router-dom'
import { usePageParam } from '../hooks/use-page-param.hook'
import Container from '../../../common/components/container/container.component'
import FeedToggle from '../components/feed-toggle/feed-toggle.component'
import TagCloud from '../components/tag-cloud/tag-cloud.component'

type GlobalFeedPageProps = {}

const GlobalFeedPage: React.FC<GlobalFeedPageProps> = () => {

  const [searchParams] = useSearchParams();
  const { page } = usePageParam();
  const { data, error, isLoading, isFetching } = useGetGlobalFeedQuery({
    page,
    tag: searchParams.get('tag')
 });
  return (
   <>
      <Banner />
      <Container>
        <FeedToggle />
          <div className='flex'>
            <div className='w-3/4'>            
              <Feed 
                error={error} 
                isFetching={isFetching} 
                isLoading={isLoading} 
                data={data}
              />
            </div>
          <div className='w-1/4 pl-3'>
              <TagCloud />
          </div>
        </div>
      </Container>
   </>
  )
}

export default GlobalFeedPage