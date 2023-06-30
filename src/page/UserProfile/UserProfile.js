import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../app/authSlice";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../app/usersApiSlice";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile_no, setMobile_no] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setMobile_no(userInfo.mobile_no);
  }, [userInfo.name, userInfo.email, userInfo.mobile_no]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !mobile_no) return;
    try {
      let user = { name, email, mobile_no };
      if (password.length !== 0) {
        user = { ...user, password };
      }
      const res = await updateProfile(user).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile Updated");
    } catch (err) {
      console.log(err?.data?.message || err.error);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="UserContainer">
        <h1>Update Profile</h1>
        {isLoading && <h3>Loading ...</h3>}
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder="Enter Name ..."
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
          </div>
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_no">Mobile_no</label>
            <input
              id="mobile_no"
              placeholder="Enter Mobile No ..."
              className="form-control"
              value={mobile_no}
              onChange={(e) => setMobile_no(e.target.value)}
              required={true}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
