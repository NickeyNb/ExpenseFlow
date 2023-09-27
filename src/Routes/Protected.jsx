import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { auth } = useSelector((state) => state.auths);
  const navigate = useNavigate();
  if (auth) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default Protected;
