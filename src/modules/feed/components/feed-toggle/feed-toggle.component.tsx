import clsx from 'clsx';
import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'

type FeedToggleProps = {}

const FeedToggle: React.FC<FeedToggleProps> = () => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get('tag');
  const globalFeedClasses = clsx(
    'bg-white border-conduit-green py-0.45 px-4 hover:no-underline hover:text-conduit-green cursor-default', 
    {
      'text-black/30 hover:text-black/70 cursor-pointer': tag,
      'border-b-2': !tag
    }
  )

  return (
    <div className='h-8'>
      <ul className='flex'>
         <li>
            <NavLink to='/' className={globalFeedClasses}>
              Global feed
            </NavLink>
         </li>
         { tag && (
          <span className='bg-white border-b-2 border-conduit-green hover:no-underline pb-0.37 px-4 text-conduit-green'>
            # {tag}
          </span>
         )}
      </ul>
    </div>
  )
}

export default FeedToggle