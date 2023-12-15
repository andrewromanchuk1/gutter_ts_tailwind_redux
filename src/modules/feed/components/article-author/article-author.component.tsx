import { DateTime } from 'luxon'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Author } from '../../api/dto/global-feed.in'
import clsx from 'clsx';

export enum NameStyleEnum {
   GREEN = 'GREEN',
   LIGHT = 'LIGHT',
}

interface ArticleAuthorProps {
   author: Author;
   createdAt: string;
   nameStyle?: keyof typeof NameStyleEnum;
}

const ArticleAuthor: FC<ArticleAuthorProps> = ({ 
   author,
   createdAt,
   nameStyle = NameStyleEnum.GREEN
 }) => {

   const userNameClasses = clsx('font-medium', {
      'text-white hover:text-white': nameStyle === NameStyleEnum.LIGHT,

   })

   return (
      <div className='flex'>
         <Link to={`/@/${encodeURIComponent(author.username)}`}>
            <img 
            className='inline-block h-8 w-8 rounded-full'
            src={author.image} 
            alt={`${author.username} avatar`}/>
         </Link>
         <div className='mr-6 ml-0.3 inline-flex leading-4 flex-col'>
            <Link to={`/@/${encodeURIComponent(author.username)}`} className={userNameClasses}>
               {author.username}
            </Link>
            <span className='text-conduit-gray-500 text-date'>{DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_FULL)}</span>
         </div> 
      </div>
   )
}

export default ArticleAuthor