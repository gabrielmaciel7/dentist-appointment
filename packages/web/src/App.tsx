import React from 'react'

// import api from '@monorepo/axios-config'
import GlobalStyle from './styles/global'
import SignUp from './pages/SignUp'

const App: React.FC = () => {
  return (
    <>
      <SignUp />
      <GlobalStyle />
    </>
  )
}

export default App
