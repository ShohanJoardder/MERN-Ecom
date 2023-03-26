import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/Auth';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.post(`${process.env.REACT_APP_API}/login`,{
                email,
                password
            });
            if(data?.error){
                toast.error(data.error)
            }else{
              localStorage.setItem("auth", JSON.stringify(data))
              setAuth({
                ...auth,
                user: data.user,
                token: data.token
              })
              toast.success("Login SuccessFull")
              navigate(location.state || "/")
            }
        }catch(err){
            console.log(err)
            toast.error("Login Fail, Try again")
        }
    }    
  return (
    <Layout>
    <div className="register">
  <div className="container">
    <div className="forms">
      <div className="form signup">
        <span className="title">LogIn</span>
        <form onSubmit={handleSubmit}>

          <div className="input-field">
            <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your email" required />
            <i className="uil uil-envelope icon" />
          </div>

          <div className="input-field">
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="password" placeholder="Create a password" required />
            <i className="uil uil-lock icon" />
          </div>

          <div className="checkbox-text">
            <div className="checkbox-content">
              <input type="checkbox" id="logCheck" />
              <label htmlFor="logCheck" className="text">Remember me</label>
            </div>
            <button type='button' className="text" onClick={()=> navigate('/forgot-password')}>Forgot password?</button>
          </div>

            <button type='submit' className="input-field button">Login</button>
        </form>
      </div>
      <div>
      </div>
    </div>
  </div>
  </div>

    </Layout>
  )
}

export default Login
