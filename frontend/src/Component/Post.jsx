import React, { useState } from 'react'
import "../Style/Post.css"
import { NavLink } from 'react-router-dom';


function Post({postId,caption,postImage,likes=[],comments=[],ownerImage,ownerName,ownerId,isDelete=false,isAccount=false}) {


    const[liked,setLiked]=useState(false);
    const[more,setMore]=useState(false)
    function handleLike(){
      setLiked(!liked)

    }

    function handleDelete(){

    }
  return (
    <>
      <div className="post">
          <div className="post-header">
            <div className="owner">
              <NavLink to={`/user/${ownerId}`}><img src={ownerImage} className='user-image' alt="User" /> {ownerName}</NavLink>
            </div>
            <div className="more-options">
              {isAccount? <button className='align-right' onClick={()=>setMore(!more)}><i className="fa-solid fa-ellipsis"></i></button>:""}
              {more?
              <div className="options">
                About
                <br/>
                {isDelete?<button className='delete-button' onClick={handleDelete}><i class="fa-solid fa-trash-can" style={{color:"red"}}></i>Delete Post</button>:""}
              </div>:""}
            </div>
          </div>
          <div className="post-image">
              <img src={postImage}  className="image"alt="" />
          </div>
          <div className="post-info">
            <button className="like-btn" onClick={handleLike}>{liked?<i className="fa-solid fa-heart" style={{color:"red"}}></i>:<i className="fa-regular fa-heart" ></i>}</button>
            <button className='comment-btn'><i className="fa-regular fa-comment ms-2"></i></button>
            <p>{likes.length} Likes</p>
          </div>
          <div className="post-details">
            <p>{caption}</p>
          </div> 
          <div className="comment">
            <button className='view-comment-btn'>view all {comments.length} comments</button>
          </div>
      </div>
    </>
  )
}

export default Post;
