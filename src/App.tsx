import React, { useEffect } from 'react'
import Header from './common/components/header/header.component'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import { routes } from './core/routes'
import PrivateRoute from './modules/auth/components/private-route.component'
import { useAuth } from './modules/auth/hooks/use-auth'

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const isGlobalFeedPage = useMatch(routes.globalFeed);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if(isGlobalFeedPage && isLoggedIn) {
      navigate(routes.personalFeed.path);
    }
  }, [])

  return <div className='pb-8'>
    <Header />
    <Routes>
      {Object.values(routes).map(route => {
        if(route.private) {
          return (
            <Route 
              path={route.path} 
              element={
                <PrivateRoute>
                  <route.Element/>
                </PrivateRoute>
              } 
              key={`Route - ${route.path}`}
            />
          )
        }
          return (
            <Route 
              path={route.path}
              element={<route.Element />} 
              key={`Route - ${route.path}`}
            />
          )
      })}
    </Routes>
  </div>
}

export default App 