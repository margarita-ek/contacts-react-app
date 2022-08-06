import React, { useState } from 'react'
import { useAppSelector } from '../../toolkit/hooks'
import FormContacts from './FormContacts/FormContacts'
import ListContacts from './ListContacts/ListContacts'

const HomePage: React.FC = () => {   
    const contacts = useAppSelector(state => state.contactsSlice.contacts)

    const [filteredContacts, setFilteredContacts] = useState([])
    const [searchToggle, setSearchToggle] = useState(false)
    const [postIdItemForEdit, setPostIdItemForEdit] = useState(0)
    const [toggleEditItem, setToggleEditItem] = useState(false)

    return (
        <section className='home'>
            <div className='home__container'>
                <FormContacts
                    setFilteredContacts={setFilteredContacts}
                    setSearchToggle={setSearchToggle}
                    postIdItemForEdit={postIdItemForEdit}
                    toggleEditItem={toggleEditItem}
                    setToggleEditItem={setToggleEditItem}
                />
                <ListContacts
                    setPostIdItemForEdit={setPostIdItemForEdit}
                    setToggleEditItem={setToggleEditItem}
                    searchToggle={searchToggle}
                    setSearchToggle={setSearchToggle}
                    filteredContacts={filteredContacts}
                    setFilteredContacts={setFilteredContacts}
                    contactsData={searchToggle ? filteredContacts : contacts} />
            </div>
        </section>
    )
}

export default HomePage