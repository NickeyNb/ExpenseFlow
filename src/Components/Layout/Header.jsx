import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { RiArrowDropDownLine, RiCloseLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { isAuthFalse } from "../../redux/features/authSlice";
import { isLoadFalse, isLoadTrue } from "../../redux/features/loadSlice";
import { server } from "../../App";
const Header = () => {
  const [menu, setMenu] = useState(false);
  const [showDrop, setShowDrop] = useState(false);

  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auths);
  const navigate = useNavigate();

  // logout handler
  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      const isSucc = res.data.success;
      if (isSucc) {
        toast.success(res.data.message);
        dispatch(isAuthFalse());
        navigate("/login");
      }
    } catch (error) {
      console.log("erro is logout");
    }
  };

  // show menu menu
  const showMenu = () => {
    setMenu(!menu);
  };
  // show drop menu
  const dropdown = () => {
    setShowDrop(!showDrop);
  };

  return (
    <main>
      <section className=" sticky w-full  bg-slate-200   shadow-lg shadow-gray-400">
        <div className=" flex items-center justify-between px-4 py-3">
          <div className="relative md:hidden">
            <div
              className="flex space-x-4 text-2xl font-bold  "
              onClick={showMenu}
            >
              {menu ? (
                <RiCloseLine className="cursor-pointer" />
              ) : (
                <RxHamburgerMenu className="cursor-pointer" />
              )}
            </div>
            {menu ? (
              <div className="absolute -left-4 top-9 z-50  border-blue-600 bg-blue-500 text-slate-100 ease-in-out md:hidden">
                <ul className="flex w-screen justify-around py-3 font-semibold">
                  <li>
                    <NavLink
                      className="text-xl  tracking-normal hover:text-black"
                      to={"/"}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="text-xl  tracking-normal hover:text-black"
                      to={"/income"}
                    >
                      Income
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="text-xl  tracking-normal hover:text-black"
                      to={"/expense"}
                    >
                      Expense
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      className="text-xl tracking-normal hover:text-black"
                      to={"/history"}
                    >
                      History
                    </NavLink>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>

          <div className="  flex space-x-12 text-xl font-bold md:text-lg">
            <NavLink
              className={"font-bold tracking-normal text-blue-600 md:text-xl"}
              to={"https://nitin-portfolio-coral.vercel.app/"}
              target="_blank"
            >
              Expense-Flow
            </NavLink>
          </div>
          <nav className="midHeader hidden md:inline-block md:w-3/5">
            <ul className="flex w-full justify-between text-lg">
              <li>
                <NavLink to={"/"} className={"hover:text-blue-600"}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to={"/income"} className={"hover:text-blue-600"}>
                  Income
                </NavLink>
              </li>
              <li>
                <NavLink to={"/expense"} className={"hover:text-blue-600"}>
                  Expense
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  className="nav-NavLink hover:text-blue-600"
                  to={"/history"}
                >
                  History
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="rightHeader">
            {auth ? (
              <button
                className="rounded-lg border-2 bg-blue-500 px-3 py-1  font-bold text-slate-100 hover:bg-blue-600"
                onClick={logoutHandler}
              >
                Logout
              </button>
            ) : (
              <button className="rounded-lg border-2 bg-blue-500 px-3 py-1  font-bold text-slate-100 hover:bg-blue-600">
                Login
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Header;
