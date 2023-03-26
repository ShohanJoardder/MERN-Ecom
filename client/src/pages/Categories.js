import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import useCategory from '../Hooks/useCategory'

const Categories = () => {
    const categories = useCategory()
  return (
    <Layout>
      <div className='container mt-3'>
        <div className='row'>
            {categories.map((c)=>(
                <div className='col-md-6 mt-5 mb-3 gx-3 gy-3' key={c._id}>
                    <Link className='btn btn-primary' to={`/category/${c.slug}`}>{c.name}</Link>
                </div>
            ))}
        </div>
      </div>
      
    </Layout>
  )
}

export default Categories
