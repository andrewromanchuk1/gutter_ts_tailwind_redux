import { FC, useState } from 'react'
import { Cross as Hamburger} from 'hamburger-react'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../modules/auth/hooks/use-auth';
import clsx from 'clsx';
import { loggedInArr, unloggedArr } from './nav-arrays';

interface BurgerProps {}

const Burger: FC<BurgerProps> = ({

}) => {

   const [isOpen, setOpen] = useState<boolean>(false);

   const { isLoggedIn, user } = useAuth();

   const navLinkClasses = ({isActive}: {isActive: Boolean}) => clsx(
      'py-navItem hover:text-black/60 hover:no-underline text-2xl px-10', {
      'text-black/30': !isActive,
      'text-black/80': isActive,
   });

   const handleClickOnBurger = () => {
      setOpen(!isOpen);
      document.querySelector('body')!.style.overflow === 'hidden' ?
      document.querySelector('body')!.style.overflow = 'visible' : 
      document.querySelector('body')!.style.overflow = 'hidden'
   }   
   
   return (
      <div>
         <Hamburger
            rounded
            size={25}
            onToggle={handleClickOnBurger}
            toggled={isOpen}
         />
         { isOpen && (
            <div 
               className='fixed bg-conduit-gray-200 left-0 right-0 top-[4.5rem] h-full text-center flex justify-center items-start transition-all z-10'
            >
               <ul className='pl-0 mb-0 list-none flex flex-col gap-10 pt-20'>
                  <li>
                     <NavLink 
                        to='/' 
                        className={navLinkClasses}
                        onClick={handleClickOnBurger}
                     >Home</NavLink>
                  </li>
                  { isLoggedIn ? (
                     <>
                        { loggedInArr.map((el, id) => (
                              <li key={id}>
                                 <NavLink 
                                    to={el.to}
                                    className={navLinkClasses}
                                    onClick={handleClickOnBurger}
                                 >
                                    <i className={el.i} />
                                    {el.text}
                                 </NavLink>
                              </li>
                           )
                        )}
                        <li>
                           <NavLink 
                              to={`/@/${user?.username}`}
                              className={navLinkClasses}
                              onClick={handleClickOnBurger}
                           >
                              <img 
                                 alt={`${user?.username} avatar`}
                                 src={user?.image} 
                                 className='w-5 h-5 rounded-full mr-1 inline'
                              />
                              {user?.username}
                           </NavLink>
                        </li>
                     </>
                  ) : (
                     <>
                        { unloggedArr.map(el => (
                           <li key={`${el.text}text`}>
                              <NavLink
                                 to={el.to}
                                 className={navLinkClasses}
                                 onClick={handleClickOnBurger}
                              >
                                 {el.text}
                              </NavLink>
                           </li>
                        ))}
                     </>
                  )}
               </ul>
            </div>
         )}
      </div>
   )
}

export default Burger