import React, { useState, useEffect } from 'react'
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

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/')
        }
    }, [navigate])

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
                    <h1 id="mainHead">Register now ! !</h1>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <div className="brand">
                            <img src={Logo} alt="Logo" />
                            <h1>Chatty</h1>
                            <h1 id='responsiveHead'>Register</h1>
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
                                />
                                <label for="user" className="label">
                                    Username
                                </label>
                            </div>

                            <div className="input-box">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
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
                                    name="password"
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
                                    name="confirmPassword"
                                    required
                                    className="input-field"
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
        height: 20rem;
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
    #responsiveHead{
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
            h1{
                font-size: 3rem;
            }
            img {
                height: 6rem;
            }
        }
        span{
            font-size: 0.8rem;
        }
        #responsiveHead{
            margin-top: 1rem;
            display: block;
            font-size: 1.4rem;
        }
        #mainHead {
            display: none;
        }
        #split {
            height: 0;
            width: 20rem;
        }
        form {
            border-radius: 0;
            padding: 2rem 3rem;
            width: 100vw;
            height: 100vh;
            gap: 0.5rem;
            flex-direction: column; /* Stack items vertically */
            align-items: center; /* Center items horizontally */
        }
    }
`

export default Register
