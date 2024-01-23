import {  FC, PropsWithChildren } from 'react'
import { useAuth } from '../hooks/use-auth'
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {}

const PrivateRoute: FC<PropsWithChildren<PrivateRouteProps>> = ({ children }) => {
   const { isLoggedIn } = useAuth();

   if(!isLoggedIn) {
      return <Navigate to='/login' replace />
   }
   return <>{children}</>
}

export default PrivateRoute;