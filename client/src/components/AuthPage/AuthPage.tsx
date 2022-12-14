import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useAuth } from '../../hooks/auth.hook'
import { useHttp } from '../../hooks/http.hook'
import { Loader } from '../Loader/Loader'

type TMessage = null | string 
type TStatus = string | number 

interface IData {
    token?: string
    userEmail: string
    userId: string
    userName?: string
    status?: number
}

const AuthPage: React.FC = () => { 
    const auth = useAuth()

    const { loading, error, request, clearError } = useHttp()

    const messRef = useRef<HTMLDivElement | null>(null)
    
    const [authNav, setAuthNav] = useState(false)
    const [message, setMessage] = useState<TMessage>('')
    const [status, setStatus] = useState<TStatus>()
    const [data, setData] = useState<IData>()
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    useEffect(() => { 
        if (error instanceof Error) { 
            setMessage(error.message)
        }
    }, [error])

    useEffect(() => {
        if (data !== undefined) { 
            setStatus(data.status)
        }
    }, [data])

    useEffect(() => { 
        const clearMessage = () => { 
            if (message) { 
                setMessage('')
                clearError()
            }
            if (messRef.current !== null && messRef.current.classList.contains('success')) {
                messRef.current.classList.remove('success')
            }
            setStatus('')
            return
        }        
        setTimeout(clearMessage, 3000)
    }, [message, clearError])    

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => { 
        setForm({ ...form, [event.target.name] : event.target.value })
    }    

    const registerHandler = async () => { 
        try {
            const data = await request('/api/auth/registration', 'POST', { ...form })
            if (data.hasOwnProperty('status')) { 
                setData(data)
            }     
            setMessage(data.message)
        } catch (error) { }
    }

    const loginHandler = async () => { 
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId, data.userEmail, data.userName)
            setData(data)
            setMessage(data.message)
        } catch (error) { }
    }

    return (
        <section className='container-auth'> 
            <div className='auth'>
                {loading ? <Loader/> : null}
                <div className='auth__content'>
                    <div className='auth__nav'>
                        <span className={ `auth__nav-in ${authNav ? '': ' navActive'}`} onClick={() => setAuthNav(false)} title='????????'>????????</span>
                        <span className={`auth__nav-up ${authNav ? ' navActive': ''}`} onClick={() => setAuthNav(true)} title='??????????????????????'>??????????????????????</span>
                    </div>
                    <div className='auth__card'>
                        <span className={`auth__message${status ? ' success' : ''}`} ref={messRef}>{message}</span>
                        {authNav ? <>
                            <div className='auth__name'>
                                <input
                                    className='auth__name-input'
                                    title='??????'
                                    disabled={loading}
                                    placeholder='Name'
                                    id='username'
                                    type='text'
                                    name='username'
                                    value={form.username}
                                    onChange={changeHandler}                                 
                                />
                                <label htmlFor='username'>??????</label>
                            </div>

                            <div className='auth__email'>
                                <input
                                    className='auth__email-input'
                                    title='??????????'
                                    disabled={loading}
                                    placeholder='E-mail'
                                    id='email'
                                    type='text'
                                    name='email'
                                    value={form.email}
                                    onChange={changeHandler}                                 
                                />
                                <label htmlFor='email'>??????????</label>
                            </div>

                            <div className='auth__password'>
                                <input
                                    className='auth__password-input'
                                    title='????????????'
                                    disabled={loading}
                                    placeholder='Password'
                                    id='password'
                                    type='password'
                                    name='password'
                                    value={form.password}
                                    onChange={changeHandler}                                
                                />
                                <label htmlFor='password'>????????????</label>
                            </div>
                            <button
                                className='auth__reg'
                                title='????????????????????????????????????'
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                ????????????????????????????????????
                            </button>
                        </> : <>
                            <div className='auth__email'>
                                <input
                                    className='auth__email-input'
                                    title='??????????'
                                    disabled={loading}
                                    placeholder='E-mail'
                                    id='email'
                                    type='text'
                                    name='email'
                                    value={form.email}
                                    onChange={changeHandler}                                         
                                />
                                <label htmlFor='email'>??????????</label>
                            </div>

                            <div className='auth__password'>
                                <input
                                    className='auth__password-input'
                                    title='????????????'
                                    disabled={loading}
                                    placeholder='Password'
                                    id='password'
                                    type='password'
                                    name='password'
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor='password'>????????????</label>
                            </div>
                            <button
                                className='auth__enter'
                                title='??????????'
                                style={{ marginRight: 10 }}
                                disabled={loading}
                                onClick={loginHandler}
                            >
                                ??????????
                            </button>
                        </>}
                    </div>             
                </div>
            </div>
        </section>
    )
}

export default AuthPage