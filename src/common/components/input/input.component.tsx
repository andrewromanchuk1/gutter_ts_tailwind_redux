import clsx from 'clsx';
import { ComponentProps, forwardRef } from 'react'

enum InputSize {
   SM = 'SM',
   BASE = 'BASE',
}

type InputProps = {
   placeholder: ComponentProps<'input'>['placeholder'];
   name: ComponentProps<'input'>['name'];
   onChange: ComponentProps<'input'>['onChange'];
   onBlur: ComponentProps<'input'>['onBlur'];
   type?: ComponentProps<'input'>['name'];
   size?: keyof typeof InputSize;
}

const Input = forwardRef<HTMLInputElement, InputProps>(( {size = InputSize.BASE, ...inputProps }, ref) => {
const inputClasses = clsx(
   'border border-black/15 rounded w-full', {
      'py-3 px-6 text-xl': size === InputSize.BASE,
      'py-1 px-2 text-base': size === InputSize.SM,
   }
   )

   return (
      <input
         ref={ref}
         {...inputProps}
         className={inputClasses}
      />
   )
})

export default Input