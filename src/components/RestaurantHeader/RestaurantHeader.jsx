import React, { useEffect, useState } from "react";
import "./RestaurantHeader.css";
import { AppName } from "../../utils/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";
import NavItem from "../NavItem/NavItem";
import { useLogoutRestaurantMutation } from "../../app/restaurantsApiSlice";
import { deleteCredentialsRestaurant } from "../../app/authSliceRestaurant";

const navItems = [
  {
    name: "contact",
    path: "/contact",
  },
  {
    name: "profile",
    path: "/restaurant/profile",
  },
];

const RestaurantHeader = () => {
  const [activeItem, setActiveItem] = useState("");
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurantInfo } = useSelector((state) => state.authRestaurant);
  const [logout] = useLogoutRestaurantMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(deleteCredentialsRestaurant());
      toast.success("Logged out Successfully");
      navigate("/restaurant/login");
    } catch (err) {
      console.log(err?.data?.message || err);
    }
  };

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);
  return (
    <header className={`header ${pathname === "/" ? "home" : "other"}`}>
      <nav>
        <Link to="/">
          <h1 className="logo">{AppName}</h1>
        </Link>
        <div className="nav-links">
          <ul>
            {navItems.map(({ name, path }) => (
              <NavItem
                key={path}
                name={name}
                path={path}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            ))}
            {restaurantInfo && (
              <li title="Logout" className="logout-btn" onClick={logoutHandler}>
                Logout
              </li>
            )}
          </ul>
        </div>
      </nav>
      {pathname === "/" && (
        <div className="search-section">
          <h1>{AppName}</h1>
          <div className="search-container">
            <div className="search-text">Search for best food & drinks</div>
            <form>
              <div className="form-group">
                <label htmlFor="search">
                  <AiOutlineSearch />
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search for dish or restaurant ..."
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default RestaurantHeader;
