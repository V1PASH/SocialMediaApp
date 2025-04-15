import React, { useEffect } from 'react'
import{useDispatch, useSelector} from "react-redux"
import { getAllUsers } from '../Actions/User';
import User from './User';
function AllUserPost  () {

    const {users,loading:usersLoading}=useSelector((state)=>state.allUsers)
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getAllUsers())
    },[dispatch])
  return (
    <>
    {
      users && users.length>0?users.map((user)=>((
        <User
        userId={""}
        name={""}
        avatar={""}
        />
      ))):<></>
    }
      
    </>
  )
}

export default AllUserPost
