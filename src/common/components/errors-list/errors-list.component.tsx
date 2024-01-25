import { FC } from 'react'
import { FieldErrors } from 'react-hook-form';
import { PostFormValues } from '../../../modules/feed/types';

type ErrorsListProps = {
   errors: FieldErrors<PostFormValues>;
}

const ErrorsList: FC<ErrorsListProps> = ({ errors }) => {
  return (
   <dl className='pl-7'>
      {(Object.keys(errors) as (keyof typeof errors)[]
         ).map((err, id) => (
      <li key={id} className='text-gutter-red font-bold'>{errors[err]?.message}</li>
      ))}
   </dl>
  )
}

export default ErrorsList