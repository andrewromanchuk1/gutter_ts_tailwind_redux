import React, { ComponentProps } from 'react'
import Button, { ButtonStyleEnum } from '../../../../common/components/button/button.component';

interface FollowButtonProps  {
  username: string;
  btnStyle?: ComponentProps<typeof Button>['btnStyle']
}

const FollowButton: React.FC<FollowButtonProps> = ({ 
  username,
  btnStyle = ButtonStyleEnum.DARK,
}) => {

  return (
    <Button btnStyle={btnStyle}>
      <i className='ion-plus-round'/>&nbsp;Follow {username}
    </Button>
  )
}

export default FollowButton