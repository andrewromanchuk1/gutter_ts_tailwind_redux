import React from 'react'
import Header from './common/components/header/header.component'
import Banner from './common/components/banner/banner.component'

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return <>
    <Header />
    <Banner />
  </>
}

export default App 