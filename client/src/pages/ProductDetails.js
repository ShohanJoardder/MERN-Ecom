import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])

    // Initial Product Details
    useEffect(()=> {
        if(params?.slug) getProduct()
    }, [params?.slug])
    //get product
    const getProduct = async ()=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/get-product/${params.slug}`)
            setProduct(data?.product)
            similarProduct(data?.product._id, data?.product.category._id);
        }catch(err){
            console.log(err)
        }
    }

    //Get Similar Product
    const similarProduct = async (productId, categoryId)=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/related-products/${productId}/${categoryId}`)
            setRelatedProduct(data?.related)
        }catch(err){
            console.log(err)
        }
    }
  return (
    <Layout>
    <div>
        <div class="row d-flex mt-3">
          <div className='card col-md-6' style={{width: '20rem'}}>
                <img src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                     className="card-img-top" alt={product.name}
                     crossorigin="anonymous"
                     align="center"
                     
                /> 
          </div>  
          <div className='col-md-6'>
            <h1>Product Details</h1>
            <h6>Name: {product.name}</h6>  
            <h6>Description: {product.description}</h6>  
            <h6>Price: {product.price}</h6>  
            <h6>Category: {product?.category?.name}</h6> 
            <button class="btn btn-secondary ms-1">Add to Cart</button>
          </div>  
        </div>
        <hr />
        <div className='row fluid mt-3'>
            <h6 className='p-3'>Similar Product</h6>
            {relatedProduct.length<1 && (<p className='text-center'>No Similar Product Found</p>)}
            <div className='d-flex flex-wrap'>
          {relatedProduct?.map(p => (
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

export default ProductDetails
