import React from 'react'
import {NavLink} from "react-router-dom"
import "../Style/User.css"
const User = ({userId,name,avatar}) => {
  return (
    <>
      <NavLink to={`/user/${userId}`} className="userlink">
        <img src={avatar} alt={name} className='user-img'/><span>{name}</span>
      </NavLink>
    </>
  )
}

export default User;
