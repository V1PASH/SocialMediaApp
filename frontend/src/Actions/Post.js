import axios from "axios";

export const likePost= (id) => async (dispatch) =>{
    try{
      dispatch({
        type:"likeRequest"
      });
      const {data}=await axios.get(`/api/v1/post/${id}`)
      dispatch({
        type:"likeSuccess",
        payload:data.message,
      })
  
    }
    catch(e){
      dispatch({
        type: "likeFailure",
        payload: e?.response?.data?.message || e?.message || "post loading failed",
      });
    }
  }
  
  export const addCommentOnPost= (id,comment) => async (dispatch) =>{
    try{
      dispatch({
        type:"addCommentRequest"
      });
      const {data}=await axios.put(`/api/v1/post/comment/${id}`,{
        comment
      },{
        headers:{
          "content-type":"application/json"
        }
      });
      
      dispatch({
        type:"addCommentSuccess",
        payload:data.message,
      })
  
    }
    catch(e){
      dispatch({
        type: "addCommentFailure",
        payload: e?.response?.data?.message || e?.message || "post loading failed",
      });
    }
  }
  
  export const deleteCommentOnPost= (id,commentId) => async (dispatch) =>{
    try{
      dispatch({
        type:"deleteCommentRequest"
      });
      const {data}=await axios.delete(`/api/v1/post/comment/${id}`,{
        data:commentId
      });
      
      dispatch({
        type:"deleteCommentSuccess",
        payload:data.message,
      })
  
    }
    catch(e){
      dispatch({
        type: "deleteCommentFailure",
        payload: e?.response?.data?.message || e?.message || "post loading failed",
      });
    }
  }
  

  
  export const createNewPost= (caption,image) => async (dispatch) =>{
    try{
      dispatch({
        type:"newPostRequest"
      });
      const {data}=await axios.post(`/api/v1/post/upload`,{
        caption,
        image}
        ,
        {
          headers:{
            "content-type":"application/json"
          }
      }
    );
      
      dispatch({
        type:"newPostSuccess",
        payload:data.message,
      })
  
    }
    catch(e){
      dispatch({
        type: "newPostFailure",
        payload: e?.response?.data?.message || e?.message || "post loading failed",
      });
    }
  }
  