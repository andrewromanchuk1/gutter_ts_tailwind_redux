import React from 'react'
import { useAuth } from '../../../auth/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../core/routes';
import { useFavoriteArticleMutation, useUnfavoriteArticleMutation } from '../../api/repository';
import Button from '../../../../common/components/button/button.component';

type FavoriteButtonProps = {
  count: number;
  extended?: boolean;
  slug: string;
  isFavorited: boolean;
};
const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  count, 
  extended = false, 
  slug,
  isFavorited = false,
}) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [ triggerFavoriteMutation, favoriteMutationState ] = useFavoriteArticleMutation();
  const [ triggerUnfavoriteMutation, unfavoriteMutationState ] = useUnfavoriteArticleMutation();


  const handleFavoriteClick = async () => {
    if(!isLoggedIn) {
      navigate(routes.signIn.path)
      return
    }
    if( isFavorited ) {
      await triggerUnfavoriteMutation({ slug })
    } else {
      await triggerFavoriteMutation({ slug })
    }
  }

  return (
  <>
    <Button 
      btnStyle='GREEN'
      variant={ isFavorited ? 'BASE' : 'OUTLINE' }
      onClick={ handleFavoriteClick }
      disabled={ favoriteMutationState.isLoading || unfavoriteMutationState.isLoading }
    >
      <i className="ion-heart"></i>
      <span className='ml-1 font-normal'>
        { extended && 'Favorite Article (' }
        {count}
        { extended && ')'}
      </span>
    </Button>
  </>
  )
}

export default FavoriteButton