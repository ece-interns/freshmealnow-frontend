import React from 'react';
import './Cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { remove} from '../../app/cartSlice';


const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);


  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };

  const totalPrice = products.reduce((total, product) => total + product.price, 0);

  return (
    <>
      <div className="cardWrapper">
        <h3 className="total">Total: Rs. {totalPrice.toFixed(2)}</h3>
        {products.map((product) => (
          <div className="cartCard" key={product.id}>
            <img src={product.image} alt="" />
            <div className="info">
              <h4>{product.title}</h4>
              <h5>Rs. {product.price}</h5>
            </div>
            <button className="btn" onClick={() => handleRemove(product.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart; 