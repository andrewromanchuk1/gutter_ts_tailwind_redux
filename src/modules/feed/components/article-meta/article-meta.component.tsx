import { ComponentProps, FC } from 'react'
import FollowButton from '../../../profile/components/follow-button/follow-button.component'
import ArticleAuthor, { NameStyleEnum } from '../article-author/article-author.component'
import FavoriteButton from '../favourite-button/favourite-button.component'
import { Author } from '../../api/dto/global-feed.in';

interface ArticleMetaProps {
   author: Author;
   likes?: number;
   publishedAt: string;
   authorNameStyle?: ComponentProps<typeof ArticleAuthor>['nameStyle'];
   authorDirection?: ComponentProps<typeof ArticleAuthor>['direction'];
   authorNameSize?: ComponentProps<typeof ArticleAuthor>['nameSize'];
   showActionButtons?: boolean;
}

const ArticleMeta: FC<ArticleMetaProps> = ({ 
   authorNameStyle = NameStyleEnum.LIGHT,
   author,
   likes,
   publishedAt,
   showActionButtons = true,
   authorDirection,
   authorNameSize = 'BASE'
}) => {
  return (
   <div>
      <div className='inline-block'>
         <ArticleAuthor 
            author={author}
            publishedAt={publishedAt}
            nameStyle={authorNameStyle}
            direction={authorDirection}
            nameSize={authorNameSize}
         />
      </div>
      {showActionButtons && (
         <div className='inline-flex gap-1'>
            <FollowButton username={author.username} btnStyle='LIGHT'/>
            <FavoriteButton count={likes || 0} extended/>
         </div>
      )}
      
   </div>
  )
}

export default ArticleMeta