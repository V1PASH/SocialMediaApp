import axios from "axios";

export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });

    const { data } = await axios.post(
      "/api/v1/login",
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (e) {
    console.error("Login error:", e);

    dispatch({
      type: "LoginFailure",
      payload: e?.response?.data?.message || e?.message || "Login failed",
    });
  }
};


export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

   const {data}=await axios.get("/api/v1/me")

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (e) {
    console.error("Login error:", e);

    dispatch({
      type: "LoadUserFailure",
      payload: e?.response?.data?.message || e?.message || "Login failed",
    });
  }
};

export const getFollowingPost= () => async (dispatch) =>{
  try{
    dispatch({
      type:"postOfFollowingRequest"
    });

    const {data}=await axios.get("/api/v1/posts")
    dispatch({
      type:"postOfFollowingSuccess",
      payload:data.posts,
    })

  }
  catch(e){
    dispatch({
      type: "postOfFollowingFailure",
      payload: e?.response?.data?.message || e?.message || "post loading failed",
    });
  }
}
