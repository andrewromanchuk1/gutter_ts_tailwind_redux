import clsx from 'clsx'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from '../container/container.component'
import { useAuth } from '../../../modules/auth/hooks/use-auth'

type HeaderProps = {}

const Header: React.FC<HeaderProps> = () => {

   const { isLoggedIn, user } = useAuth();

   const navLinkClasses = ({isActive}: {isActive: Boolean}) => clsx('py-navItem hover:text-black/60 hover:no-underline', {
      'text-black/30': !isActive,
      'text-black/80': isActive,
   });

  return (
      <header>
         <nav className='px-2 py-3'>
            <Container>
               <div className='flex justify-between items-center'>
                  <Link to='/' className='font-titillium text-2xl mr-8 text-conduit-green hover:no-underline hover:text-conduit-green'>
                     conduit
                  </Link>
                  <ul className='pl-0 mb-0 list-none flex'>
                     <li>
                        <NavLink to='/' className={navLinkClasses}>Home</NavLink>
                     </li>
                     { isLoggedIn ? (
                        <>
                           <li className='ml-4'>
                             <NavLink 
                                 to='/editor' 
                                 className='text-black/30 py-navItem hover:text-black/60 hover:no-underline' 
                              >
                                 <i className='ion-compose mr-1' />
                                 New article
                              </NavLink>
                           </li>
                           <li className='ml-4'>
                             <NavLink 
                                 to='/settings' 
                                 className='text-black/30 py-navItem hover:text-black/60 hover:no-underline' 
                              >
                                 <i className='ion-gear-a mr-1' />
                                 Settings
                              </NavLink>
                           </li>
                           <li className='ml-4'>
                             <NavLink 
                                 to={`/@/${user?.username}`}
                                 className={navLinkClasses} 
                              >
                                 <div className='flex items-center'>
                                    <img 
                                       alt={`${user?.username} avatar`} 
                                       src={user?.image} 
                                       className='w-5 h-5 rounded-full mr-1 inline'
                                    /> 
                                    {user?.username}
                                 </div>
                              </NavLink>
                           </li>
                        </>
                     ) : (
                        <>
                           <li className='ml-4'>
                              <NavLink to='/login' className={navLinkClasses}>Sign in</NavLink>
                           </li>
                           <li className='ml-4'>
                              <NavLink to='/register' className={navLinkClasses}>Sign up</NavLink>
                           </li>
                        </> 
                     )}
                  </ul>
               </div>
            </Container>
         </nav>
      </header>
  )
}

export default Header;