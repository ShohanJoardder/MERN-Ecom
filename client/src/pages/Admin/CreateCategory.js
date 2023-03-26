import { Modal } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import CategoryForm from '../../components/Form/CategoryForm'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'

const CreateCategory = () => {

  const [category, setCategory] = useState([])
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdateName] = useState("")

  // Handle Form
  const handleSubmit = async (e)=>{
    e.preventDefault()
    // Create Category
    try{
      const {data} = await axios.post(`${process.env.REACT_APP_API}/category`, {name})
      console.log(data)
      if(data?.success){
        toast.success(`${name} is Created`)
        getAllCategory();
      }else{
        toast.error("Category create fail")
      }
    }catch(err){
      console.log(err)
      toast.error("Something went wrong in input form")
    }
  }

  // Get All Category
  const getAllCategory = async ()=>{
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/categories`)
      if(data?.success){
        setCategory(data?.category)
      }
    }catch(err){
      console.log(err)
      toast.error("Something went wrong in getting Category")
    }
  }

  useEffect(()=>{
    getAllCategory();
  },[]);

  // Update Category
  const handleUpdate = async (e)=>{
    e.preventDefault()
    try{  
      const {data} = await axios.put(`${process.env.REACT_APP_API}/category/${selected._id}`, {name: updatedName});
      console.log(data)
      if(data?.success){
        toast.success(`${updatedName} is updated`)
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    }catch(err){
      console.log(err)
      toast.error("something went wrong")
    }
  }


  // Delete Category
  const handleDelete = async (pId)=>{
    try{  
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/delete-category/${pId}`);
      if(data.success){
        toast.success(`Category is Deleted`)
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    }catch(err){
      console.log(err)
      toast.error("something went wrong")
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
             <h1>Manage Category</h1>
             <div className='p-3 w-50'>
                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
             </div>
             <div className='mt-3 w-75'>
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                      {category?.map((c)=>(
                        <>
                          <tr>
                            <td key={c._id}>{c.name}</td>
                            <td>
                              <button
                               className='btn btn-primary ms-2'
                                onClick={()=> {setVisible(true) ; setUpdateName(c.name) ; setSelected(c)}}
                                >Edit</button>
                              <button className='btn btn-danger ms-2' onClick={()=> handleDelete(c._id)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      ))}
                  
                  </tbody>
                </table>

             </div>
             <Modal onCancel={()=> setVisible(false)} footer={null} visible={visible} >
                  <CategoryForm value={updatedName} setValue={setUpdateName} handleSubmit={handleUpdate}/>
             </Modal>
           </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
