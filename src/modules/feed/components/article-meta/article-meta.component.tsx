import { ComponentProps, FC } from 'react'
import FollowButton from '../../../profile/components/follow-button/follow-button.component'
import ArticleAuthor, { NameStyleEnum } from '../article-author/article-author.component'
import FavoriteButton from '../favourite-button/favorite-button.component'
import { Author } from '../../api/dto/global-feed.in';
import { useAuth } from '../../../auth/hooks/use-auth';
import Button from '../../../../common/components/button/button.component';

interface ArticleMetaProps {
   author: Author;
   likes?: number;
   slug: string;
   publishedAt: string;
   authorNameStyle?: ComponentProps<typeof ArticleAuthor>['nameStyle'];
   authorDirection?: ComponentProps<typeof ArticleAuthor>['direction'];
   authorNameSize?: ComponentProps<typeof ArticleAuthor>['nameSize'];
   showActionButtons?: boolean;
   isFavorited: boolean;
}

const ArticleMeta: FC<ArticleMetaProps> = ({ 
   authorNameStyle = NameStyleEnum.LIGHT,
   author,
   likes,
   slug,
   publishedAt,
   showActionButtons = true,
   authorDirection,
   authorNameSize = 'BASE',
   isFavorited,
}) => {
const { user } = useAuth();

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
            { 
               user?.username === author.username ? (
                  <>
                     <Button>
                        <i className='ion-edit'/> Edit Article 
                     </Button>
                     <Button btnStyle='DANGER'>
                        <i className='ion-trash-a'/> Delete Article 
                     </Button>
                  </>
               )  : (
                  <>           
                     <FollowButton 
                        username={author.username} 
                        btnStyle='LIGHT' 
                        isFollowed={author.following}
                     />
                     <FavoriteButton 
                        count={likes || 0} 
                        extended slug={slug} 
                        isFavorited={isFavorited}
                     />
                  </>               
            )}
         </div>
      )}
      
   </div>
  )
}

export default ArticleMeta