import React from 'react'

type FollowButtonProps = {}

const FollowButton: React.FC<FollowButtonProps> = () => {
  return (
    <button className='text-center align-middle select-none border 
      py-1 px-2 text-sm rounded-btnSm cursor-pointer border-conduit-gray-700 text-conduit-gray-700 hover:bg-conduit-gray-400
      active:bg-conduit-gray-650'
   >
      <i className='ion-plus-round'/>&nbsp;Follow Walter White
    </button>
  )
}

export default FollowButton