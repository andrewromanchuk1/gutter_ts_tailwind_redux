import React from 'react'
import Header from './common/components/header/header.component'
import { Route, Routes } from 'react-router-dom'
import GlobalFeedPage from './modules/feed/pages/global-feed-page'
import ProfilePage from './modules/profile/pages/profile.page'

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return <div className='pb-8'>
    <Header />
    <Routes>
      <Route index element={<GlobalFeedPage />}/>
      <Route path='/:@profile' element={<ProfilePage />}/>
    </Routes>
  </div>
}

export default App 