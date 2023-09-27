import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { isAuthFalse, isAuthTrue } from "../../redux/features/authSlice";
import login from "../../assets/Expense.png";
import { server } from "../../App";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);

  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auths);
  const navigate = useNavigate();
  // login handler
  const loginHandler = async (e) => {
    e.preventDefault();

    const values = {
      email,
      password,
    };
    try {
      const res = await axios.post(`${server}/users/login`, values, {
        withCredentials: true,
      });
      const isSucc = res.data.success;
      if (isSucc) {
        dispatch(isAuthTrue());
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error("Some error");
        dispatch(isAuthFalse());
      }
    } catch (error) {
      dispatch(isAuthFalse());
      toast.error("Something wrong");
    }
  };
  return (
    <Layout>
      <main>
        <section className="loginBody flex items-center justify-center md:mb-4">
          <div className="border-1 m-4 flex min-h-[70vh] w-full  max-w-md items-center justify-center rounded  pt-4">
            <div className="w-full">
              <div className="about">
                <p className="mb-4 text-center">
                  Welcome to{" "}
                  <span className="text-lg font-bold">Expense-Flow</span>
                </p>
              </div>
              {/* left login */}
              <div className="loginDiv">
                {/* right login */}
                <div className="rightLogin space-y-1">
                  <div className="heading flex justify-between border-b border-solid border-rose-400 bg-rose-200 px-2 py-4">
                    <div className="space-y-2 font-semibold">
                      <p>Created by: Nb31</p>
                      <p>Version: 1.0</p>
                      <p>Created on: September 17, 2023</p>
                    </div>
                    <div className="w-28 ">
                      <img className="" src={login} alt="hi img" />
                    </div>
                  </div>
                  <form
                    className=" space-y-3 border border-solid border-gray-400 px-3 py-2"
                    onSubmit={loginHandler}
                  >
                    <div className="fill border-b border-black">
                      <input
                        className="w-full  border-none px-1 py-1 text-lg outline-none"
                        type="email"
                        placeholder="Enter your login email"
                        value={email}
                        autoComplete="username email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="fill eye flex border-b border-black">
                      <input
                        className="w-full  border-none px-1 py-1 text-lg outline-none"
                        type={eye ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i
                        className="flex cursor-pointer items-center justify-center px-2 text-lg font-bold"
                        onClick={() => {
                          setEye(!eye);
                        }}
                      >
                        {eye ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </i>
                    </div>
                    <div>
                      <button
                        className="mt-1 w-full rounded bg-rose-300 py-2 text-lg font-bold text-slate-100"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                    <div className="notUser mt-2 flex justify-end">
                      <p className="font-semibold">New user ? </p>
                      <Link
                        className="font-semibold text-blue-700"
                        to={"/register"}
                      >
                        Register
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Login;
