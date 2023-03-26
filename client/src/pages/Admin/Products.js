import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([])

    //get all product
    const getAllProducts = async ()=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/get-products`)
            setProducts(data.products)
        }catch(err){
            console.log(err)
            toast.error("Something went wrong")
        }
    };

    //life cycle method
    useEffect(()=> {
        getAllProducts();
    }, [])

  return (
    <Layout>
      <div class="container-fluid m-3 p-3">
        <div class="row">
           <div className='col-md-3'>
                <AdminMenu />
           </div>
           <div className='col-md-9'>
             <h1 className='text-center'>All Products</h1>
             <div className='d-flex flex-wrap'>
              {products?.map(p => (
                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                    <div className="card m-2" style={{width: '18rem'}} >
                          <img src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                           className="card-img-top" alt={p.name} 
                           width="200" 
                           crossorigin="anonymous"
                           align="center"
                           />
                          <div className="card-body">
                              <h5 className="card-title">{p.name}</h5>
                              <p className="card-text">{p.description}</p>
                          </div>
                      </div>
                </Link>
                  
              ))}
             </div>
           </div>
        </div>
        </div>
    </Layout>
  )
}

export default Products
