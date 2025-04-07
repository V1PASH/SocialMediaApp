import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
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
