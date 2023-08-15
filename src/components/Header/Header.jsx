import React, { useEffect, useState } from "react";
import "./Header.css";
import { AppName } from "../../utils/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavItem from "../NavItem/NavItem";
import navItems from "../../utils/navItems";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../app/usersApiSlice";
import { deleteCredentials } from "../../app/authSlice";
import { toast } from "react-toastify";
import SideMenu from "../SideMenu/SideMenu";

const Header = ({ sideMenuOpen, setSideMenuOpen }) => {
  const [activeItem, setActiveItem] = useState("");
  const [search, setSearch] = useState("");
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  let items;
  if (userInfo) {
    items = [
      ...navItems,
      { name: "Cart", path: "/cart" },
      { name: "profile", path: "/user/profile" },
    ];
  } else {
    items = [
      ...navItems,
      { name: "Seller", path: "/restaurant/login" },
      { name: "login", path: "/user/login" },
    ];
  }

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(deleteCredentials());
      toast.success("Logged out Successfully", { autoClose: 1000 });
      navigate("/");
    } catch (err) {
      console.log(err?.data?.message || err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length === 0) return;
    navigate(`/search/${search}`);
  };

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);
  return (
    <>
      {sideMenuOpen && (
        <SideMenu
          sideMenuOpen={sideMenuOpen}
          setSideMenuOpen={setSideMenuOpen}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      )}
      <header className={`header ${pathname === "/" ? "home" : "other"}`}>
        <nav>
          <AiOutlineMenu
            className={`menu-icon ${pathname !== "/" && "black"}`}
            onClick={() => setSideMenuOpen(true)}
          />
          <Link to="/">
            <h1 className="logo">{AppName}</h1>
          </Link>
          <div className="nav-links">
            <ul>
              {items.map(({ name, path }) => (
                <NavItem
                  key={path}
                  name={name}
                  path={path}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
              ))}
              {userInfo && (
                <li
                  title="Logout"
                  className="logout-btn"
                  onClick={logoutHandler}
                >
                  Logout
                </li>
              )}
            </ul>
          </div>
        </nav>
        {pathname === "/" && (
          <div className="search-section">
            <h1>{AppName}</h1>
            <div className="header-comp search-container">
              <div className="search-text">Search for best food & drinks</div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="search">
                    <AiOutlineSearch />
                  </label>
                  <input
                    id="search"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for dish or restaurant ..."
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
