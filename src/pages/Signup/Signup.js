import React, { useState } from 'react'
import './Signup.scss'
import falconlitlogo from '../../assets/WhatsApp Image 2022-09-19 at 6.49.50 PM 2.png'
import currencyimage from '../../assets/WhatsApp Image 2022-11-04 at 9.35 2.png'
import Input from '../../components/Input/Input'
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner'
import {endpoint} from '../../utils/endpoint'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import authSlice from '../../store/authSlice'

const Signup = () => {

    const dispatch = useDispatch()
    const { authenticate } = authSlice.actions

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(0);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    

    const submit = () => {
        if (name.trim() === '') {
            return toast.error("Full name can't be blank", {
                position: toast.POSITION.TOP_RIGHT
            });
        }

        if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) {
            return toast.error("Invalid email", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        if (phone < 1) {
            return toast.error("Phone number can't be blank", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        if (password.length < 1) {
            return toast.error("Password can't be blank", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        setLoading(true)
        const xhr = new XMLHttpRequest()
        xhr.open('post', `${endpoint}/send-email`)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        // xhr.timeout = 2000

        xhr.onload = function () {
            setLoading(false)
            const data = JSON.parse(xhr.response)
            if (data.success) {
                toast.success(data.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                dispatch(authenticate({data}))
                navigate('/verify')
            } else {
                toast.error(data.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
        xhr.onerror = function () {
            setLoading(false)
            toast.error("An error occurred!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        xhr.ontimeout = function () {
            setLoading(false)
            toast.error("An error occurred!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        const formData = new URLSearchParams();
        formData.append("name", name)
        formData.append("email", email)
        formData.append("phone", phone)
        formData.append("password", password)

        
        xhr.send(formData.toString())
    }


    return (
        <div className="max-wrapper">
            <Helmet>
                <title>Signup</title>
            </Helmet>
            <div className="max-wrapper__content signup-container">
                <div className="signup">
                    <div className="signup__content">
                        <div className="signup__content--logo">
                            <img src={falconlitlogo} alt="falconlite logo" />
                        </div>
                        <div className="signup__content--title">
                            <h1>Create an account</h1>
                            <p>Register on our website with your correct email address and information</p>
                        </div>
                        <div className="signup__content--input">
                            <p className="signup__content--input__label">First name</p>
                            <Input type="text" input={name} setInput={setName}/>
                        </div>
                        <div className="signup__content--input">
                            <p className="signup__content--input__label">Email Address</p>
                            <Input type="email" input={email} setInput={setEmail}/>
                        </div>
                        <div className="signup__content--input">
                            <p className="signup__content--input__label">Phone Number</p>
                            <Input type="number" input={phone} setInput={setPhone}/>
                        </div>
                        <div className="signup__content--input">
                            <p className="signup__content--input__label">Password</p>
                            <Input type="password" input={password} setInput={setPassword}/>
                        </div>
                        <div className="signup__content--remember">
                            <input type="checkbox" />
                            <p>Remember me</p>
                        </div>
                        <div className="signup__content--btn">
                            {loading ? <div className="btn"><Spinner /></div> : <div onClick={submit} className="btn">Sign up</div>}

                        </div>
                        <div className="signup__content--account">
                            <p>Already have an account? <span>Sign in</span></p>
                        </div>
                    </div>
                    <div className="signup__image">
                        <img src={currencyimage} alt="Currency" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup