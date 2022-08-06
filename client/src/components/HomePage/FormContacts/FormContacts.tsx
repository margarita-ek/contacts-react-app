import React, { KeyboardEvent, ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../toolkit/hooks"
import { addContact, editContact } from "../../../toolkit/slices/contactsSlice"

interface FormContactsProps { 
    setFilteredContacts: Function
    setSearchToggle: Function
    postIdItemForEdit: number
    toggleEditItem: boolean
    setToggleEditItem: Function
}

const FormContacts: React.FC<FormContactsProps> = (props) => {
    const {
        setFilteredContacts,
        setSearchToggle,
        postIdItemForEdit,
        toggleEditItem,
        setToggleEditItem
    } = props

    const dispatch = useAppDispatch()
    const contacts = useAppSelector(state => state.contactsSlice.contacts)

    const [form, setForm] = useState({
        id: Date.now() + Math.random(),
        name: '',
        number: ''
    })
    
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => { 
        setForm({ ...form, [event.target.name] : event.target.value })
    }
    
    const handleClick = () => { 
        if (form.name && form.number) { 
            dispatch(addContact(form))
            setForm({
                id: Date.now() + Math.random(),
                name: '',
                number: ''
            })
        }
        return
    }

    const handleClickEdit = () => { 
        if (form.name && form.number) { 
            dispatch(editContact(form))
            setForm({
                id: Date.now() + Math.random(),
                name: '',
                number: ''
            })
        }
        setToggleEditItem(false)
        setSearchToggle(false)
        return
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault()
        }
    }

    const filterMovies = (event: ChangeEvent<HTMLInputElement>) => { 
        if (event.target.value.length > 0) {
            setSearchToggle(true)
            const nameOfObject = contacts.filter((el) => el.name.toUpperCase().includes(event.target.value.toUpperCase()))
            setFilteredContacts(nameOfObject)
        }
        else if (event.target.value.length === 0){
            setSearchToggle(false)
            setFilteredContacts([])    
        }
    }    

    useEffect(() => { 
        if (toggleEditItem && postIdItemForEdit) { 
            const arrWithItemForEdit = contacts.filter(item => item.id === postIdItemForEdit)
            const [obj]  = arrWithItemForEdit
            setForm({ 
                id: postIdItemForEdit,
                name: obj.name,
                number: obj.number
            })
        }
    }, [toggleEditItem, postIdItemForEdit, contacts])

    return (
        <div className='home__content form'>
            <div className='form__container'>
                {
                    !toggleEditItem ? <div className='form__add-contacts'>
                    <div className='form__input'>
                        <label htmlFor='name'>Введите имя</label>
                        <input
                            maxLength={25}
                            type='text'                            
                            title='имя контакта'
                            name='name'
                            id='name'
                            placeholder='Введите имя'
                            value={form.name.toUpperCase()}
                            onChange={changeHandler} 
                        />
                    </div>
                    <div className='form__input'>
                        <label htmlFor='number'>Введите номер</label>
                        <input
                            maxLength={15}
                            type='text'
                            title='номер контакта'
                            name='number'
                            id='number'
                            placeholder='Введите номер'
                            value={form.number}
                            onChange={changeHandler} 
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <button className='form__button' onClick={handleClick}>Добавить контакт</button>
                </div> : <div className='form__add-contacts'>
                    <div className='form__input-edit'>
                        <label htmlFor='name'>Введите имя</label>
                        <input
                            maxLength={25}
                            type='text'                            
                            title='имя контакта'
                            name='name'
                            id='name'
                            placeholder='Введите имя'
                            value={form.name.toUpperCase()}
                            onChange={changeHandler} 
                        />
                    </div>
                    <div className='form__input-edit'>
                        <label htmlFor='number'>Введите номер</label>
                        <input
                            maxLength={15}
                            type='text'
                            title='номер контакта'
                            name='number'
                            id='number'
                            placeholder='Введите номер'
                            value={form.number}
                            onChange={changeHandler} 
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <button className='form__button-edit' onClick={handleClickEdit}>Редактировать контакт</button>
                </div>
                }
                <div className='form__input search'>
                    <label htmlFor='search'>Найти контакт</label>
                    <input
                        className='search__input'
                        maxLength={25}
                        title='поиск'
                        name='search'
                        type='search'
                        id='search'
                        placeholder='Введите имя контакта'
                        onChange={(e) => filterMovies(e)}
                    />              
                </div>                   
            </div>
        </div>
    )
}
export default FormContacts