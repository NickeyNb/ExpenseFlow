import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Private = (props) => {
  const { auth } = useSelector((state) => state.auths);
  const navigate = useNavigate();
  if (auth) {
    return <Navigate to={"/"} />;
  } else {
    return props.children;
  }
};

export default Private;
