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
      <main className="bg-gray-100">
        <section className=" pd:mb-4 flex items-center justify-center  bg-gray-100">
          <div className="border-1 m-4 flex  min-h-[70vh] w-full  max-w-md items-center   justify-center  rounded  pt-4">
            <div className="w-full">
              <div>
                <p className="mb-4 text-center">
                  Welcome to{" "}
                  <span className="text-lg font-bold text-blue-500 underline">
                    Expense-Flow
                  </span>
                </p>
              </div>
              <div className="bg-white">
                {/* right register */}
                <div className=" space-y-1">
                  <form
                    className=" space-y-3 rounded-lg border-solid border-gray-300 px-3 py-2 shadow-lg shadow-slate-500"
                    onSubmit={registerHandler}
                  >
                    <div className=" border-b border-black">
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
                    <div className=" border-b border-black">
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
                    <div className=" eye flex cursor-pointer border-b border-black">
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
                        className="mt-1 w-full  rounded-lg bg-blue-500 py-2 text-lg font-bold text-slate-100 outline-blue-600 hover:bg-blue-600"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                    <div className=" mt-2 flex justify-end">
                      <p className="">Already a user? </p>
                      <Link
                        className=" text-gray-500 underline outline-none"
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
