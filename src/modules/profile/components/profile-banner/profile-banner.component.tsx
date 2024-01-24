import React from 'react'
import Container from '../../../../common/components/container/container.component'
import FollowButton from '../follow-button/follow-button.component'
import { Profile } from '../../api/dto/get-profile.in'
import { useAuth } from '../../../auth/hooks/use-auth'
import Button from '../../../../common/components/button/button.component'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../../core/routes'

type ProfileBannerProps = {
  profile: Profile
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({ profile }) => {

  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate(routes.settings.path)
  }

  const handleSignOut = () => {
    logOut()
    navigate('/')
  }

  return (
    <div className='bg-conduit-gray-100 pt-8 pb-4 mb-8'>
      <Container>
         <div>
            <img src={profile.image} className='w-25 h-25 rounded-full mx-auto mb-4' alt='Username avatar'/>
            <h3 className='text-center font-bold text-2xl'>{profile.username}</h3>
         </div>
         <div className='flex justify-end mt-10'>
          { user?.username !== profile.username 
            ? <FollowButton username={profile!.username} isFollowed={profile.following} />
            : (
                <div className='flex gap-5'>
                <Button onClick={goToSettings}>
                  <i className='ion-gear-a mr-1' />Edit profile settings
                </Button>
                <Button onClick={handleSignOut} btnStyle='DANGER'>
                  <i className='ion-gear-a mr-1' />Sign Out
                </Button>
                </div>
              )
          }
         </div>
      </Container>
    </div>
  )
}

export default ProfileBanner