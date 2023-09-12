import React from 'react'
import Header from './common/components/header/header.component'
import Banner from './common/components/banner/banner.component'
import Article from './modules/feed/components/article/article.component'

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return <>
    <Header />
    <Banner />
    <Article />
  </>
}

export default App 