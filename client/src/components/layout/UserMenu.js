import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
     <div className="list-group">
        <NavLink to='/dashboard/user'  className="list-group-item text-center list-group-item-action active" style={{background: "#192a56"}} aria-current="true">
            dashboard
        </NavLink>

        <NavLink to='/dashboard/user/profile' className="list-group-item list-group-item-action">Profile</NavLink>
        
        <NavLink to='/dashboard/user/orders' className="list-group-item list-group-item-action">Orders</NavLink>
    </div>

    </>
  )
}

export default UserMenu
