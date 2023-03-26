import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useCategory = () => {
    const [categories, setCategories] = useState([])

    //Get Category
    const getCategory = async ()=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/categories`)
            setCategories(data?.category)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getCategory()
    },[])

    return categories;
}

export default useCategory

