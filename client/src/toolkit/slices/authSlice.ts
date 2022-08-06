import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Email, Id, Name, Token } from "../../hooks/interfaces"
interface IInintialState { 
    token: null | string
    userId: null | string
    userEmail: null | string
    userName: null | string
    isAuthenticated: boolean
    ready: boolean    
}

const initialState = {
    token: null,
    userId: null,
    userEmail: null,
    userName: null,
    isAuthenticated: false,
    ready: false
} as IInintialState

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        tokenAction: (state, action: PayloadAction<Token>) => { 
            state.token = action.payload
        },
        userIdAction: (state, action: PayloadAction<Id>) => { 
            state.userId = action.payload
        },
        userEmailAction: (state, action: PayloadAction<Email>) => { 
            state.userEmail = action.payload
        },
        userNameAction: (state, action: PayloadAction<Name>) => { 
            state.userName = action.payload
        },
        isAuthenticatedAction: (state, action: PayloadAction<boolean>) => { 
            state.isAuthenticated = action.payload
        },        
        readyAction: (state, action: PayloadAction<boolean>) => { 
            state.ready = action.payload
        },        
    }
})

export const {
    tokenAction,
    userIdAction,
    userEmailAction,
    userNameAction,
    isAuthenticatedAction,
    readyAction
} = authSlice.actions

export default authSlice.reducer