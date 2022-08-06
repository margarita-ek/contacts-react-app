import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth.hook'
import { useAppSelector } from '../../toolkit/hooks'


const Header: React.FC = () => {
    const auth = useAuth()
    const name = useAppSelector(state => state.authSlice.userName)

    const navigate = useNavigate()
    const authPage = () => { navigate('/') }  
    
    const logoutHandler = (event: any) => { 
        event.preventDefault()
        auth.logout()
        authPage()
    }

    return (
        <header className='header'>
            <div className='header__container'>    
                <span className='header__link-user' title='пользователь'>{name}</span>                               
                <span className='header__link-logout' onClick={logoutHandler} title='выход' />                    
            </div>
        </header>
    )
}

export default Header