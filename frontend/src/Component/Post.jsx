import React, { useEffect, useState } from 'react'
import "../Style/Post.css"
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {addCommentOnPost, likePost} from "../Actions/Post"
import { ToastContainer, toast } from 'react-toastify';
import { getFollowingPost } from "../Actions/User";
import User from "../Component/User"
import CommentCard from './CommentCard';


function Post({postId,caption,postImage,likes=[],comments=[],ownerImage,ownerName,ownerId,isDelete=false,isAccount=false}) {


    const[liked,setLiked]=useState(false);
    const {user}=useSelector(state=>state.user)
    const [likesPopUp,setLikesPopUp]=useState(false)
    const[commentValue,setCommentValue]=useState("")
    const[commentToggle,setCommentToggle]=useState(false)
    const dispatch=useDispatch();
    const[more,setMore]=useState(false)
    const [likesCount,setLikesCount]=useState(likes.length)
    async function handleLike(){

      setLiked(!liked)

      await dispatch(likePost(postId))

      toast("Liked")

      if (isAccount) {
        console.log("My Accoutns")
      }

      else{
       await dispatch(getFollowingPost())
      }
      
      if(!liked){
        setLikesCount(likesCount+1)
      }
      else{
        setLikesCount(likesCount-1)
      }
      
    }

    async function addCommentHandler(e){
      e.preventDefault()
     await dispatch(addCommentOnPost(postId,commentValue));
      setCommentValue("")
      toast("comment added")
      
      if (isAccount) {
        console.log("My Accout")
      }
      else{
       await dispatch(getFollowingPost())
      }

    }
    function handleDelete(){

    }

    useEffect(()=>{
      likes.forEach(item=>{
      if(item._id===user._id){
        setLiked(true)
      }
      else{
        setLiked(false)
      }
    })
    },[likes,user._id])
   
  
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
            <button className='comment-btn'><i className="fa-regular fa-comment ms-2" onClick={()=>setCommentToggle(!commentToggle)}></i></button>
            <br />
            <button onClick={() => {if (likes.length > 0) {setLikesPopUp(!likesPopUp);}}}>{likesCount} Likes</button>
          </div>
          <div className="post-details">
            <p>{caption}</p>
          </div> 
          <div className="comment">
            <button className='view-comment-btn' onClick={()=>setCommentToggle(!commentToggle)}>view all {comments.length} comments</button>
          </div>
          {likesPopUp?
          <div className="likes-detail" >
            <div className="likes-head">
              <h5>Post Liked By</h5> <button><i class="fa-solid fa-circle-xmark" style={{color:"red"}} onClick={()=>setLikesPopUp(!likesPopUp)}></i></button>
            </div>
              <ul className='likes-list'>                
                {
                  likes.map((like)=>(<li>
                   <User key={like._id}
                   userId={like._id}
                   name={like.name}
                   avatar={like.avatar.url}
                   />
                   </li>
                  ))}
              </ul>
          </div>:""
}

{commentToggle?
          <div className="comment-detail" >
              <div className="comment-head">
                <h5>Comment</h5><button><i class="fa-solid fa-circle-xmark" style={{color:"red"}} onClick={()=>setCommentToggle(!commentToggle)}></i></button>
              </div>
              <div className="comments">
                <ul>
               {
                comments.length>0?comments.map((comment)=>
                <CommentCard
                  key={comment._id}
                  userId={comment.user._id}
                  name={comment.user.name}
                  avatar={comment.user.avatar.url}
                  comment={comment.comment}
                  isAccount={isAccount}
                  postId={postId}
                />):"No Comments Yet"
               }
               </ul>
              </div>
              <form className='Comment-form' onSubmit={addCommentHandler}>
                <input type="text"value={commentValue} onChange={(e)=>setCommentValue(e.target.value)} placeholder='Add Your Comment' required/>
                <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
              </form>
          </div>:""
}
      </div>
      
    </>
  )
}

export default Post;
