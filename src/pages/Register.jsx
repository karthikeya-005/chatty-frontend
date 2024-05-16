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
                <div>
                    <h1 id="mainHead">Register now ! !</h1>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <div className="brand">
                            <img src={Logo} alt="Logo" />
                            <h1>Chatty</h1>
                        </div>
                        <div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    id="user"
                                    className="input-field"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                                <label for="user" className="label">
                                    Username
                                </label>
                            </div>

                            <div className="input-box">
                                <input
                                    type="email"
                                    id="email"
                                    className="input-field"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                                <label for="email" className="label">
                                    Email
                                </label>
                            </div>

                            <div className="input-box">
                                <input
                                    type="password"
                                    id="pass"
                                    className="input-field"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                                <label for="pass" className="label">
                                    Password
                                </label>
                            </div>

                            <div className="input-box">
                                <input
                                    type="password"
                                    id="pass"
                                    className="input-field"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                                <label for="pass" className="label">
                                    Confirm Password
                                </label>
                            </div>

                            <button type="submit">Create User</button>
                            <span>
                                Already have an account ?
                                <Link to="/Login">Login</Link>
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
    #mainHead {
        display: flex;
        justify-content: center;
        color: #fff;
        margin: 10px;
        font-size: 4rem;
    }
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
        justify-content: center;
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
    form {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 3rem;
        background-color: #31572c;
        border-radius: 2rem;
        padding: 3rem 5rem;
        button {
            background-color: #90a955;
            color: white;
            padding: 1rem 2rem;
            border: none;
            margin-bottom: 1rem;
            margin-right: 1rem;
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
    .icon {
        position: absolute;
        top: 18px;
        right: 25px;
        font-size: 20px;
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
        font-size: 10px;
        background-color: #90a955;
        border-radius: 5px;
        color: #31572c;
        padding: 0 10px;
    }
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
    }
`

export default Register