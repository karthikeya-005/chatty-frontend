import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Contacts from '../components/Contacts'
import Settings from '../components/Settings'
import Welcome from '../components/Welcome'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { allUsersRoute } from '../utils/APIRoutes'
import ChatContainer from '../components/ChatContainer'

function Chat() {
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchCurrentUser = async () => {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login')
            } else {
                const response = await JSON.parse(
                    localStorage.getItem('chat-app-user')
                )
                setCurrentUser(response)
                setIsLoaded(true)
            }
        }
        fetchCurrentUser()
    }, [navigate])

    useEffect(() => {
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
                async function fetchData() {
                    try {
                        const response = await axios.get(
                            `${allUsersRoute}/${currentUser._id}`
                        )
                        setContacts(response.data)
                    } catch (error) {
                        console.error('API request failed:', error)
                    }
                }

                fetchData()
            } else {
                navigate('/setAvatar')
            }
        }
    }, [currentUser, navigate])

    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }

    return (
        <>
            <Container>
                <div className="container">
                    <Contacts
                        contacts={contacts}
                        currentUser={currentUser}
                        changeChat={handleChatChange}
                        isClicked={setIsClicked}
                    />
                    {isLoaded && currentChat === undefined ? (
                        <Welcome currentUser={currentUser} />
                    ) : isClicked && currentChat === currentUser ? (
                        <Settings />
                    ) : (
                        <ChatContainer currentChat={currentChat} />
                    )}
                </div>
            </Container>
        </>
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
    }
    @media screen and (max-width: 768px) {
        .container {
        }
    }
`

export default Chat
