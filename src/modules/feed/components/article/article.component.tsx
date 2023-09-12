import {FC} from 'react'
import { Link } from 'react-router-dom'
import defaultAva from '../../../../assets/defaultAva.png'
import FavoriteButton from '../../../../common/components/favourite-button/favourite-button.component';
import TagList from '../../../../common/components/tag-list/tag-list.component';

type ArticleProps = {}

const Article: FC<ArticleProps> = () => {
  return <article>
    <div className='border-t border-black-10 py-6'>
      <div className='mb-4 font-light flex'>
        <Link to='/@roma1'>
          <img 
           className='inline-block h-8 w-8 rounded-full'
           src={defaultAva} 
           alt='avatar'/>
        </Link>
        <div className='mr-6 ml-0.3 inline-flex leading-4 flex-col'>
          <Link to='/@roma1' className='font-medium'>
            Andrii Romanchuk
          </Link>
          <span className='text-conduit-gray text-date'>December 9, 2022</span>
        </div> 
        <FavoriteButton />
      </div>
      <Link to='/article/qwert' className='hover:no-underline'>
        <h2 className='mb-1 font-semibold text-2xl text-conduit-darkestGray'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi repellat, ipsa corporis perspiciatis quibusdam nisi praesentium fugit voluptatibus quia quam nobis veniam totam fugiat sit dolorem. Blanditiis placeat neque illo.
        </h2>
        <p className='text-conduit-darkenGray font-light'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi repellat, ipsa corporis perspicia
        </p>
        <div className='flex justify-between'>
          <span className='text-conduit-gray text-date font-light'>Read more...</span>
          <TagList />          
        </div>
      </Link>
    </div>
  </article>
}

export default Article