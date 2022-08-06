import { useAppDispatch } from './../toolkit/hooks';
import {useCallback, useEffect} from 'react'
import {
    tokenAction,
    userIdAction,
    userEmailAction,
    userNameAction,
    readyAction    
} from '../toolkit/slices/authSlice'
import { Email, Id, Name, Token } from './interfaces';

const storageName: string = 'userData'

export type Login = (jwtToken: Token, id: Id, email: Email, name: Name) => void

export const useAuth = () => {
    const dispatch = useAppDispatch()

    const login: Login = useCallback((jwtToken, id, email, name) => {
        dispatch(tokenAction(jwtToken))        
        dispatch(userIdAction(id))        
        dispatch(userEmailAction(email))        
        dispatch(userNameAction(name))        

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken,
            userId: id,
            userEmail: email,
            userName: name
        }))
    }, [dispatch])


    const logout = useCallback(() => {
        dispatch(tokenAction(null))        
        dispatch(userIdAction(null))        
        dispatch(userEmailAction(null))        
        dispatch(userNameAction(null))   

        localStorage.removeItem(storageName)
    }, [dispatch])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName)!)

        if (data && data.token) {
            login(data.token, data.userId, data.userEmail, data.userName)
        }
        dispatch(readyAction(true))

    }, [login, dispatch])

    return { login, logout }
}