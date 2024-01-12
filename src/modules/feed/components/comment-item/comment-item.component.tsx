import {FC} from 'react'
import ArticleMeta from '../article-meta/article-meta.component'
import { Author } from '../../api/dto/article-comments.in';

interface CommentItemProps {
   body: string;
   author: Author;
   createdAt: string;
   slug: string;
   isFavorited: boolean;
} 

const CommentItem: FC<CommentItemProps> = ({ 
   body,
   author,
   createdAt,
   slug,
   isFavorited,
 }) => {
  return (
   <div>
      <div className="border border-conduit-gray-250 rounded">
         <div className="p-5">
            <p>{body}</p>
         </div>
         <div className="border-t border-conduit-gray-250 bg-conduit-gray-150 py-3 px-5">
            <ArticleMeta
               author={author}
               publishedAt={createdAt}
               authorNameStyle="GREEN"
               showActionButtons={false}
               authorDirection="ROW"
               authorNameSize="SM"
               slug={slug}
               isFavorited={isFavorited}
            />
         </div>
      </div>
   </div>
  )
}

export default CommentItem