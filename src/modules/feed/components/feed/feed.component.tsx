import React from 'react'
import ArticleList from '../article-list/article-list.component'
import ReactPaginate from 'react-paginate'
import { FEED_PAGE_SIZE } from '../../consts'
import { GlobalFeedInDTO } from '../../api/dto/global-feed.in'
import { usePageParam } from '../../hooks/use-page-param.hook'

interface FeedProps {
   isLoading: boolean,
   isFetching: boolean,
   error: any,
   data?: GlobalFeedInDTO
}

const Feed: React.FC<FeedProps> = ({
   isFetching,
   isLoading,
   error,
   data
}) => {

   const {page, setPage} = usePageParam();

   const handleChange = ({selected}: {selected: number}) => {
      setPage(selected)
   }   

   if(isLoading || isFetching) {
      return <p className='mt-4'>
         Loading articles...
      </p>
   }

   if(error) {
      return <p className='mt-4'>
         Some error has occured while loading feed.
      </p>
   }

   if(data?.articlesCount === 0) {
      return <p className='mt-4'>
         No articles are here, yet...
      </p>
   }

  return (
    <>      
      <ArticleList list={data?.articles || []} />
      <nav className='my-6 mx-auto'>
         <ReactPaginate
            pageCount={Math.ceil((data?.articlesCount || 0 )/ FEED_PAGE_SIZE)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            previousLabel={null}
            nextLabel={null}
            breakLabel='...'
            breakLinkClassName='p-3 bg-white border border-conduit-gray-300 -ml-px hover:bg-conduit-gray-200 
            group-[:nth-child(2)]:rounded-l group-[:nth-last-child(2)]:rounded-r'
            containerClassName='flex justify-center'
            pageClassName='group'
            pageLinkClassName='p-3 bg-white border border-conduit-gray-300 -ml-px hover:bg-conduit-gray-200 
            group-[:nth-child(2)]:rounded-l group-[:nth-last-child(2)]:rounded-r'
            activeClassName='active group'
            activeLinkClassName='group-[.active]:bg-conduit-green group-[.active]:text-white 
               group-[.active]:border-conduit-green'
            onPageChange={handleChange}
            forcePage={page}
         />
      </nav>
    </>
  )
}

export default Feed