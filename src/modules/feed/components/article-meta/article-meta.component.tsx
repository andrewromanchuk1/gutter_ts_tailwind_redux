import { FC } from 'react'
import FollowButton from '../../../profile/components/follow-button/follow-button.component'
import ArticleAuthor, { NameStyleEnum } from '../article-author/article-author.component'
import FavoriteButton from '../favourite-button/favourite-button.component'
import { Author } from '../../api/dto/global-feed.in';

interface ArticleMetaProps {
   authorNameStyle?: keyof typeof NameStyleEnum;
   author: Author;
}

const ArticleMeta: FC<ArticleMetaProps> = ({ 
   authorNameStyle = NameStyleEnum.LIGHT,
   author
}) => {
  return (
   <div>
      <div className='inline-block mb-4'>
         <ArticleAuthor 
            author={author}
            createdAt={new Date().toISOString()}
            nameStyle={authorNameStyle}
         />
      </div>
      <div className='inline-flex gap-1'>
         <FollowButton username='Walter White' btnStyle='LIGHT'/>
         <FavoriteButton count={97} extended/>
      </div>
   </div>
  )
}

export default ArticleMeta