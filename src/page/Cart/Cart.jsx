import React from "react";
import "./Cart.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

import { addToCart, decreaseQnty, removeFromCart } from "../../app/cartSlice";
import { toast } from "react-toastify";
import { useCheckoutMutation } from "../../app/paymentApiSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { data: products } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [checkoutApiCall, { isLoading }] = useCheckoutMutation();

  // const { data: key } = useGetKeyQuery();

  const decrease = (productId) => {
    dispatch(decreaseQnty(productId));
  };
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success("Item removed from cart", { autoClose: 1000 });
  };

  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const checkoutHandler = async () => {
    try {
      const resp = await checkoutApiCall({
        items: products,
        user: userInfo,
      }).unwrap();
      if (resp && resp.url) {
        window.location.href = resp.url;
      }
    } catch (err) {
      toast.error("Something went wrong", { autoClose: 1000 });
    }
  };

  // const checkoutHandler = async () => {
  // setAmount(10);
  // try {
  //   const { order } = await checkoutApiCall({
  //     amount,
  //   }).unwrap();

  //   const options = {
  //     key,
  //     amount: order.amount,
  //     currency: "INR",
  //     name: AppName,
  //     description: "Test Transaction",
  //     // image: "https://example.com/your_logo",
  //     order_id: order.id,
  //     callback_url: `${API_URL}/api/payments/paymentverification`,
  //     prefill: {
  //       name: userInfo.name,
  //       email: userInfo.email,
  //       contact: userInfo.mobile_no,
  //     },
  //     notes: {
  //       address,
  //     },
  //     theme: {
  //       color: "#383838",
  //     },
  //   };
  //   const razor = new window.Razorpay(options);
  //   razor.open();
  // } catch (error) {
  //   console.log(error);
  // }
  // };

  return (
    <>
      <div className="cart products">
        <h3 className="total">Total : Rs. {totalPrice.toFixed(2)}</h3>
        {products.length === 0 ? (
          <div className="no-item">No Item in Your Cart</div>
        ) : (
          products.map((product) => (
            <div className="product" key={product._id}>
              <img src={product.image.url} alt="" />
              <div className="desc">
                <div>
                  <h4>{product.name}</h4>
                  <span>{product.description}</span>
                </div>
                <div className="product-footer">
                  <p>Rs. {product.price}</p>
                  <div className="methods">
                    <div className="quantity">Qnty : {product.quantity}</div>
                    <div
                      className="plus"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      <AiOutlinePlus />
                    </div>
                    <div
                      className="minus"
                      onClick={() => decrease(product._id)}
                    >
                      <AiOutlineMinus />
                    </div>
                  </div>
                  <button onClick={() => handleRemove(product._id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        {products.length !== 0 && (
          <button
            disabled={isLoading}
            className="ckeckout-btn"
            onClick={checkoutHandler}
          >
            {isLoading ? "Loading..." : "Checkout"}
          </button>
        )}
      </div>
    </>
  );
};

export default Cart;
