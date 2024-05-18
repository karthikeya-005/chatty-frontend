import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Contacts from '../components/Contacts'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { allUsersRoute } from '../utils/APIRoutes'

function Chat() {
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const navigate = useNavigate()
    async function getCurrentUser() {
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/login')
        } else {
            setCurrentUser(
                await JSON.parse(localStorage.getItem('chat-app-user'))
            )
        }
    }
    useEffect(() => {
        getCurrentUser()
    },[])

    async function fetchUsers() {
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
                const data = await axios.get(
                    `${allUsersRoute}/${currentUser._id}`
                )
                setContacts(data.data)
            } else {
                navigate('/setAvatar')
            }
        }
    }
    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <Container>
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} />
            </div>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #132a13;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #31572c;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
        @media screen and (min-width: 360px) and (max-width: 480px) {
            grid-template-columns: 35% 65%;
        }
    }
`

export default Chat
