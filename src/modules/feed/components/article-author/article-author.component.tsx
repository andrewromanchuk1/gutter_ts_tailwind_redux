import { DateTime } from 'luxon'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Author } from '../../api/dto/global-feed.in'
import clsx from 'clsx';

export enum NameStyleEnum {
   GREEN = 'GREEN',
   LIGHT = 'LIGHT',
}

export enum MetaDirectionEnum {
   ROW = 'ROW',
   COL = 'COL',
}

enum NameSizeEnum {
   SM ='SM',
   BASE = 'BASE',
}

interface ArticleAuthorProps {
   author: Author;
   publishedAt: string;
   nameStyle?: keyof typeof NameStyleEnum;
   nameSize?: keyof typeof NameSizeEnum;
   direction?: keyof typeof MetaDirectionEnum;
}

const ArticleAuthor: FC<ArticleAuthorProps> = ({ 
   author,
   publishedAt,
   nameStyle = NameStyleEnum.GREEN,
   direction = MetaDirectionEnum.COL,
   nameSize = NameSizeEnum.BASE,

 }) => {

   const userNameClasses = clsx('font-medium', {
      'text-white hover:text-white': nameStyle === NameStyleEnum.LIGHT,
      'text-date font-extralight': nameSize === NameSizeEnum.SM,
   })

   const metaClasses = clsx('mr-6 ml-0.3 inline-flex leading-4', {
      'flex-col': direction === MetaDirectionEnum.COL,
      'flex-row items-center gap-2': direction === MetaDirectionEnum.ROW
   })

   const imageClasses = clsx('inline-block rounded-full', {
      'h-8 w-8': nameSize === NameSizeEnum.BASE,
      'h-5 w-5': nameSize === NameSizeEnum.SM,
   })

   return (
      <div className='flex'>
         <Link to={`/@/${encodeURIComponent(author.username)}`}>
            <img 
            className={imageClasses}
            src={author.image} 
            alt={`${author.username} avatar`}/>
         </Link>
         <div className={metaClasses}>
            <Link to={`/@/${encodeURIComponent(author.username)}`} className={userNameClasses}>
               {author.username}
            </Link>
            <span className='text-conduit-gray-500 text-date font-light'>{DateTime.fromISO(publishedAt).toLocaleString(DateTime.DATE_FULL)}</span>
         </div> 
      </div>
   )
}

export default ArticleAuthor