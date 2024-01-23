import React, { ComponentProps } from 'react'
import Button, { ButtonStyleEnum } from '../../../../common/components/button/button.component';
import { useFollowUserMutation, useUnfollowUserMutation } from '../../api/repository';
import { toast } from 'react-toastify';
import { useAuth } from '../../../auth/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../core/routes';

interface FollowButtonProps  {
  username: string;
  isFollowed: boolean;
  btnStyle?: ComponentProps<typeof Button>['btnStyle']
}

const FollowButton: React.FC<FollowButtonProps> = ({ 
  username,
  isFollowed,
  btnStyle = ButtonStyleEnum.DARK,
}) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate()

  const [ triggerFollow ] = useFollowUserMutation();
  const [ triggerUnfollow ] = useUnfollowUserMutation();

  const toggleFollow = () => {
    if(!isLoggedIn) {
      navigate(routes.signUp.path);
      return;
    }

    try {
      if(!isFollowed) {
        triggerFollow({username: encodeURIComponent(username)}).unwrap();
      } else {
        triggerUnfollow({username: encodeURIComponent(username)}).unwrap();
      }
   } catch (error) {
      toast.error('Something wen\'t wrong')
   }
  }

  return (
    <Button btnStyle={btnStyle} onClick={toggleFollow}>
      <i className='ion-plus-round'/>&nbsp;{ isFollowed ? 'Unfollow' : 'Follow'} {username}
    </Button>
  )
}

export default FollowButton;