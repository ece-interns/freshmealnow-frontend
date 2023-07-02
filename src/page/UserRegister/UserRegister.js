import React, { useState, useEffect } from "react";
import "./UserRegister.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../app/usersApiSlice";
import { setCredentials } from "../../app/authSlice";
import { toast } from "react-toastify";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile_no, setMobile_no] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !mobile_no) return;
    try {
      const res = await register({ name, email, password, mobile_no }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Registration Successful", { autoClose: 1000 });
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error, { autoClose: 1000 });
    }
  };

  return (
    <>
      <div className="containRegister">
        <h1>Register</h1>
        {isLoading && <LoadingScreen />}
        <form onSubmit={submitHandler}>
          <div className="form-group2">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder="Enter Name ..."
              className="form-control2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-group2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="Enter Email ..."
              className="form-control2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-group2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Enter Password ..."
              className="form-control2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-group2">
            <label htmlFor="mobile_no">Mobile_no</label>
            <input
              id="mobile_no"
              placeholder="Enter Mobile No ..."
              className="form-control2"
              value={mobile_no}
              onChange={(e) => setMobile_no(e.target.value)}
              required={true}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <div>
          Already Have An Account? <Link to="/user/login">Login</Link>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
