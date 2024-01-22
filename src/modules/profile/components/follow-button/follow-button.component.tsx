import React, { ComponentProps } from 'react'
import Button, { ButtonStyleEnum } from '../../../../common/components/button/button.component';
import { useFollowUserMutation, useUnfollowUserMutation } from '../../api/repository';
import { toast } from 'react-toastify';

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

  const [ triggerFollow ] = useFollowUserMutation();
  const [ triggerUnfollow ] = useUnfollowUserMutation();

  const toggleFollow = () => {
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