import clsx from 'clsx'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {

   const navLinkClasses = ({isActive}: {isActive: Boolean}) => clsx('py-navItem', {
      'text-black/30': !isActive,
      'text-black/80': isActive
   });

  return (
      <header>
         <nav className='px-2 py-4'>
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
               <Link to='/' className='font-titillium text-2xl mr-8 text-conduit-green'>
                  conduit
               </Link>
               <ul className='pl-0 mb-0 list-none flex'>
                  <li>
                     <NavLink to='/' className={navLinkClasses}>Home</NavLink>
                  </li>
                  <li className='ml-4'>
                     <NavLink to='/sign_in' className={navLinkClasses}>Sign in</NavLink>
                  </li>
                  <li className='ml-4'>
                     <NavLink to='/sign_up' className={navLinkClasses}>Sign up</NavLink>
                  </li>
               </ul>
            </div>
         </nav>
      </header>
  )
}

export default Header;