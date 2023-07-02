import React, { useState, useEffect } from "react";
import "./UserLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { useLoginMutation } from "../../app/usersApiSlice";
import { setCredentials } from "../../app/authSlice";
import { toast } from "react-toastify";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login Successful", { autoClose: 1000 });
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error, { autoClose: 1000 });
    }
  };
  return (
    <>
      <div className="container">
        <h1>Login</h1>
        {isLoading && <LoadingScreen />}
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="Enter Email ..."
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Enter Password ..."
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <div>
          Don't Have An Account? <Link to="/user/register">Resister</Link>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
