import clsx from 'clsx';
import React from 'react'

enum ButtonStyleEnum {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

interface FollowButtonProps  {
  username: string;
  btnStyle?: keyof typeof ButtonStyleEnum
}

const FollowButton: React.FC<FollowButtonProps> = ({ 
  username,
  btnStyle = ButtonStyleEnum.DARK,
}) => {
  const btnClasses = clsx(
    'text-center align-middle cursor-pointer select-none border py-1 px-2 text-sm rounded-btnSm active:bg-conduit-gray-650',
    {
      'border-conduit-gray-700 text-conduit-gray-700 hover:bg-conduit-gray-400  active:text-conduit-gray-700 ':
      btnStyle === ButtonStyleEnum.DARK,
      'border-conduit-gray-400 text-conduit-gray-400 hover:bg-conduit-gray-400 hover:text-white':
      btnStyle === ButtonStyleEnum.LIGHT,
    }
  )

  return (
    <button className={btnClasses}>
      <i className='ion-plus-round'/>&nbsp;Follow {username}
    </button>
  )
}

export default FollowButton