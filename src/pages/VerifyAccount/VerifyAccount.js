import React, {useState} from 'react'
import './VerifyAccount.scss'
import falconlitlogo from '../../assets/WhatsApp Image 2022-09-19 at 6.49.50 PM 2.png'
import currencyimage from '../../assets/WhatsApp Image 2022-11-04 at 9.35 2.png'
import Spinner from '../../components/Spinner/Spinner'
import {Helmet} from 'react-helmet'
import {useSelector} from 'react-redux'
import {endpoint} from '../../utils/endpoint'
import { toast } from 'react-toastify';

const VerifyAccount = () => {

  const [loading, setLoading] = useState(false)
  let [count, setCount] = useState(30)


  const authState = useSelector((state) => state).auth
  const verifyname = authState.data && authState.data.data.email

  const verifyInput = (e) =>{
    if(e.target.value !== ""){
    if(e.target.nextElementSibling){
      e.target.nextElementSibling.focus()
    }
    }
  }

  function resendCode(){
    if(count <= 0){
      setCount(0)
      clearInterval(resendCodeInterval)
    }else{
      setCount(count -= 1)
    }
  }

   let resendCodeInterval = setInterval(resendCode, 1000);

  const verifyCode = () =>{
    let inputs = document.querySelectorAll(".verify__content--inputs input")

    let code = ""

    inputs.forEach(input =>{
      code += input.value
    })

    setLoading(true)
        const xhr = new XMLHttpRequest()
        xhr.open('post', `${endpoint}/verify-email`)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        xhr.onload = function () {
            setLoading(false)
            const data = JSON.parse(xhr.response)
            if (data.success) {
                toast.success(data.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                inputs.forEach(input =>{
                  input.value = ''
                })
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
        formData.append("code", code)

        
        xhr.send(formData.toString())
    
  }

  

  return (
    <div className="max-wrapper">
      <Helmet>
            <title>Verify Account</title>
        </Helmet>
        <div className="max-wrapper__content verify-container">
            <div className="verify">
                <div className="verify__content">
                    <div className="verify__content--logo">
                        <img src={falconlitlogo} alt="falconlite logo"/>
                    </div>
                    <div className="verify__content--title">
                        <h1>Kindly enter Email verifiication code</h1>
                        <p>To Sign up, kindly enter the verification code sent to your email address</p>
                        <p>{verifyname} <span className="change-email">change Email</span></p>
                    </div>
                    <div className="verify__content--inputs">
                      <input type="text" maxLength="1" onChange={verifyInput} autoComplete="off"/>
                      <input type="text" maxLength="1" onChange={verifyInput} autoComplete="off"/>
                      <input type="text" maxLength="1" onChange={verifyInput} autoComplete="off"/>
                      <input type="text" maxLength="1" onChange={verifyInput} autoComplete="off"/>
                      <input type="text" maxLength="1" onChange={verifyInput} autoComplete="off"/>
                    </div>
                    {
                      count === 0 ? <div className="verify__content--resend">Resend Verification Code</div> : <div className="verify__content--resend"><p>Resend Verification Code: <span>{count}</span></p> </div>
                    }
                    
                    <div className="verify__content--btn">
                      {
                        loading ? <div className="btn"><Spinner/></div> : <div className="btn" onClick={verifyCode}>Proceed</div>
                      }
                        
                    </div>
                </div>
                <div className="verify__image">
                    <img src={currencyimage} alt="Currency"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VerifyAccount