import { FC } from 'react'
import { FieldErrors } from 'react-hook-form';
import { EditorFormValues } from '../../../modules/feed/pages/editor.page';

type ErrorsListProps = {
   errors: FieldErrors<EditorFormValues>;
}

const ErrorsList: FC<ErrorsListProps> = ({ errors }) => {
  return (
   <dl className='pl-7'>
      {(Object.keys(errors) as (keyof typeof errors)[]
         ).map((err, id) => (
      <li key={id} className='text-conduit-red font-bold'>{errors[err]?.message}</li>
      ))}
   </dl>
  )
}

export default ErrorsList