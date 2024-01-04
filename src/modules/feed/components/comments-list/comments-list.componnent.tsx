import {FC} from 'react'
import CommentItem from '../comment-item/comment-item.component';
import { Link, useParams } from 'react-router-dom';
import { useGetCommentsForArticleQuery } from '../../api/repository';

type CommentsListProps = {}

const CommentsList: FC<CommentsListProps> = () => {
   const { slug } = useParams();
   const { data, isLoading } = useGetCommentsForArticleQuery({slug: slug!})

   if(isLoading) {
      return <p>Loading...</p>
   }

   if(!data || data.comments.length === 0) {
      return (
         <div className="max-w-3xl mx-auto mt-16 flex flex-col gap-3">
            <p className='mx-auto'>
               <Link to='/login'>Sign in</Link> or <Link to='/register'>sign up</Link> to add comments on this article.
            </p>
            <p className='mx-auto text-xl pt-6 text-conduit-darkGreen'>No comments found</p>
         </div>
      )
   }
   console.log(data.comments)

  return (
   <div className="max-w-3xl mx-auto mt-16 flex flex-col gap-3">
      <p className='mx-auto'>
         <Link to='/login'>Sign in</Link> or <Link to='/register'>sign up</Link> to add comments on this article.
      </p>
      {data.comments.map(comment => (
         <CommentItem 
            body={comment.body} 
            author={comment.author}
            createdAt={comment.createdAt}
            key={comment.id}
         />
      ))}
   </div>
  )
}

export default CommentsList