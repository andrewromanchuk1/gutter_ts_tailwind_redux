import { ComponentProps, FC } from 'react'
import { useAuth } from '../../../auth/hooks/use-auth';
import { useDeleteCommentMutation } from '../../api/repository';
import { toast } from 'react-toastify';
import { Author } from '../../api/dto/global-feed.in';
import ArticleAuthor, { NameStyleEnum } from '../article-author/article-author.component';
import Button from '../../../../common/components/button/button.component';

interface CommentMetaProps {
   author: Author;
   publishedAt: string;
   authorNameStyle?: ComponentProps<typeof ArticleAuthor>['nameStyle'];
   authorDirection?: ComponentProps<typeof ArticleAuthor>['direction'];
   authorNameSize?: ComponentProps<typeof ArticleAuthor>['nameSize'];
   slug: string;
   commentId: number;
}

const CommentMeta: FC<CommentMetaProps> = ({
   slug,
   commentId,    
   authorNameStyle = NameStyleEnum.LIGHT,
   author,
   publishedAt,
   authorDirection,
   authorNameSize = 'BASE',
}) => {

   const { user } = useAuth();


   const [ triggerDeleteComment, { isLoading } ] = useDeleteCommentMutation();

   const handleDeleteComment = async () => {
      try {
         await triggerDeleteComment({ 
            articleSlug: slug, 
            id: commentId 
         });
      } catch (error) {
         toast.error('Something wen\'t wrong')
      }
   }

   const isAuthor = user?.username === author.username

   return (
      <div className='flex justify-between items-center'>
         <ArticleAuthor 
            author={author}
            publishedAt={publishedAt} 
            nameStyle={authorNameStyle}
            direction={authorDirection}
            nameSize={authorNameSize}
         />
         { isAuthor && (
            <Button 
               onClick={handleDeleteComment} 
               disabled={isLoading}
               btnStyle='DANGER'
            >
               <i className='ion-trash-a' />
            </Button>
         )}
      </div>
   )
}

export default CommentMeta