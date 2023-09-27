import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { isAuthTrue, isAuthFalse } from "../../redux/features/authSlice.js";
import register from "../../assets/hi.png";
import { server } from "../../App";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eye show password
  const [eye, setEye] = useState(false);

  //redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auths);

  const navigate = useNavigate();

  // register handler
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const values = {
        name,
        email,
        password,
      };
      //   dispatch(loadingTrue());
      const res = await axios.post(`${server}/users/register`, values, {
        withCredentials: true,
      });
      const isSucc = res.data.success;
      if (isSucc) {
        dispatch(isAuthTrue());
        toast.success(res.data.message);
        navigate("/");
      } else {
        dispatch(isAuthFalse());
      }
    } catch (error) {
      dispatch(isAuthFalse());
    }
  };

  return (
    <Layout>
      <main>
        <section className="registerBody flex items-center justify-center  md:mb-4">
          <div className="border-1 m-4 flex  min-h-[70vh] w-full  max-w-md items-center   justify-center  rounded  pt-4">
            <div className="w-full">
              <div className="about">
                <p className="mb-4 text-center">
                  Welcome to{" "}
                  <span className="text-lg font-bold">Expense-Flow</span>
                </p>
              </div>
              <div className="registerDiv">
                {/* right register */}
                <div className="rightRegister space-y-1">
                  <div className="heading flex justify-between border-b border-solid border-rose-400 bg-rose-200 px-2 py-4">
                    <div className="space-y-2 font-semibold">
                      <p>Created by: Nb31</p>
                      <p>Version: 1.0</p>
                      <p>Created on: September 17, 2023</p>
                    </div>
                    <div className="w-28 border border-solid border-rose-400">
                      <img
                        className="border border-solid border-rose-400"
                        src={register}
                        alt="hi img"
                      />
                    </div>
                  </div>
                  <form
                    className=" space-y-3 border border-solid border-gray-400 px-3 py-2"
                    onSubmit={registerHandler}
                  >
                    <div className="fill border-b border-black">
                      <input
                        className="w-full  border-none px-1 py-1 text-lg outline-none"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        autoComplete="username email"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="fill border-b border-black">
                      <input
                        className="w-full border-none px-1 py-1 text-lg outline-none"
                        type="email"
                        placeholder="Enter your valid email"
                        autoComplete="username email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="fill eye flex cursor-pointer border-b border-black">
                      <input
                        className="w-full border-none px-1 py-1 text-lg outline-none"
                        type={eye ? "text" : "password"}
                        placeholder="Enter the password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i
                        className="flex items-center justify-center px-2 text-lg font-bold"
                        onClick={() => {
                          setEye(!eye);
                        }}
                      >
                        {eye ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </i>
                    </div>

                    {/* Button  */}
                    <div className="">
                      <button
                        className="mt-1 w-full rounded bg-rose-300 py-2 text-lg font-bold text-slate-100"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                    <div className="ifUser mt-2 flex justify-end">
                      <p className="font-semibold">Already a user? </p>
                      <Link
                        className="font-semibold text-blue-700"
                        to={"/login"}
                      >
                        Login
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

export default Register;
