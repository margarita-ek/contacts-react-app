import React from "react"
import { useAppSelector } from "../../../toolkit/hooks"
import { TContactItem } from "../../../toolkit/slices/contactsSlice"
import ItemContact from "./ItemContact/ItemContact"

interface ListContactsProps { 
    contactsData: TContactItem[]
    filteredContacts: TContactItem[]
    searchToggle: boolean
    setSearchToggle: Function
    setFilteredContacts: Function
    setToggleEditItem: Function
    setPostIdItemForEdit: Function
}

const ListContacts: React.FC<ListContactsProps> = (props) => { 
    const {
        contactsData,
        filteredContacts,
        setFilteredContacts,
        searchToggle,
        setSearchToggle,
        setToggleEditItem,
        setPostIdItemForEdit
    } = props

    return (
        <div className='home__list-contacts list-contacts'>
            {
                contactsData.length > 0 ? contactsData.slice(0).reverse().map((item, index) => { 
                    return <ItemContact
                        key={index}
                        item={item}
                        filteredContacts={filteredContacts}
                        setFilteredContacts={setFilteredContacts}
                        searchToggle={searchToggle}
                        setSearchToggle={setSearchToggle}
                        setToggleEditItem={setToggleEditItem}
                        setPostIdItemForEdit={setPostIdItemForEdit}
                    />
                }): 'Нет контактов' 
            }
        </div>
    )
}

export default ListContacts