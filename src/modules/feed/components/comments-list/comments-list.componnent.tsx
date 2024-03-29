import {FC} from 'react'
import CommentItem from '../comment-item/comment-item.component';
import { useParams } from 'react-router-dom';
import { useGetCommentsForArticleQuery } from '../../api/repository';
import NewComment from '../new-comment/new-comment.component';

type CommentsListProps = {}

const CommentsList: FC<CommentsListProps> = () => {
   const { slug } = useParams();
   const { data, isLoading } = useGetCommentsForArticleQuery({slug: slug!})

   if(isLoading) {
      return <p>Loading...</p>
   }

   if(data?.comments.length === 0) {
      return (        
         <div className="max-w-3xl mx-auto mt-16 flex flex-col gap-3">
            <NewComment slug={slug!} data={data?.comments.length}/>
            <p className='mx-auto text-xl pt-6 text-gutter-darkGreen'>No comments found</p>
         </div>          
      )
   }
   return (
      <div className="max-w-3xl mx-auto mt-16 flex flex-col gap-3">
         <NewComment slug={slug!} data={data?.comments.length} />            
         {data?.comments.map(comment => (
            <CommentItem 
               body={comment.body} 
               author={comment.author}
               createdAt={comment.createdAt}
               key={comment.id}
               slug={slug!}
               isFavorited={false}
               commentId={comment.id}
            />
         ))}
      </div>
   )
}

export default CommentsList