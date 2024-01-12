import clsx from 'clsx';
import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'

interface FeedToggleItem {
  text: string,
  link: string,
}
interface FeedToggleProps {
  defaultText?: string;
  defaultLink?: string;
  items?: FeedToggleItem[];
}

const FeedToggle: React.FC<FeedToggleProps> = ({
  defaultText = 'Global Feed',
  defaultLink = '/',
  items = [],
}) => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get('tag');
  const globalFeedClasses = ({isActive} : {isActive: boolean}) => {
    return clsx(
      'bg-white border-conduit-green py-2 px-4 hover:no-underline cursor-default', 
      {
        'text-black/30 hover:text-black/60 cursor-pointer': tag || !isActive,
        'border-b-2': !tag && isActive
      }
    )
  } 

  return (
    <div className='h-8'>
      <ul className='flex'>
        <li>
          <NavLink to={defaultLink} className={globalFeedClasses} end>
            {defaultText}
          </NavLink>
          { items.map((item) => ( 
            <NavLink  to={item.link} className={globalFeedClasses} key={item.text}>
              {item.text}
            </NavLink>
          ))}
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