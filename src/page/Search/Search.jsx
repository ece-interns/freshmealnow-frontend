import React, { useState } from "react";
import "./Search.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchProductQuery } from "../../app/productsApiSlice";
import { addToCart } from "../../app/cartSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  const { query } = useParams();
  const [search, setSearch] = useState(query);
  const { data: products } = useSearchProductQuery(query);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const addToCartHandler = (product) => {
    if (!userInfo) {
      toast.info("Login to add", { autoClose: 1000 });
      navigate("/user/login");
      return;
    }
    dispatch(addToCart(product));
    toast.success("Item added to Cart", { autoClose: 1000 });
  };
  return (
    <>
      <div className="search products">
        <div className="search-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (search.length === 0) return;
              navigate(`/search/${search}`);
            }}
          >
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
        <h3 className="total">Search : {query}</h3>
        {products && products.length === 0 ? (
          <div className="no-item">No Item Found!!!</div>
        ) : (
          products &&
          products.map((product) => (
            <div className="product" key={product._id}>
              <img src={product.image.url} alt="" />
              <div className="desc">
                <div className="desc">
                  <div>
                    <h4>{product.name}</h4>
                    <span>{product.description}</span>
                  </div>
                  <div className="product-footer">
                    <p>Rs. {product.price}</p>
                    <button onClick={() => addToCartHandler(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Search;
