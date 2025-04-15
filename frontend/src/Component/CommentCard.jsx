import React from 'react'
import "../Style/CommentsCard.css"
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentOnPost } from '../Actions/Post'
import { getFollowingPost } from '../Actions/User'
function CommentCard  ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount
}){
  const {user}=useSelector(state=>state.user);
  const dispatch=useDispatch();

  function handleDelete(){
    dispatch(deleteCommentOnPost(postId,commentId));
    alert("comment Deleted")

    if (isAccount) {
      console.log("My Accout")
    }
    else{
      dispatch(getFollowingPost())
    }
  }

  return (
    <>
      <div className="comment-box">
        <div className="avatar">
          <NavLink to={`/user/${userId}`}>
            <img src={avatar} alt={name} />
          </NavLink>
        </div>
        <div className="info">
          <div className="username">
            <NavLink to={`/user/${userId}`}>
            {name}
            </NavLink>
          </div>
          <div className="comment">
            {comment}
          </div>
        </div>
        {
          isAccount?
          <div className="remove">
            <button onClick={handleDelete}>
              <i class="fa-solid fa-square-minus" style={{color:"red"}}></i>
            </button>
          </div>:userId===user._id?(
             <div className="remove">
             <button onClick={handleDelete}>
               <i class="fa-solid fa-square-minus" style={{color:"red"}}></i>
             </button>
           </div>
          ):null
        }
       
      </div>
    </>
  )
}

export default CommentCard
