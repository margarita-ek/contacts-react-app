import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthPage from './components/AuthPage/AuthPage'
import HomePage from './components/HomePage/HomePage'

export const useAppRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path='/home' element={<HomePage />} />
                <Route path='*' element={<HomePage />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<AuthPage />} />
            <Route path='*' element={<AuthPage />} />
        </Routes>
    )
}