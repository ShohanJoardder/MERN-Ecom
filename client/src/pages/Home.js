import { Checkbox, Radio } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout'
import { Prices } from '../components/Prices';
import { useCart } from '../context/Cart';

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useCart()

  const navigate = useNavigate();

  

  // Get all Category
  const getAllCategory = async ()=>{
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/categories`)
      if(data?.success){
        setCategories(data?.category)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=> {
    getAllCategory()
    getTotal()
  }, [])

  // Get Product
  const getAllProducts = async ()=>{
    try{
      setLoading(true)
      const {data} = await axios.get(`${process.env.REACT_APP_API}/product-list/${page}`)
      setLoading(false)
      setProducts(data.products)
    }catch(err){
      setLoading(false)
      console.log(err)
    }
  }

  // Get total count
  const getTotal = async ()=>{
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/products-count`)
      setTotal(data?.total)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    if(page ===1 ) return;
    loadMore();
  },[page])
  // Load More
  const loadMore = async ()=>{
    try{
      setLoading(true)
      const {data} = await axios.get(`${process.env.REACT_APP_API}/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    }catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  // Filter by cat
  const handleFilter = (value, id)=>{
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  }

  useEffect(()=> {
    if(!checked.length || !radio.length) getAllProducts()
    // eslint-disable-next-line
  }, [checked.length, radio.length])

  useEffect(()=> {
    if(checked.length || radio.length) filterProduct()
    
  }, [checked, radio])

  // Get filter Product
  const filterProduct = async ()=>{
    try{
      const {data} = await axios.post(`${process.env.REACT_APP_API}/filtered-Products`, {checked, radio})
      setProducts(data?.products)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <Layout>
      <div className='row mt-3'>
        <div className='col-md-2 '>
            <h4 className='text-center '>Filter by Category</h4>
            <div className='d-flex flex-column'>
                {categories?.map((c) => (
                  <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                    {c.name}
                  </Checkbox>
                ))}
            </div>
            {/* Price filter */}
            <h4 className='text-center mt-3'>Filter by Price</h4>
            <div className='d-flex flex-column'>
                <Radio.Group onChange={e => setRadio(e.target.value)}>
                  {Prices?.map(p => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
            </div>
            <div className='d-flex flex-column'>
                <button className='btn btn-danger mt-3' onClick={()=> window.location.reload()}>Reset Filter</button>
            </div>
        </div>
        <div className='col-md-9 mt-3'>
          <h1 className='text-center'>All Product</h1>
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
                              <button class="btn btn-secondary ms-1"
                                onClick={()=> {
                                  setCart([...cart, p])
                                  localStorage.setItem("cart", JSON.stringify([...cart, p]))
                                  toast.success("item added to cart")
                                }}
                              >Add to Cart</button>
                          </div>
                      </div>
                  
              ))}
          </div>
          <div className='m-2 p-3'>
            {products && products.length < total &&(
              <button className='btn btn-warning'
                onClick={(e)=> {
                  e.preventDefault();
                  setPage(page + 1)
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
