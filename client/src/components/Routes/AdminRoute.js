import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import Spinner from '../Spinner';

const AdminRoute = () => {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth();
      
  
    useEffect(()=>{
      const authCheck = async ()=>{
        const {data} =  await axios.get(`${process.env.REACT_APP_API}/admin-check`,
          {
            headers: {
              authorization: auth?.token
            }
          });
          if(data?.ok){
            setOk(true)
          }else{
            setOk(false)
          }
      };
  
        if(auth?.token) authCheck();
      },[auth?.token])
  
  
      return ok? <Outlet/>: <Spinner path='' />;
}

export default AdminRoute
