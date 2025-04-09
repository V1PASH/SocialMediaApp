import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated:false
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoginRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoginSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated=true;
    })
    .addCase("LoginFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated=false;

    })

    .addCase("RegisterRequest", (state) => {
      state.loading = true;
    })
    .addCase("RegisterSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated=true;

    })
    .addCase("RegisterFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated=false;

    })

    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated=true;

    })
    .addCase("LoadUserFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated=false;

    });
});

export const postOfFollowingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('postOfFollowingRequest', (state) => {
      state.loading = true;
    })
    .addCase('postOfFollowingSuccess', (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase('postOfFollowingFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});