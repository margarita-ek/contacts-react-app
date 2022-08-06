import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type TContactItem = {
    id: number
    name: string
    number: string
} 
interface IInintialState { 
    contacts: TContactItem[]
}

const initialState = {
    contacts: []
} as IInintialState

const contactsSlice = createSlice({
    name: "contactsSlice",
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<TContactItem>) => { 
            state.contacts = [...state.contacts, action.payload] 
        },
        editContact: (state, action: PayloadAction<TContactItem>) => { 
            const filterItemEdit = state.contacts.map((item) => { 
                if (item.id === action.payload.id) { 
                    item = action.payload
                }
                return item
            })
            state.contacts = filterItemEdit
        },
        removeContact: (state, action: PayloadAction<number>) => { 
            state.contacts = state.contacts.filter(item => item.id !== action.payload)
        }
    }
})

export const { addContact, removeContact, editContact } = contactsSlice.actions

export default contactsSlice.reducer