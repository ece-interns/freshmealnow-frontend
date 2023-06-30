import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { restaurantInfo } = useSelector((state) => state.authRestaurant);
  return restaurantInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/restaurant/login" replace />
  );
};

export default PrivateRoute;
