import { useState, useCallback } from 'react'

interface IDataError {
    message: string
}

interface IBody {
    email: string
    password: string
    username?: string
}

interface IHeaders {
    [key: string]: string
}

type TBody = IBody | null | string
type THeaders = IHeaders | undefined
type TDataError = IDataError | unknown | null

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<TDataError>(null)

    const request = useCallback(async (url: string, method = 'GET', body:TBody = null , headers: THeaders = {}) => {
        setLoading(true)
        try {

            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'The request failed')                    
            }

            setLoading(false)

            return data
        } catch (e: unknown) {
            setLoading(false)
            setError(e)          
            throw e
        }
    }, [])

    const clearError = () => { setError(null) }

    return { loading, request, error, clearError }
}

