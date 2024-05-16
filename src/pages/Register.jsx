import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import styled from 'styled-components'
import Logo from '../assets/Logo.svg'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { registerRoute } from '../utils/APIRoutes'

function Register() {
    const navigate = useNavigate()

    const toastOptions = {
        position: 'bottom-left',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    }

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values
        if (password !== confirmPassword) {
            toast.error(
                'password and confirm password should be same.',
                toastOptions
            )
            return false
        } else if (username.length < 3) {
            toast.error(
                'Username should be greater than 3 charecters',
                toastOptions
            )
            return false
        } else if (password.length < 8) {
            toast.error(
                'Password should be equal or greater than 8 charecters',
                toastOptions
            )
            return false
        } else if (email === '') {
            toast.error('email is required', toastOptions)
            return false
        }
        return true
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (handleValidation()) {
            const { password, username, email } = values
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            })
            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
            }
            navigate('/')
        }
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>Chatty</h1>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={(e) => handleChange(e)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={(e) => handleChange(e)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => handleChange(e)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={(e) => handleChange(e)}
                        />
                        <button type="submit">Create User</button>
                        <span>
                            Already have an account ?
                            <Link to="/Login">Login</Link>
                        </span>
                    </div>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #132a13;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: row;
        gap: 3rem;
        background-color: #31572c;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            margin: 1rem;
            border: 0.1rem solid #4f772d;
            border-radius: 0.4rem;
            color: #90a955;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #90a955;
                outline: none;
            }
        }
        button {
            background-color: #90a955;
            color: white;
            padding: 1rem 2rem;
            border: none;
            margin: 1rem;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4f772d;
            }
        }
        span {
            color: white;
            text-transform: uppercase;
            a {
                color: #4f772d;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`

export default Register
