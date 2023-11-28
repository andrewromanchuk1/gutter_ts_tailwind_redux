import React from 'react'
import Container from '../../../../common/components/container/container.component'
import avatar from '../../../../assets/defaultAva.png'
import FollowButton from '../follow-button/follow-button.component'

type ProfileBannerProps = {
  username: string
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({ username }) => {
  return (
    <div className='bg-conduit-gray-100 pt-8 pb-4 mb-8'>
      <Container>
         <div>
            <img src={avatar} className='w-25 h-25 rounded-full mx-auto mb-4' alt='Username avatar'/>
            <h3 className='text-center font-bold text-2xl'>{username}</h3>
         </div>
         <div className='flex justify-end'>
            <FollowButton />
         </div>
      </Container>
    </div>
  )
}

export default ProfileBanner