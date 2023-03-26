import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/Auth'

const Profile = () => {
    const [auth, setAuth] = useAuth();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")

    // Get user Data
  useEffect(()=>{
    const { email, name, address } = auth?.user;
    setName(name);
    setEmail(email);
    setAddress(address);

  },[auth?.user])
  

    const handleSubmit = async (e)=>{
      e.preventDefault();
      try{
          const {data} = await axios.put(`${process.env.REACT_APP_API}/profile`,{
              name,
              email,
              password,
              address
          });
          if(data?.err){
              toast.error(data.err)
          }else{
            setAuth({ ...auth, user: data?.updatedUser });
            let ls = localStorage.getItem("auth");
            ls = JSON.parse(ls);
            ls.user = data.updatedUser;
            localStorage.setItem("auth", JSON.stringify(ls));
            toast.success("Profile Updated Successfully");
          }
      }catch(err){
        console.log(err);
        toast.error("Something went wrong");
      }
  }
  return (
    <Layout>
      <div className='container-fluid p-3 m-3'>
        <div class="row">
           <div className='col-md-3'>
                <UserMenu/>
           </div>
           <div className='col-md-9 mt-3' style={{width: "400px", marginLeft: "80px", }}>
              <div className="forms">
                <div className="form signup">
                  <span className="title" style={{fontSize: "28px"}}>Profile Update</span>
                  <form onSubmit={handleSubmit}>
                    <div className="input-field">
                      <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter your name" />
                      <i className="uil uil-user" />
                    </div>
                    <div className="input-field">
                      <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your email" disabled/>
                      <i className="uil uil-envelope icon" />
                    </div>
                    <div className="input-field">
                      <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="password" placeholder="Enter your password" />
                      <i className="uil uil-lock icon" />
                    </div>

                    <div className="input-field">
                      <input type="text" value={address} onChange={(e)=> setAddress(e.target.value)} className="password" placeholder="Enter your address"/>
                      <i className="uil uil-home" />
                    </div>
                      <button type='submit' className="input-field button">Update Profile</button>
                  </form>
                </div>
                <div>
                </div>
              </div>
            </div>
           </div>
        </div>
    </Layout>
  )
}

export default Profile
