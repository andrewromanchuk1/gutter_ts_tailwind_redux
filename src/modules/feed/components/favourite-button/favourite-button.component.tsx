import React from 'react'

type FavoriteButtonProps = {
  count: number
};
const FavoriteButton: React.FC<FavoriteButtonProps> = ({count}) => {
  return (
   <button className='text-conduit-green border-conduit-green 
      text-center align-middle select-none border 
      py-1 px-2 text-sm rounded-btnSm cursor-pointer
      hover:text-white hover:bg-conduit-green active:bg-conduit-darkGreen'>
      <i className="ion-heart"></i>
      <span className='ml-1 font-normal'>{count}</span>
   </button>
  )
}

export default FavoriteButton