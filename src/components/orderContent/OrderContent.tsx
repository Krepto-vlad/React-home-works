import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  removeFromCart,
  clearCart,
  addToCart,
} from "../../features/cart/cartSlice";
import { useState } from "react";
import { setProducts } from "../../features/products/productsSlice";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../Utils/customHooks";
import { API_URL } from "../../constants/constants";
import { selectCartItems } from "../../features/cart/selectors";
import { selectProductsList } from "../../features/products/selectors";
import "./orderContent.scss";
import { Button } from "../Button";
import ImageSmile from "../../assets/smile.svg?react";

export default function OrderContent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector(selectCartItems);
  const products = useAppSelector(selectProductsList);

  useFetch(API_URL, setProducts, true, products.length === 0 ? null : products);

  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const productEntries = Object.entries(cart);
  const isCartEmpty = productEntries.length === 0;
  const isFormValid = street.trim() !== "" && house.trim() !== "";

  const handleDeleteItem = (id: number) => dispatch(removeFromCart(id));

  const handleOrder = () => {
    if (street.trim() && house.trim()) {
      dispatch(clearCart());
      setStreet("");
      setHouse("");
      setSubmitted(false);
      alert("Order placed!");
    } else {
      setSubmitted(true);
    }
  };

  const handleIncrementProduct = (id: number) => {
    dispatch(addToCart({ id, count: 1 }));
  };

  const handleDecrementProduct = (id: number, currentCount: number) => {
    if (currentCount > 1) {
      dispatch(addToCart({ id, count: -1 }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  if (isCartEmpty) {
    return (
      <div className="order_content">
        <div className="order_empty">
          <ImageSmile className="sad_smile"/>
          <div className="empty_cart_wrapper">
            <p className="empty_title"> Your cart is empty! </p>
            <Button
              buttonText="Go to Menu"
              onClick={() => navigate("/menu")}
              variant="primary"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order_content">
      <p className="title">Finish your order</p>
      <ul className="order_items">
        {productEntries.map(([idStr, count]) => {
          const product = products.find((p) => String(p.id) === idStr);
          if (!product) return null;
          const id = Number(idStr);

          return (
            <li key={idStr} className="order_product_card">
              <div className="description_wrapper">
                <img src={product.img} alt={product.meal} />
                <p className="product_name">{product.meal}</p>
              </div>
              <div className="quantity_wrapper">
                <p className="product_price">$ {product.price}</p>

                <div className="product_count_wrapper">
                  <button
                    className="plus_minus_btn"
                    onClick={() => handleDecrementProduct(id, count)}
                  >
                    −
                  </button>
                  <div className="product_qty">{count}</div>
                  <button
                    className="plus_minus_btn"
                    onClick={() => handleIncrementProduct(id)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="delete_item_btn"
                  onClick={() => handleDeleteItem(Number(idStr))}
                >
                  x
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="order_form">
        <input
          type="text"
          placeholder=" Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className={submitted && !street.trim() ? "invalid_input" : ""}
        />
        <input
          type="text"
          placeholder=" House"
          value={house}
          onChange={(e) => setHouse(e.target.value)}
          className={submitted && !house.trim() ? "invalid_input" : ""}
        />
        <Button
          buttonText="Order"
          onClick={handleOrder}
          disabled={!isFormValid}
          variant="primary"
        />
        {submitted && !isFormValid && (
          <p className="validation_message">Please fill in both fields</p>
        )}
      </div>
    </div>
  );
}
