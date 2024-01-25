import { FC } from 'react'
import Container from '../container/container.component'

type BannerProps = {}

const Banner: FC<BannerProps> = () => {
   return (
      <div className='bg-gutter-green shadow-banner text-white p-8 mb-8'>
         <Container>
            <h1 className='font-titillium drop-shadow-logo text-center text-logo pb-2'>gutter</h1>
            <p className='text-center text-2xl '>
               A place to share your knowledge.
            </p>
         </Container>
      </div>
   )
}

export default Banner