import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Logo from '../assets/Logo.svg'

export default function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)
    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser])
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index)
        changeChat(contact)
    }
    return (
        <>
            {currentUserImage && currentUserName && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h3>Chatty</h3>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    className={`contact ${
                                        index === currentSelected
                                            ? 'selected'
                                            : ''
                                    }`}
                                    key={index}
                                    onClick={() => {
                                        changeCurrentChat(index, contact)
                                    }}
                                >
                                    <div className="avatar">
                                        <img
                                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })}
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    className={`contact ${
                                        index === currentSelected
                                            ? 'selected'
                                            : ''
                                    }`}
                                    key={index}
                                    onClick={() => {
                                        changeCurrentChat(index, contact)
                                    }}
                                >
                                    <div className="avatar">
                                        <img
                                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })}
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    className={`contact ${
                                        index === currentSelected
                                            ? 'selected'
                                            : ''
                                    }`}
                                    key={index}
                                    onClick={() => {
                                        changeCurrentChat(index, contact)
                                    }}
                                >
                                    <div className="avatar">
                                        <img
                                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img
                                src={`data:image/svg+xml;base64,${currentUserImage}`}
                                alt="avatar"
                            />
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                </Container>
            )}
        </>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 78.5% 11.5%;
    overflow: hidden;
    background-color: #90a955;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img {
            height: 2rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        .contact {
            display: flex;
            background-color: #0d53144d;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            align-items: center;
            transition: 0.5s ease-in-out;
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
        .selected {
            background-color: #264118;
        }
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
    }
    .current-user {
        background-color: #4f772d;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .avatar {
            img {
                height: 4rem;
            }
        }
        .username {
            h2 {
                color: white;
                font-size: 2rem;
            }
        }
    }
    @media screen and (max-width: 768px) {
        max-height: 30vh;
        padding: 0 0.3rem;
        display: flex;
        gap: 0.5rem;
        .brand {
            flex-direction: column;
            justify-content: center;
        }

        .contacts {
            &::-webkit-scrollbar {
                height: 0.6rem;
                &-thumb {
                    background-color: #ffffff39;
                    height: 0.6rem;
                    border-radius: 1rem;
                }
            }
            flex-grow: 1;
            display: flex;
            flex-direction: row;
            gap: 0.3rem;
            padding-top: 0.5rem;
            overflow-x: auto;
        }

        .contact {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.5rem;
            gap: 0.5rem;
            .username {
                h3 {
                    font-size: 1rem;
                }
            }
            flex-direction: column;
            width: 80%;
        }

        .current-user {
            display: none;
        }
    }
`
