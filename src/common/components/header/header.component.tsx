import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from '../container/container.component'
import { useAuth } from '../../../modules/auth/hooks/use-auth'
import Burger from '../burger/burger.component'
import { loggedInArr, unloggedArr } from '../burger/nav-arrays'


type HeaderProps = {}

const Header: React.FC<HeaderProps> = () => {

   const [showMenu, setShowmenu] = useState<boolean>(true);

   const { isLoggedIn, user } = useAuth();

   const navLinkClasses = ({isActive}: {isActive: Boolean}) => clsx('py-navItem hover:text-black/60 hover:no-underline', {
      'text-black/30': !isActive,
      'text-black/80': isActive,
   });

   useEffect(() => {
      window.innerWidth <= 768 ? 
      setShowmenu(false) :
      setShowmenu(true) 
   }, [])

   const handleResize = (event: any) => {
      event.target.innerWidth <= 768 ? 
         setShowmenu(false) :
         setShowmenu(true)
   }

   window.addEventListener('resize', handleResize)
  
  return (
      <header>
         <nav className='px-2 py-3'>
            <Container>
               <div className='flex justify-between items-center'>
                  <Link to='/' className='font-titillium text-2xl mr-8 text-gutter-green hover:no-underline hover:text-gutter-green'>
                     gutter
                  </Link>
                  { showMenu ? (
                     <ul className='pl-0 mb-0 list-none flex'>
                        <li>
                           <NavLink to='/' className={navLinkClasses}>Home</NavLink>
                        </li>
                        { isLoggedIn ? (
                           <>
                              {loggedInArr.map((el, id) => (
                                 <li className='ml-4' key={id}>
                                    <NavLink
                                       to={el.to}
                                       className={navLinkClasses}
                                    >
                                       <i className={el.i} />
                                       {el.text}
                                    </NavLink>
                                 </li>
                              ))}
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
                              {unloggedArr.map((el, id) => (
                                 <li className='ml-4' key={id}>
                                    <NavLink 
                                       to={el.to}
                                       className={navLinkClasses}
                                    >
                                       {el.text}
                                    </NavLink>
                                 </li>
                              ))}
                           </> 
                        )}
                     </ul>
                  ) : (
                     <Burger />
                  )}
               </div>
            </Container>
         </nav>
      </header>
  )
}

export default Header;