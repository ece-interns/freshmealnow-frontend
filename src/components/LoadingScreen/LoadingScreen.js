import React from "react";
import "./LoadingScreen.css";
import loader from "../../assets/loader.gif";

const LoadingScreen = () => {
  return (
    <>
      <div className="loader-screen"></div>
      <div className="loader">
        <img src={loader} height={60} width={60} />
      </div>
    </>
  );
};

export default LoadingScreen;
