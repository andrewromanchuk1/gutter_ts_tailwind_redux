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
         'border-gutter-gray-700 text-gutter-gray-700 hover:text-white hover:bg-gutter-gray-500  active:text-white active:bg-gutter-gray-650':
            btnStyle === ButtonStyleEnum.DARK,
         'border-gutter-gray-400 text-gutter-gray-400 hover:bg-gutter-gray-400 hover:text-white active:bg-gutter-gray-650':
            btnStyle === ButtonStyleEnum.LIGHT,
         'border-gutter-green active:bg-gutter-darkestGreen active:border-gutter-darkestGreen' :
            btnStyle === ButtonStyleEnum.GREEN,
         'bg-gutter-green text-white hover:text-white hover:bg-gutter-darkGreen hover:border-gutter-darkGreen' :
            btnStyle === ButtonStyleEnum.GREEN && variant === ButtonVariantEnum.BASE,
         'bg-white text-gutter-green hover:text-white hover:bg-gutter-green active:bg-gutter-darkestGreen active:border-gutter-darkestGreen disabled:bg-gutter-darkGreen disabled:text-white' :
            btnStyle === ButtonStyleEnum.GREEN && variant === ButtonVariantEnum.OUTLINE,
         'border-gutter-red text-gutter-red hover:bg-gutter-red hover:text-white focus:bg-gutter-red disabled:bg-gutter-red disabled:text-white disabled:cursor-not-allowed' : 
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