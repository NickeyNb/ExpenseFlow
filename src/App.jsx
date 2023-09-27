import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { isAuthFalse, isAuthTrue } from "./redux/features/authSlice";
import { isLoadFalse, isLoadTrue } from "./redux/features/loadSlice";
import axios from "axios";
import Private from "./Routes/Private";
import Protected from "./Routes/Protected";
import { setUser } from "./redux/features/userSlice";
import PageNotFound from "./Pages/PageNotFound";
import Income from "./Pages/Income";
import Expense from "./Pages/Expense";
import History from "./Pages/History";

export const server = `https://expenseserver-afgg.onrender.com/api/v1`;
function App() {
  //redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auths);
  const { load } = useSelector((state) => state.loads);
  const { user } = useSelector((state) => state.users);

  // avoiding auth loss while refresh
  const getMyself = async () => {
    dispatch(isLoadTrue());
    try {
      const res = await axios.get(`${server}/users/get-my-profile`, {
        withCredentials: true,
      });
      const succ = res.data.success;
      if (succ) {
        dispatch(isLoadFalse());
        dispatch(isAuthTrue());
        dispatch(setUser(res.data.user));
      } else {
        dispatch(isLoadTrue());
        dispatch(isAuthFalse());
        dispatch(setUser({}));
      }
    } catch (error) {
      dispatch(isLoadFalse());
      dispatch(isAuthFalse());
      dispatch(setUser({}));
    }
  };
  // For getting it in initial time
  useEffect(() => {
    getMyself();
  }, []);

  return (
    <>
      {load ? (
        <div className="flex h-screen w-full items-center justify-center">
          Loading.. Wait few seconds
        </div>
      ) : (
        <Router>
          <Routes>
            <Route
              path={"/"}
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />
            <Route
              path={"/income"}
              element={
                <Protected>
                  <Income />
                </Protected>
              }
            />
            <Route
              path={"/expense"}
              element={
                <Protected>
                  <Expense />
                </Protected>
              }
            />
            <Route
              path={"/history"}
              element={
                <Protected>
                  <History />
                </Protected>
              }
            />
            <Route
              path={"/register"}
              element={
                <Private>
                  <Register />
                </Private>
              }
            />
            <Route
              path={"/login"}
              element={
                <Private>
                  <Login />
                </Private>
              }
            />
            <Route path={"*"} element={<PageNotFound />} />
          </Routes>
          <Toaster />
        </Router>
      )}
    </>
  );
}

export default App;
