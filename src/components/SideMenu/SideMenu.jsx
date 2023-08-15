import { useNavigate } from "react-router-dom";
import "./SideMenu.css";
import { AppName } from "../../utils/constants";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import navItems from "../../utils/navItems";
import { deleteCredentials } from "../../app/authSlice";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../app/usersApiSlice";

const SideMenu = ({ setSideMenuOpen, activeItem, setActiveItem }) => {
  const { userInfo } = useSelector((state) => state.auth);
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
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
  return (
    <>
      <div className="side-menu">
        <div className="content">
          <div className="head">
            <AiOutlineClose
              className={`menu-close-icon`}
              onClick={() => setSideMenuOpen(false)}
            />
            <h3 onClick={() => navigate("/")}>{AppName}</h3>
          </div>
          <div className="vspace" />
          <li
            title={"Home"}
            className={`side-menu-item ${
              activeItem === "/" ? "nav-active" : "nav-inactive"
            }`}
            onClick={() => {
              setActiveItem("/");
              navigate("/");
              setSideMenuOpen(false);
            }}
          >
            Home
          </li>
          {items.map(({ name, path }) => (
            <li
              title={name}
              className={`side-menu-item ${
                activeItem === path ? "nav-active" : "nav-inactive"
              }`}
              onClick={() => {
                setActiveItem(path);
                navigate(path);
                setSideMenuOpen(false);
              }}
            >
              {name}
            </li>
          ))}
          {userInfo && (
            <li
              title="Logout"
              className="side-menu-item"
              onClick={logoutHandler}
            >
              Logout
            </li>
          )}

          {/* <div className="side-menu-item">Contact</div>
          <div className="side-menu-item">Contact</div>
          <div className="side-menu-item">About</div> */}
          {/* {!userInfo && (
            <div
              cursor={"pointer"}
              textTransform={"capitalize"}
              fontWeight={"semibold"}
              borderRadius={5}
              p={2}
              marginBottom={2}
              _hover={{ bg: "gray.300" }}
              transition={"background-color 400ms ease-in-out"}
              // onClick={onOpen}
            >
              Login
            </div>
          )} */}
          {/* other links */}
          {/* {menuItems.map(({ name, path }) => (
            <Box
              key={path}
              cursor={"pointer"}
              textTransform={"capitalize"}
              fontWeight={"semibold"}
              borderRadius={5}
              p={2}
              marginBottom={2}
              _hover={{ bg: "gray.300" }}
              transition={"background-color 400ms ease-in-out"}
              onClick={() => {
                setActiveItem(path);
                navigate(path);
                setSideMenu((state) => !state);
              }}
              className={activeItem === path ? "nav-active" : ""}
            >
              {name}
            </Box>
          ))} */}
          {/* {userInfo && (
            <Box
              cursor={"pointer"}
              textTransform={"capitalize"}
              fontWeight={"semibold"}
              borderRadius={5}
              p={2}
              marginBottom={2}
              _hover={{ bg: "gray.300" }}
              transition={"background-color 400ms ease-in-out"}
              onClick={logoutHandler}
            >
              Logout
            </Box>
          )} */}
        </div>
        <div
          className="overlay"
          onClick={() => setSideMenuOpen((state) => !state)}
        ></div>
      </div>
    </>
  );
};

export default SideMenu;
