import { FC, useEffect } from 'react'
import { useAuth } from '../../../auth/hooks/use-auth'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import TextArea from '../../../../common/components/textarea/textarea.component'
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../../common/components/button/button.component';
import { useCreateCommentMutation } from '../../api/repository';
import { toast } from 'react-toastify';
import { ArticleCommentsInDTO } from '../../api/dto/article-comments.in';

interface NewCommentProps {
   slug: string
   data: number | undefined
}

interface NewCommentFormValues {
   comment: string;
}

const validationSchema = yup.object({
   comment: yup.string().required(),
})

const NewComment: FC<NewCommentProps> = ({ slug, data }) => {

   const [triggerNewComment] = useCreateCommentMutation();

   const { isLoggedIn, user } = useAuth();

   const { register, handleSubmit, formState, reset } = useForm({
      defaultValues: {
         comment: '',
      },
      resolver: yupResolver(validationSchema)
   })

   const onSubmit = async (values: NewCommentFormValues) => {
      try {         
         await triggerNewComment({articleSlug: slug, comment: values.comment}).unwrap();
      } catch (error) {
         toast.error('Something gone wrong')
      }
   }

   useEffect(() => {
      reset({ comment: ''});
   }, [data])

   if( !isLoggedIn ) {
      return (
         <>
            <Link to='/login'>Sign in</Link> or <Link to='/register'>sign up</Link> to add comments on this article.
         </>
      )
   }

   return (
      <form 
         onSubmit={handleSubmit(onSubmit)}
         className='border border-conduit-gray-250 rounded w-100'
      >
         <TextArea 
            placeholder='Leave your comment' 
            size='SM'
            {...register('comment')}
            noBorder
            rows={3}
            className='py-3 px-6'
         />
         <div 
            className='border-t border-conduit-gray-250 bg-conduit-gray-150 py-3 px-5 flex justify-between items-center' 
         >  
            <img 
               alt={`${user?.username}  avatar`} 
               src={user?.image} 
               className='w-8 h-8 rounded-full mr-2 inline'
            />
            <Button 
               type='submit'
               btnStyle='GREEN'
               disabled={formState.isSubmitting}
            >
               Post Comment
            </Button>
         </div>
      </form>
   )
   
}

export default NewComment