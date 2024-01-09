import { FC, PropsWithChildren } from 'react'

type ContainerProps = {}

const Container: FC<PropsWithChildren<ContainerProps>> = ({ children }) => {
  return (
   <div className='container mx-auto px-20'>
      { children }
   </div>
  )
}
            
export default Container;