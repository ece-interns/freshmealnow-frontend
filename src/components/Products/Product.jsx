import React, { useEffect } from "react";
import { add } from "../../app/cartSlice";
import { useDispatch } from "react-redux";
import { STATUSES, fetchProduct } from "../../app/productSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading...</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!..</h2>;
  }

  // left section items for filter
  const names = [
    "Veg & Non Veg Starter",
    "Mini Biryani",
    "Mini Biryani",
    "Mini Biryani",
    "Mini Biryani",
    "Mini Biryani",
    "Mini Biryani",
  ];

  return (
    <>
      <div className="class1">
        <section className="section1">
          <Link to="#">Order Online</Link>
          <Link to="#">Reviews</Link>
        </section>
      </div>
      <div className="products-wrapper">
        <div className="columns">
          <div className="column left-section">
            <h2>Left section</h2>

            {names.map((name) => (
              <p key={name}>{name}</p>
            ))}
          </div>
          <div className="column right-section">
            <div className="aboveItems">
              <span className="search-icon">&#128269;</span>
              <input type="text" placeholder="Search within the menu" />
            </div>
            <h1 className="Recommend">Recommended</h1>
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt="" />
                <p>Rs.{product.price}</p>
                <h4>{product.title}</h4>
                <button onClick={() => handleAdd(product)} className="btn">
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;