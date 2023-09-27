import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillInstagram,
  AiFillGithub,
  AiFillLinkedin,
  AiFillWechat,
} from "react-icons/ai";
import logo from "../../assets/mainLogo.png";
const Footer = () => {
  return (
    <main>
      <section className="footerSection ">
        <div className="footerDiv flex flex-col-reverse border-t border-solid border-gray-300 py-4 md:flex md:w-full md:flex-row">
          <div className="leftFooter hidden  w-1/5  md:inline-flex md:border-r md:border-black">
            <Link
              className="flex w-full items-center justify-center"
              to="https://nitin-portfolio-coral.vercel.app/"
              target="_blank"
            >
              <img className=" w-24 " src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="midFooter border-r border-solid border-black text-center md:flex md:w-3/5 md:flex-col md:items-center md:justify-center">
            <p className="text-lg font-semibold">
              "Expense-Flow – it's an experience"{" "}
            </p>
            <p>
              Design with <span className="text-2xl text-red-600">❤</span> -{" "}
              <Link to={"https://nitin-portfolio-coral.vercel.app/"}> NB </Link>
            </p>
            <p>Copyright © 2023 | All Rights Reserved</p>
          </div>
          <div className="rightFooter mb-2 flex justify-center md:w-1/5">
            <h4 className="hidden">Contact Us</h4>
            <div className="flex space-x-4  text-2xl font-bold md:flex-col md:justify-center md:space-x-0 md:space-y-2 md:text-3xl">
              <Link to="https://www.linkedin.com/in/nitin-bisht-3998091b6/">
                <i>
                  <AiFillWechat className="hover:text-teal-700" />{" "}
                </i>
              </Link>
              <Link to="https://www.linkedin.com/in/nitin-bisht-3998091b6/">
                <i>
                  <AiFillLinkedin className="hover:text-teal-700" />
                </i>
              </Link>
              <Link to="https://github.com/NickeyNb">
                <i>
                  <AiFillGithub className="hover:text-teal-700" />{" "}
                </i>
              </Link>

              <Link to="https://github.com/NickeyNb">
                <i>
                  <AiFillInstagram className="hover:text-teal-700" />{" "}
                </i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Footer;
