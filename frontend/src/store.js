import {configureStore}from "@reduxjs/toolkit"
import { postOfFollowingReducer, userReducer } from "./Reducer/User";

const store=configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:postOfFollowingReducer,
    }
})

export default store;