import React from 'react'
import Header from './common/components/header/header.component'
import { Route, Routes } from 'react-router-dom'
import { routes } from './core/routes'

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return <div className='pb-8'>
    <Header />
    <Routes>
      {Object.values(routes).map((e, id) => (
        <Route path={e.path} element={<e.Element />} key={id}/>
      ))}
    </Routes>
  </div>
}

export default App 