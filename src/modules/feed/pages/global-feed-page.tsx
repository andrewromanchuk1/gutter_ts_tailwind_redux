import React from 'react'
import Banner from '../../../common/components/banner/banner.component'
import Feed from '../components/feed/feed.component'
import { useGetGlobalFeedQuery } from '../api/repository'
import { useMatch, useSearchParams } from 'react-router-dom'
import { usePageParam } from '../hooks/use-page-param.hook'
import Container from '../../../common/components/container/container.component'
import FeedToggle from '../components/feed-toggle/feed-toggle.component'
import TagCloud from '../components/tag-cloud/tag-cloud.component'
import { useAuth } from '../../auth/hooks/use-auth'
import { routes } from '../../../core/routes'

type GlobalFeedPageProps = {}

const GlobalFeedPage: React.FC<GlobalFeedPageProps> = () => {
  const { isLoggedIn } = useAuth();
  const personalFeed = useMatch(routes.personalFeed)

  const [searchParams] = useSearchParams();
  const { page } = usePageParam();
  const { data, error, isLoading, isFetching } = useGetGlobalFeedQuery({
    page,
    tag: searchParams.get('tag'),
    isPersonalFeed: personalFeed !== null,
  });

  const feedToggleItems = [];

  if(isLoggedIn) {
    feedToggleItems.push({
      text: 'Your feed',
      link: '/personal-feed'
    })
  }

  return (
   <>
      { !isLoggedIn && <Banner />}      
      <Container>
        <FeedToggle items={feedToggleItems}/>
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