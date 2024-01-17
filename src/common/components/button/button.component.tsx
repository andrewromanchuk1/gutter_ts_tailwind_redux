import clsx from 'clsx';
import React, { ComponentProps, PropsWithChildren } from 'react'

export enum ButtonStyleEnum {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  GREEN = 'GREEN',
  DANGER = 'DANGER',
}

enum ButtonSizeEnum {
   BASE = 'BASE',
   LG = 'LG',
}

enum ButtonVariantEnum {
   BASE = 'BASE',
   OUTLINE = 'OUTLINE'
}

interface ButtonProps  {
  btnStyle?: keyof typeof ButtonStyleEnum,
  size?: keyof typeof ButtonSizeEnum,
  variant?: keyof typeof ButtonVariantEnum,
  type?: ComponentProps<'button'>['type'],
  disabled?: ComponentProps<'button'>['disabled'],
  onClick?: ComponentProps<'button'>['onClick'],
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ 
  btnStyle = ButtonStyleEnum.DARK,
  size = ButtonSizeEnum.BASE,
  variant = ButtonVariantEnum.BASE,
  children,
  ...buttonProps

}) => {
   const btnClasses = clsx(
      'text-center align-middle cursor-pointer select-none border disabled:opacity-70',
      {
         'border-conduit-gray-700 text-conduit-gray-700 hover:text-white hover:bg-conduit-gray-500  active:text-white active:bg-conduit-gray-650':
            btnStyle === ButtonStyleEnum.DARK,
         'border-conduit-gray-400 text-conduit-gray-400 hover:bg-conduit-gray-400 hover:text-white active:bg-conduit-gray-650':
            btnStyle === ButtonStyleEnum.LIGHT,
         'border-conduit-green active:bg-conduit-darkestGreen active:border-conduit-darkestGreen' :
            btnStyle === ButtonStyleEnum.GREEN,
         'bg-conduit-green text-white hover:text-white hover:bg-conduit-darkGreen hover:border-conduit-darkGreen' :
            btnStyle === ButtonStyleEnum.GREEN && variant === ButtonVariantEnum.BASE,
         'bg-white text-conduit-green hover:text-white hover:bg-conduit-green active:bg-conduit-darkestGreen active:border-conduit-darkestGreen disabled:bg-conduit-darkGreen disabled:text-white' :
            btnStyle === ButtonStyleEnum.GREEN && variant === ButtonVariantEnum.OUTLINE,
         'border-conduit-red text-conduit-red hover:bg-conduit-red hover:text-white focus:bg-conduit-red' : 
            btnStyle === ButtonStyleEnum.DANGER,
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