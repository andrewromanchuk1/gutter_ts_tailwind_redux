import React from 'react'
import Banner from '../../../common/components/banner/banner.component'
import Feed from '../components/feed/feed.component'
import { useGetGlobalFeedQuery } from '../api/repository'
import { useSearchParams } from 'react-router-dom'

type GlobalFeedPageProps = {}

const GlobalFeedPage: React.FC<GlobalFeedPageProps> = () => {

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 0;
  const { data, error, isLoading, isFetching } = useGetGlobalFeedQuery({
    page,
    tag: searchParams.get('tag')
 });
  return (
   <>
      <Banner />
      <Feed 
        error={error} 
        isFetching={isFetching} 
        isLoading={isLoading} 
        data={data}
      />
   </>
  )
}

export default GlobalFeedPage