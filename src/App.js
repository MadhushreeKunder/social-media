import React, { useEffect } from "react";
import "./App.css";
import { Header } from "./features/Header/header";
import {
  Posts,
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "./features";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./features/auth/routes/privateRoute";
import { PublicRoute } from "./features/auth/routes/publicRoute";
import { Profile } from "./features/profile/profile";
import { Login } from "./features";
import { SignUp } from "./features";
import {
  useAuthentication,
  loadNotifications,
} from "./features/auth/authenticationSlice";
import { useDispatch } from "react-redux";
import {
  loadPosts,
  storeSharedPost,
  usePostSelector,
} from "./features/posts/postSlice";
import { useLocation } from "react-router";
import { loadUsers } from "./features/users/usersSlice";

function App() {
  const {
    authentication: { token },
  } = useAuthentication();

  const dispatch = useDispatch();
  const sharedQuery = new URLSearchParams(useLocation().search);
  const sharedPostTitle = sharedQuery.get("title");
  const { showLikesContainer } = usePostSelector();

  if (token) {
    setupAuthHeaderForServiceCalls(token);
  }

  useEffect(() => {
    if (sharedPostTitle) {
      dispatch(storeSharedPost(sharedPostTitle));
    }
  }, [dispatch, sharedPostTitle]);

  useEffect(() => {
    setupAuthExceptionHandler(dispatch);
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      dispatch(loadUsers());
      dispatch(loadPosts());
      dispatch(loadNotifications());
    }
  }, [dispatch, token]);

  return (
    <div className="w-11/12 max-w-screen-lg my-0 mx-auto text-secondaryDark selection:bg-red-300 selection:text-slate-900 box-border">
      <Header />
      <div>
        <Routes>
          <PrivateRoute path="/" element={<Posts />} />
          <PrivateRoute path="/profile/:userName" element={<Profile />} />

          <PublicRoute path="/login" element={<Login />} />
          <PublicRoute path="/signup" element={<SignUp />} />

          {/* <Route
            path="/"
            element={
              <PrivateRoute>
                <Posts />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:userName"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
