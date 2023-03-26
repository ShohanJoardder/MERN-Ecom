import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [answer, setAnswer] = useState("")
    const [newPassword, setNewPassword] = useState("")
    
    // Hooks
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/forgot-password`,{
                email,
                answer,
                newPassword  
            });
            if(data){
                navigate("/login")
                toast.success(data.message)    
            }else{
                toast.error(data.message)
            }
        }catch(err){
            console.log(err)
            toast.error("Password reset fail, Try again")
        }
    }    

  return (
    <Layout>
      <div className="register">
  <div className="container">
    <div className="forms">
      <div className="form signup">
        <span className="title">Password Reset</span>
        <form onSubmit={handleSubmit}>

          <div className="input-field">
            <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your email" required />
            <i className="uil uil-envelope icon" />
          </div>

          <div className="input-field">
            <input type="text" value={answer} onChange={(e)=> setAnswer(e.target.value)} className="password" placeholder="Enter your favorite sport name" required />
            <i className="uil uil-football" />
          </div>

          <div className="input-field">
            <input type="password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} className="password" placeholder="Create a new password" required />
            <i className="uil uil-lock icon" />
          </div>

            <button type='submit' className="input-field button">Reset</button>
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

export default ForgotPassword
