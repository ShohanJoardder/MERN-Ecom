import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = ({path = "login"}) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((preValue)=> --preValue)
        },1000);

        // redirect once count is equal to 0
        count === 0 &&
        navigate(`/${path}`, {
            state: location.pathname
        });

        // cleanup
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);


  return (
    <>
      <div class="d-flex flex-column justify-content-center align-items-center" style={{height: "90vh"}}>
        <h1 className='text-center' style={{color: "#0c2461"}}>Redirecting to you in {count} second</h1>
        <div class="spinner-border " style={{color:"#0652DD"}} role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
      </div>

    </>
  )
}

export default Spinner
