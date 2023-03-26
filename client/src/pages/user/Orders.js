import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/Auth'

const Orders = () => {

  const [orders, setOrders] = useState([])
  const [auth, setAuth] = useAuth();

  const getOrders = async ()=>{
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/orders`)
      setOrders(data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(auth?.token) getOrders()
  },[auth?.token])
  return (
    <Layout>
      <div className='container-fluid p-3 m-3'>
        <div class="row">
           <div className='col-md-3'>
                <UserMenu/>
            </div> 
            <div className='col-md-9'>
                <h1 className='text-center mb-3'>All Orders</h1>
                {
                  orders?.map((order, i)=>{
                    return(
                      <div className='border shadow'>
                        <table className='table'>
                          <thead>
                            <tr>
                              <td scope='col'>#</td>
                              <td scope='col'>Status</td>
                              <td scope='col'>Buyer</td>
                              <td scope='col'>Orders</td>
                              <td scope='col'>Payment</td>
                              <td scope='col'>Quantity</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>{i + 1}</th>
                              <th>{order?.status}</th>
                              <th>{order?.buyer?.name}</th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )
                  })
                }
            </div> 
        </div>
      </div>
    </Layout>
  )
}

export default Orders
