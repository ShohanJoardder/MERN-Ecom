import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [answer, setAnswer] = useState("")
    const [address, setAddress] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.post(`${process.env.REACT_APP_API}/register`,{
                name,
                email,
                password,
                answer,
                address
            });
            if(data?.error){
                toast.error(data.error)
            }else{
              toast.success("Registration Successful")
              navigate("/login")
            }
        }catch(err){
            console.log(err)
            toast.error("Registration Fail")
        }
    }

  return (
    <Layout>
    <div className="register">
  <div className="container">
    <div className="forms">
      <div className="form signup">
        <span className="title">Registration</span>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter your name" required />
            <i className="uil uil-user" />
          </div>
          <div className="input-field">
            <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your email" required />
            <i className="uil uil-envelope icon" />
          </div>
          <div className="input-field">
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="password" placeholder="Create a password" required />
            <i className="uil uil-lock icon" />
          </div>

          <div className="input-field">
            <input type="text" value={answer} onChange={(e)=> setAnswer(e.target.value)} className="password" placeholder="What is your favorite sports" required />
            <i className="uil uil-football" />
          </div>

          <div className="input-field">
            <input type="text" value={address} onChange={(e)=> setAddress(e.target.value)} className="password" placeholder="Enter your address" required />
            <i className="uil uil-home" />
          </div>
          
            {/* <input type="button" defaultValue="Signup" /> */}
            <button type='submit' className="input-field button">Signup</button>
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

export default Register
