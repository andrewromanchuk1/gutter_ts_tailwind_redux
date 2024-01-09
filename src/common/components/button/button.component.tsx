import clsx from 'clsx';
import React, { ComponentProps, PropsWithChildren } from 'react'

export enum ButtonStyleEnum {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  GREEN = 'GREEN',
}

enum ButtonSizeEnum {
   BASE = 'BASE',
   LG = 'LG',
}

interface ButtonProps  {
  btnStyle?: keyof typeof ButtonStyleEnum,
  size?: keyof typeof ButtonSizeEnum,
  type?: ComponentProps<'button'>['type'],
  disabled?: ComponentProps<'button'>['disabled'],
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ 
  btnStyle = ButtonStyleEnum.DARK,
  size = ButtonSizeEnum.BASE,
  children,
  disabled,
  ...buttonProps

}) => {
   const btnClasses = clsx(
      'text-center align-middle cursor-pointer select-none border active:bg-conduit-gray-650',
      {
         'border-conduit-gray-700 text-conduit-gray-700 hover:bg-conduit-gray-400  active:text-conduit-gray-700 ':
         btnStyle === ButtonStyleEnum.DARK,
         'border-conduit-gray-400 text-conduit-gray-400 hover:bg-conduit-gray-400 hover:text-white':
         btnStyle === ButtonStyleEnum.LIGHT,
         'text-white bg-conduit-green border-conduit-green hover:bg-conduit-darkGreen hover:border-conduit-darkGreen active:bg-conduit-darkestGreen active:border-conduit-darkestGreen' :
         btnStyle === ButtonStyleEnum.GREEN,
         'py-1 px-2 text-sm rounded-btnSm': size === ButtonSizeEnum.BASE,
         'py-3 px-7 text-xl rounded-btnSm': size === ButtonSizeEnum.LG,
      }
   ) 
   return (
      <button className={btnClasses} {...buttonProps} >
         {children}
      </button>
   )
}

export default Button