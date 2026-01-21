import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  removeFromCart,
  clearCart,
  addToCart,
} from "../../features/cart/cartSlice";
import { useState } from "react";
import { setProducts } from "../../features/products/productsSlice";
import { Link } from "react-router-dom";
import { useFetch } from "../../Utils/customHooks";
import { API_URL } from "../../constants/constants";
import { selectCartItems } from "../../features/cart/selectors";
import { selectProductsList } from "../../features/products/selectors";
import { selectUserId } from "../../features/authorization/selectors";
import "./orderContent.scss";
import { Button } from "../Button";
import ImageSmile from "../../assets/smile.svg?react";
import { getPaymentProcessor } from "../../services/payment";
import type { OrderData } from "../../services/payment";

export default function OrderContent() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const products = useAppSelector(selectProductsList);
  const userId = useAppSelector(selectUserId);

  useFetch(API_URL, setProducts, true, products.length === 0 ? null : products);

  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const productEntries = Object.entries(cart);
  const isCartEmpty = productEntries.length === 0;
  const isFormValid = street.trim() !== "" && house.trim() !== "";

  const totalAmount = productEntries.reduce((total, [idStr, count]) => {
    const product = products.find((p) => String(p.id) === idStr);
    return total + (product ? product.price * count : 0);
  }, 0);

  const handleDeleteItem = (id: number) => dispatch(removeFromCart(id));

  const handleOrder = async () => {
    if (!street.trim() || !house.trim()) {
      setSubmitted(true);
      return;
    }

    setIsProcessing(true);

    try {
      const orderData: OrderData = {
        amount: totalAmount,
        currency: 'usd',
        orderId: `ORDER-${Date.now()}`,
      };

      console.log('🛒 Processing payment for order:', orderData);

      const paymentProcessor = getPaymentProcessor();

      const paymentResult = await paymentProcessor.processPayment(orderData);

      if (paymentResult.success) {
        alert(
          `✅ Payment successful!\n\n` +
          `Transaction ID: ${paymentResult.transactionId}\n` +
          `Amount: $${totalAmount}\n` +
          `Order ID: ${orderData.orderId}\n\n` +
          `Your order will be delivered to:\n${street}, ${house}`
        );

        dispatch(clearCart());
        setStreet("");
        setHouse("");
        setSubmitted(false);
      } else {
        alert(
          `❌ Payment failed!\n\n` +
          `${paymentResult.message}\n\n` +
          `Please try again or contact support.`
        );
      }
    } catch (error) {
      console.error('Order processing error:', error);
      alert(
        `❌ An error occurred while processing your order.\n\n` +
        `${(error as Error).message}`
      );
    } finally {
      setIsProcessing(false);
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
            <Link to="/menu" className="button primary">Go to menu</Link>
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
          disabled={isProcessing}
        />
        <input
          type="text"
          placeholder=" House"
          value={house}
          onChange={(e) => setHouse(e.target.value)}
          className={submitted && !house.trim() ? "invalid_input" : ""}
          disabled={isProcessing}
        />
        <div className="order_summary">
          <p className="total_amount">Total: ${totalAmount.toFixed(2)}</p>
        </div>
        <Button
          buttonText={isProcessing ? "Processing..." : "Pay & Order"}
          onClick={handleOrder}
          disabled={!isFormValid || isProcessing}
          variant="primary"
        />
        {submitted && !isFormValid && (
          <p className="validation_message">Please fill in both fields</p>
        )}
        {isProcessing && (
          <p className="processing_message">Processing payment... Please wait.</p>
        )}
      </div>
    </div>
  );
}
