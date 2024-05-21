import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import styled from 'styled-components'
import Logo from '../assets/Logo.svg'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { loginRoute } from '../utils/APIRoutes'

function Login() {
    const navigate = useNavigate()

    const toastOptions = {
        position: 'bottom-left',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    }

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/')
        }
    }, [navigate])

    const [values, setValues] = useState({
        username: '',
        password: '',
    })

    const handleValidation = () => {
        const { password, username } = values
        if (password === '') {
            toast.error('Email and password is required', toastOptions)
            return false
        } else if (username === '') {
            toast.error('Email and password is required', toastOptions)
            return false
        }
        return true
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (handleValidation) {
            const { password, username } = values
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            })
            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate('/')
            }
        }
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    return (
        <>
            <FormContainer>
                <div>
                    <h1 id="mainHead">Login</h1>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <div className="brand">
                            <img src={Logo} alt="Logo" />
                            <h1>Chatty</h1>
                            <h1 id="responsiveHead">Login</h1>
                        </div>
                        <hr id="split"></hr>
                        <div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    id="user"
                                    name="username"
                                    className="input-field"
                                    required
                                    onChange={(e) => handleChange(e)}
                                    min="3"
                                />
                                <label for="user" className="label">
                                    Username
                                </label>
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    id="pass"
                                    name="password"
                                    className="input-field"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                                <label for="pass" className="label">
                                    Password
                                </label>
                            </div>
                            <button type="submit">Login</button>
                            <span>
                                Don't have an account ?
                                <Link to="/register">Register</Link>
                            </span>
                        </div>
                    </form>
                </div>
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
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        img {
            height: 15rem;
        }
        h1,
        h2 {
            color: white;
            text-transform: uppercase;
        }
    }
    #split {
        height: 15rem;
    }
    #mainHead {
        display: flex;
        justify-content: center;
        color: #fff;
        margin-bottom: 1rem;
        font-size: 4rem;
    }
    form {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 3rem;
        background-color: #31572c;
        border-radius: 2rem;
        padding: 5rem 7rem;
        button {
            background-color: #90a955;
            color: white;
            padding: 1rem 2rem;
            border: none;
            margin-bottom: 1rem;
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
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
            color: white;
            text-transform: uppercase;
            a {
                color: #54954b;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
    .icon {
        position: absolute;
        top: 18px;
        right: 25px;
        font-size: 20px;
    }
    #responsiveHead {
        display: none;
    }
    .input-box {
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 20px 0;
    }

    .input-field {
        width: 100%;
        height: 55px;
        font-size: 16px;
        background: transparent;
        color: #90a955;
        padding-inline: 20px 50px;
        border: 2px solid #7f964b;
        border-radius: 7px;
        outline: none;
    }
    .label {
        position: absolute;
        top: 15px;
        left: 25px;
        color: #90a955;
        transition: 0.2s;
    }

    .input-field:focus ~ .label,
    .input-field:valid ~ .label {
        position: absolute;
        top: -5px;
        left: 20px;
        font-size: 0.7rem;
        background-color: #90a955;
        border-radius: 0.4rem;
        color: #31572c;
        padding: 0.4rem;
    }
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
    }
    @media screen and (max-width: 768px) {
        .brand {
            h1 {
                font-size: 3rem;
            }
            img {
                height: 6rem;
            }
        }
        span {
            font-size: 0.8rem;
        }
        #responsiveHead {
            margin-top: 1rem;
            display: block;
            text-transform: none;
            font-size: 1.4rem;
        }
        #mainHead {
            display: none;
        }
        #split {
            height: 0;
            width: 10rem;
        }
        width: 100vw;
        height: 100vh;
        form {
            width: 90vw;
            padding: 2rem 3rem;
            gap: 0.5rem;
            flex-direction: column; /* Stack items vertically */
            align-items: center; /* Center items horizontally */
        }
    }
`

export default Login
