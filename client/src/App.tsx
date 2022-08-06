import React, { useEffect } from 'react'
import Header from './components/Header/Header'

import { useAppRoutes } from './routes'
import { useAppDispatch, useAppSelector } from './toolkit/hooks'
import { isAuthenticatedAction } from './toolkit/slices/authSlice'

function App() {
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.authSlice.token)

  const isAuthenticated = !!token
  const routes = useAppRoutes(isAuthenticated)  

  useEffect(() => { 
    dispatch(isAuthenticatedAction(isAuthenticated))
  }, [dispatch, isAuthenticated])  

  return (
    <main>
      { isAuthenticated && <div>
          <Header />
      </div> }
      <div className='wrapper'>
          { routes }
      </div>
    </main>
  )
}

export default App
