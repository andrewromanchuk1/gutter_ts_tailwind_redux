import {FC} from 'react'
import { Link } from 'react-router-dom'
import defaultAva from '../../../../assets/defaultAva.png'
import FavoriteButton from '../favourite-button/favourite-button.component';
import TagList from '../tag-list/tag-list.component';
import { FeedArticle } from '../../api/dto/global-feed.in';
import { DateTime } from 'luxon';

interface ArticleProps extends FeedArticle {}

const Article: FC<ArticleProps> = ({ 
  author,
  createdAt,
  favoritesCount,
  title,
  description,
  tagList
 }) => {
  return <article>
    <div className='border-t border-black-10 py-6'>
      <div className='mb-4 font-light flex justify-between'>
        <div className='flex'>
        <Link to={`/@/${encodeURIComponent(author.username)}`}>
          <img 
           className='inline-block h-8 w-8 rounded-full'
           src={author.image} 
           alt={`${author.username} avatar`}/>
        </Link>
        <div className='mr-6 ml-0.3 inline-flex leading-4 flex-col'>
          <Link to={`/@/${encodeURIComponent(author.username)}`} className='font-medium'>
            {author.username}
          </Link>
          <span className='text-conduit-gray-500 text-date'>{DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_FULL)}</span>
        </div> 
        </div>
        <FavoriteButton count={favoritesCount}/>
      </div>
      <Link to={`/@/${encodeURIComponent(author.username)}`} className='hover:no-underline'>
        <h2 className='mb-1 font-semibold text-2xl text-conduit-gray-1000'>
          {title}
        </h2>
        <p className='text-conduit-gray-700 font-light'>
          {description}
        </p>
        <div className='flex justify-between'>
          <span className='text-conduit-gray-500 text-date font-light'>Read more...</span>
          <TagList list={tagList}/>          
        </div>
      </Link>
    </div>
  </article>
}

export default Article; 