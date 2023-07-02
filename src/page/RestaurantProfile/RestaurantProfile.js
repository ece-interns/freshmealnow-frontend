import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RestaurantProfile.css";
import { useSelector } from "react-redux";
import {
  useDeliverOrderMutation,
  useGetOrdersByRestaurantIdQuery,
} from "../../app/ordersApiSlice";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const RestaurantProfile = () => {
  const [orders, setOrders] = useState([]);
  const { restaurantInfo } = useSelector((state) => state.authRestaurant);
  const { data, isLoading } = useGetOrdersByRestaurantIdQuery(
    restaurantInfo._id
  );
  const [deliver] = useDeliverOrderMutation();
  const handleDeliver = async (orderId) => {
    try {
      const { order } = await deliver(orderId).unwrap();
      console.log(order);
      let newOrders = orders.filter((order) => order._id !== orderId);
      newOrders = [...newOrders, order];
      setOrders(newOrders);
    } catch (err) {}
  };
  useEffect(() => {
    if (data) setOrders(data.orders);
  }, [data]);
  return (
    <>
      <div className="restaurant-profile">
        <div className="add-product-btn">
          <Link to="/restaurant/add-product">Add Product</Link>
        </div>
        <div className="">
          <h1>Orders</h1>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <div className="products">
              {orders &&
                orders.map((order) => (
                  <div className="product" key={order._id}>
                    <img src={order.orderItem.image.url} alt="" />
                    <div className="desc">
                      <div>
                        <h4>{order.orderItem.name}</h4>
                        <span>{order.orderItem.description}</span>
                      </div>
                      <div className="product-footer">
                        <p>Rs. {order.orderItem.price}</p>
                        <div className="quantity">Qnty : {order.quantity}</div>
                        <div className="info">
                          <p>
                            {order.isDelivered ? "Delivered" : "Not Delivered"}
                          </p>
                          {!order.isDelivered && (
                            <button onClick={() => handleDeliver(order._id)}>
                              Deliver
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RestaurantProfile;
