import {FC} from 'react'
import { Author } from '../../api/dto/article-comments.in';
import CommentMeta from '../comment-meta/comment-meta.component';

interface CommentItemProps {
   body: string;
   author: Author;
   createdAt: string;
   slug: string;
   isFavorited: boolean;
   commentId: number;
} 

const CommentItem: FC<CommentItemProps> = ({ 
   body,
   author,
   createdAt,
   slug,
   commentId,
 }) => {
   return (
      <div className="border border-conduit-gray-250 rounded">
         <div className="p-5">
            <p>{body}</p>
         </div>
         <div className="border-t border-conduit-gray-250 bg-conduit-gray-150 py-3 px-5">
            <CommentMeta 
               author={author}
               publishedAt={createdAt}
               slug={slug}
               commentId={commentId}
               authorDirection="ROW"
               authorNameSize="SM"
               authorNameStyle="GREEN"
            />
         </div>
      </div>
   )
}

export default CommentItem