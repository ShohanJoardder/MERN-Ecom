import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/Search'

const SearchPage = () => {
    const [values, setValues] = useSearch();
  return (
    <Layout>
      <div className='container-fluid mt-3'>
        <div className='text-center'>
            <h1>Search Results</h1>
            <h6>{values?.results.length < 1 ? 'No Product found' : `Found ${values?.results.length}`}</h6>
            <div className='d-flex flex-wrap mt-4'>
          {values?.results.map(p => (
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
                              <button class="btn btn-primary ms-1">More Details</button>
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

export default SearchPage
