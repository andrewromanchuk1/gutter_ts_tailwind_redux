import React from 'react'
import Header from './common/components/header/header.component'
import Banner from './common/components/banner/banner.component'
import Feed from './modules/feed/components/feed/feed.component'

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return <>
    <Header />
    <Banner />
    <Feed />
  </>
}

export default App 