import React from 'react'
import axios from 'axios'
import{ useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { Select } from 'antd'
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate()
  const params = useParams();
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [photo, setPhoto] = useState("")
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [shipping, setShipping] = useState("")
  const [id, setId] = useState("")

  // Get Single Product
  const getSingleProduct = async ()=>{
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/get-product/${params.slug}`);
      setName(data.product.name)
      setId(data.product._id)
      setDescription(data.product.description)
      setPrice(data.product.price)
      setQuantity(data.product.quantity)
      setCategory(data.product.category._id)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=> {
    getSingleProduct();
    //eslint-disable-next-line
  }, [])

  // Get All Category
  const getAllCategory = async ()=>{
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/categories`)
      if(data?.success){
        setCategories(data?.category)
      }
    }catch(err){
      console.log(err)
      toast.error("Something went wrong in getting Category")
    }
  }

  useEffect(()=>{
    getAllCategory();
  },[]);

  // Update Product Function
  const handleUpdate = async (e)=>{
    e.preventDefault()
    try{
      const productData = new FormData()
      productData.append("name" , name)
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const {data} = await axios.put(`${process.env.REACT_APP_API}/update-product/${id}`, productData)
      console.log(data)
      if(data?.success){
        toast.success("Product Updated Successful")
        navigate("/dashboard/admin/products")
      }else{
        toast.error(data?.message)
      }
    }catch(err){
      console.log(err)
      toast.error("Something went Wrong")
    }
  }

  // Delete a Product
  const handleDelete = async ()=>{
    try{
      let answer = window.prompt("Are you sure want to delete this product?")
      if(!answer) return
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/delete-product/${id}`)
      toast.success("Product delete success")
      navigate("/dashboard/admin/products")
    }catch(err){
      console.log(err)
      toast.error("Something went wrong")
    }
  }

  return (
    <Layout>
        <div class="container-fluid m-3 p-3">
        <div class="row">
           <div className='col-md-3'>
                <AdminMenu/>
           </div>
           <div className='col-md-9'>
             <h1>Update Product</h1>
             <div className='m-1 w-75'>
             <Select
                 bordered={false}
                 placeholder="Select a Category" 
                 size='large' 
                 showSearch
                 className='form-select mb-3'
                 onChange={(value)=>{
                    setCategory(value);
                 }}
                 value={category}
                 >
                  {categories?.map(c => (
                    <Option key={c._id} value={c._id}>{c.name}</Option>
                  ))}
                </Select>
                <div className='mb-3'>
                    <label className='btn btn-outline-secondary col-md-12'>
                      {photo ? photo.name : "Upload Photo"}
                      <input type="file" name="photo" accept='image/*' onChange={(e)=> setPhoto(e.target.files[0])} hidden/>
                    </label>
                </div>
                <div className='mb-3'> 
                  {photo ? (
                    <div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt="Product_photo" height={"200px"} className="img img-responsive"/>
                    </div>
                  ) : (
                    <div className='text-center'>
                      <img src={`${process.env.REACT_APP_API}/product/photo/${id}`} 
                      alt="Product_photo"
                      height={"200px"} 
                      className="img img-responsive"
                      crossorigin="anonymous"
                      />
                    </div>
                  )}
                </div>
                <div className='mb-3'>
                  <input type="text"
                    value={name}
                    placeholder="Write a Name"
                    className='form-control'
                    onChange={(e)=>  setName(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                    <textarea
                      type="text"
                      value={description}
                      placeholder="write a description"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                  <input
                    type="number"
                    value={price}
                    placeholder="write a Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <input
                    type="number"
                    value={quantity}
                    placeholder="write a quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                    <Select
                      bordered={false}
                      placeholder="Select Shipping "
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => {
                        setShipping(value);
                      }}
                      value={shipping ? "Yes" : "No"}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                </div>
                <div className='col-md-3'>
                    <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
                </div>
                <div className='col-md-3 mt-3'>
                    <button className='btn btn-danger' onClick={handleDelete}>Delete Product</button>
                </div>
             </div>
           </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct
