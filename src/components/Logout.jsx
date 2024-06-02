import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { GiPowerButton } from 'react-icons/gi'
export default function Logout() {
    const navigate = useNavigate()
    const handleClick = async () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <Button onClick={handleClick}>
            <GiPowerButton />
        </Button>
    )
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #73ce68;
    border: none;
    cursor: pointer;
    svg {
        font-size: 1.5rem;
        color: #0d5614;
    }
`
