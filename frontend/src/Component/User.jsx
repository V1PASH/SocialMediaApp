import React from 'react'
import {NavLink} from "react-router-dom"
const User = ({userId,name,avatar}) => {
  return (
    <>
      <NavLink to={`/user/${userId}`}>
        <img src={avatar} alt={name} />{name}
      </NavLink>
    </>
  )
}

export default User;
