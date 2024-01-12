import React, { useEffect } from 'react'
import Header from './common/components/header/header.component'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import { routes } from './core/routes'

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const isGlobalFeedPage = useMatch(routes.globalFeed);
  const navigate = useNavigate();

  useEffect(() => {
    if(isGlobalFeedPage) {
      navigate(routes.personalFeed.path);
    }
  }, [])

  return <div className='pb-8'>
    <Header />
    <Routes>
      {Object.values(routes).map(route => (
        <Route path={route.path} element={<route.Element />} key={`Route - ${route.path}`}/>
      ))}
    </Routes>
  </div>
}

export default App 