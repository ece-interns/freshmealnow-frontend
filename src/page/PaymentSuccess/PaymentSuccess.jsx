import React, { useEffect } from "react";
import "./PaymentSuccess.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearCart } from "../../app/cartSlice";
import { useGetOrdersBySessionIdQuery } from "../../app/ordersApiSlice";

const PaymentSuccess = () => {
  const { session_id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetOrdersBySessionIdQuery(session_id);
  const orders = data.orders;

  useEffect(() => {
    if (session_id) {
      dispatch(clearCart());
    }
  }, [session_id, dispatch]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="payment-success">
          <h1>Order Placed</h1>
          <div className="order-items-header">Order Items</div>
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
                        {order.isDelivered ? "Delivered" : "Not Delivered"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="back-link">
            <Link to="/">Go to Home</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentSuccess;
