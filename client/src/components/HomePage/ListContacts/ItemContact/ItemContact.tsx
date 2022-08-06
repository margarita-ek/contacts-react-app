import React from 'react'
import { useAppDispatch } from '../../../../toolkit/hooks'
import { removeContact, TContactItem } from '../../../../toolkit/slices/contactsSlice'

interface ItemContactProps { 
    item: TContactItem
    filteredContacts: TContactItem[]
    setFilteredContacts: Function
    searchToggle: boolean
    setSearchToggle: Function
    setToggleEditItem: Function
    setPostIdItemForEdit: Function
}

const ItemContact: React.FC<ItemContactProps> = (props) => {    
    const {
        item,
        filteredContacts,
        setFilteredContacts,
        searchToggle,
        setSearchToggle,
        setToggleEditItem,
        setPostIdItemForEdit
    } = props

    const dispatch = useAppDispatch()

    const handleClickRemoveItem = (id: number) => { 
        if (searchToggle && filteredContacts.length > 0) { 
            const filterWithoutRemoveId = filteredContacts.filter(item => item.id !== id)
            if (filterWithoutRemoveId.length > 0) { 
                setFilteredContacts(filterWithoutRemoveId)
                
            }
            if (filterWithoutRemoveId.length === 0) { 
                setSearchToggle(false)
            }
        }
        dispatch(removeContact(id))
    }

    const handleClickEdit = (id: number) => { 
        setToggleEditItem(true)
        setPostIdItemForEdit(id)
    }

    return (
        <div className='contact'>
            <div className='contact__container'>
                <div className='contact__content'>
                    <div className='contact__name' title={item.name}>{item.name}</div>
                    <div className='contact__number' title={item.number}>{item.number}</div>                
                </div>
                <div className='contact__button-group'>
                    <button className='contact__btn-remove' title='удалить' onClick={() => handleClickRemoveItem(item.id)}/>
                    <button className='contact__btn-edit' title='редактировать' onClick={() => handleClickEdit(item.id)}/>
                </div>
            </div>
        </div>
    )
}

export default ItemContact