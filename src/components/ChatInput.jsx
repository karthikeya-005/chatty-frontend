import React, { useState } from 'react'
import styled from 'styled-components'
import EmojiPicker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'
export default function ChatInput({ handleSendMsg }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState('')
    const sendChat = (event) => {
        event.preventDefault()
        if (msg.length > 0) {
            handleSendMsg(msg)
            setMsg('')
        }
    }

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick = (event) => {
        let message = msg
        message += event.emoji
        setMsg(message)
    }

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {showEmojiPicker && (
                        <EmojiPicker
                            className="emoji-picker-react"
                            onEmojiClick={handleEmojiClick}
                        />
                    )}
                </div>
            </div>
            <form className="input-container" onSubmit={(e) => sendChat(e)}>
                <input
                    type="text"
                    placeholder="type your message here..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button className="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #08390f;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .emoji-picker-react {
                position: absolute;
                top: -450px;
                background-color: #08390f;
                box-shadow: 0 5px 10px #67ca3c;
                border-color: #6fad54;
                --epr-text-color: white;
                --epr-search-input-bg-color: #08390f;
                --epr-bg-color: #08390f;
                --epr-category-label-bg-color: #08390f;
                .epr-body::-webkit-scrollbar {
                    background-color: #08390f;
                    width: 5px;
                    &-thumb {
                        background-color: #b3f386;
                    }
                }
                .epr_x558go:focus {
                    border-color: #6fad54;
                }
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-content: center;
        gap: 2rem;
        background-color: #ffffff34;
        input {
            width: 90%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection {
                background-color: #6fad54;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #b3f386;
            border: none;
            svg {
                font-size: 2rem;
                color: #045f11;
            }
        }
    }
    /* Maintain existing styles */

    @media screen and (max-width: 768px) {
        padding: 0.5rem 1rem;
        gap: 1rem;
        .input-container {
            input {
                font-size: 1rem;
            }
            button {
                svg {
                    font-size: 1.5rem;
                }
            }
        }
    }
`
