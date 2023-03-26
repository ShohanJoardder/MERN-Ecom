import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout'

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(()=>{
    if(params?.slug) getProductByCat()
  },[params?.slug])

  // Get product By Category
  const getProductByCat = async ()=>{
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/product-by-category/${params.slug}`)
      setProducts(data?.products)
      setCategory(data?.category)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <Layout>
      <div className='container-fluid mt-4'>
        <h4 className='text-center'>Category - {category?.name}</h4>
        <h6 className='text-center'>{products?.length} result found </h6>
        <div className='row'>
        <div className='d-flex flex-wrap'>
          {products?.map(p => (
                      <div className="card m-2" style={{width: '18rem'}} >
                          <img src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                            className="card-img-top" alt={p.name} 
                            width="200" 
                            crossorigin="anonymous"
                            align="center"
                          /> 
                          <div className="card-body">
                              <h5 className="card-title">{p.name}</h5>
                              <p className="card-text">{p.description.substring(0, 40)}</p>
                              <p className="card-text">$ {p.price}</p>
                              <button class="btn btn-primary ms-1"
                                onClick={()=> navigate(`/product/${p.slug}`)}
                              >More Details</button>
                              <button class="btn btn-secondary ms-1">Add to Cart</button>
                          </div>
                      </div>
                  
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct

