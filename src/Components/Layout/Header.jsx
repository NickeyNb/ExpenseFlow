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
      <section className="headerSection sticky  w-full  bg-white shadow-md shadow-gray-400">
        <div className="headerDiv flex items-center justify-between px-4 py-3">
          <div className="relative md:hidden">
            <div
              className="flex space-x-4 text-2xl font-bold  "
              onClick={showMenu}
            >
              {menu ? (
                <RiCloseLine />
              ) : (
                <RxHamburgerMenu className="cursor-pointer" />
              )}
            </div>
            {menu ? (
              <div className="absolute -left-4 top-9 z-50  border-rose-400 bg-teal-700 text-slate-100 ease-in-out md:hidden">
                <ul className="flex w-screen justify-around py-3 font-semibold">
                  <li>
                    <NavLink
                      className="text-xl font-semibold tracking-normal"
                      to={"/"}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="text-xl font-semibold tracking-normal"
                      to={"/income"}
                    >
                      Income
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="text-xl font-semibold tracking-normal"
                      to={"/expense"}
                    >
                      Expense
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      className="text-xl font-semibold tracking-normal"
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
              className={"font-bold tracking-normal text-teal-800 md:text-xl"}
              to={"https://nitin-portfolio-coral.vercel.app/"}
              target="_blank"
            >
              Expense-Flow
            </NavLink>
          </div>
          <nav className="midHeader hidden md:inline-block md:w-3/5">
            <ul className="flex w-full justify-between text-lg">
              <li>
                <NavLink to={"/"}>Dashboard</NavLink>
              </li>
              <li>
                <NavLink to={"/income"}>Income</NavLink>
              </li>
              <li>
                <NavLink to={"/expense"}>Expense</NavLink>
              </li>
              <li className="">
                <NavLink className="nav-NavLink" to={"/history"}>
                  History
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="rightHeader">
            {auth ? (
              <button
                className="rounded-lg border-2 bg-teal-700 px-2 py-1  font-bold text-slate-100 hover:bg-teal-800"
                onClick={logoutHandler}
              >
                Logout
              </button>
            ) : (
              <button className="rounded-lg border-2 bg-teal-700 px-2 py-1  font-bold text-slate-100 hover:bg-teal-800">
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
