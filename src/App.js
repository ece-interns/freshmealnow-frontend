import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PrivateRouteRestaurant from "./components/PrivateRouteRestaurant/PrivateRouteRestaurant";
import RestaurantHeader from "./components/RestaurantHeader/RestaurantHeader";

// pages
import Home from "../src/page/Home/Home";
import Product from "./components/Products/Product";
import Cart from "../src/page/Cart/Cart";
import About from "../src/page/About/About";
import Contact from "../src/page/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import UserLogin from "./page/UserLogin/UserLogin";
import UserProfile from "./page/UserProfile/UserProfile";
import UserRegister from "./page/UserRegister/UserRegister";
import RestaurantLogin from "./page/RestaurantLogin/RestaurantLogin";
import RestaurantRegister from "./page/RestaurantRegister/RestaurantRegister";
import RestaurantProfile from "./page/RestaurantProfile/RestaurantProfile";
import { useSelector } from "react-redux";
import AddProduct from "./page/AddProduct/AddProduct";
import RestaurantPage from "./page/RestaurantPage/RestaurantPage";

function App() {
  const { restaurantInfo } = useSelector((state) => state.authRestaurant);
  return (
    <div className="App">
      {restaurantInfo ? <RestaurantHeader /> : <Header page="home" />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} index={true} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        {/* start private route */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/user/profile" element={<UserProfile />} />
        </Route>
        {/* end private route */}
        <Route path="/restaurant/login" element={<RestaurantLogin />} />
        <Route path="/restaurant/register" element={<RestaurantRegister />} />
        {/* start private route */}
        <Route path="" element={<PrivateRouteRestaurant />}>
          <Route path="/restaurant/profile" element={<RestaurantProfile />} />
          <Route path="/restaurant/add-product" element={<AddProduct />} />
        </Route>
        {/* end private route */}
        <Route path="/r/:slug" element={<RestaurantPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
