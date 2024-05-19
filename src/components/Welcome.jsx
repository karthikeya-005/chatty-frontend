import React from 'react'
import styled from 'styled-components'
import Hello from '../assets/hello.gif'

export default function Welcome({ currentUser }) {
    console.log(currentUser)
    return (
        <Container>
            <img src={Hello} alt="hello" />
            <h1>
                Welcome, <span>{currentUser.username}</span>
            </h1>
            <h3>Please select a chat to start messaging.</h3>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img {
        height: 30rem;
        padding-bottom: 3rem;
    }
    span {
        color: #6dcd1b;
    }
`
