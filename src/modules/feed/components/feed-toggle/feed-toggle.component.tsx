import React from 'react'
import { NavLink } from 'react-router-dom'

type FeedToggleProps = {}

const FeedToggle: React.FC<FeedToggleProps> = () => {
  return (
    <div className='h-8'>
      <ul className='flex'>
         <li>
            <NavLink to='/' className='bg-white border-b-2 border-conduit-green hover:no-underline py-2 px-4'>Global feed</NavLink>
         </li>
      </ul>
    </div>
  )
}

export default FeedToggle