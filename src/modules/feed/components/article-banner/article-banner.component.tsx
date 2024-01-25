import { FC } from 'react'
import Container from '../../../../common/components/container/container.component'
import ArticleMeta from '../article-meta/article-meta.component'
import { Author } from '../../api/dto/global-feed.in';

interface ArticleBannerProps {
   title: string;
   author: Author;
   slug: string;
   likes: number;
   publishedAt: string;
   isFavorited: boolean;
}

const ArticleBanner: FC<ArticleBannerProps> = ({ 
   title,
   author,
   likes,
   publishedAt,
   slug,
   isFavorited,
}) => {
   return (
      <div className='bg-gutter-gray-1100 pt-8 pb-4 mb-8'>
         <Container>
            <h1 className='text-white text-articleTitle font-semibold leading-articleTitle mb-8'>
               {title}
            </h1>
            <div>
               <ArticleMeta 
                  author={author}                   
                  likes={likes} 
                  publishedAt={publishedAt} 
                  slug={slug} 
                  isFavorited={isFavorited}
               />
            </div>
         </Container>
      </div>
   )
}

export default ArticleBanner