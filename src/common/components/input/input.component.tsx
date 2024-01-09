import { ComponentProps, forwardRef } from 'react'

type InputProps = {
   placeholder: ComponentProps<'input'>['placeholder'];
   name: ComponentProps<'input'>['name'];
   onChange: ComponentProps<'input'>['onChange'];
   onBlur: ComponentProps<'input'>['onBlur'];
   type?: ComponentProps<'input'>['name'];
}

const Input = forwardRef<HTMLInputElement, InputProps>(( { ...inputProps }, ref) => {
   return (
      <input
         ref={ref}
         {...inputProps}
         className='border border-black/15 rounded py-3 px-6 text-xl w-full'
      />
   )
})

export default Input