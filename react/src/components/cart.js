import React, { useState } from "react";
import { Button } from "@material-ui/core";
import CartItem from "./cartItem.js"; 
import { Wrapper } from "../styles/cart.styles"; 

const Cart = ({ cartItems, addToCart, removeFromCart,removeAllFromCart }) => {
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);

  const calculateTax = (total) => total * 0.1; // Tax rate is 0.1

  const applyCoupon = () => {
    setCouponApplied(true);
    setDiscount(20);
  };

  const total = calculateTotal(cartItems);
  const tax = calculateTax(total);
  const discountedTotal = couponApplied ? total - discount : total;

  return (
    <Wrapper>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          removeAllLink={removeAllFromCart}
        />
      ))}
      <h3>Subtotal: ${total.toFixed(2)}</h3>
      <h3>Tax (10%): ${tax.toFixed(2)}</h3>
      {couponApplied && <h3>Discount: $20.00</h3>}
      <h2>Total: ${(discountedTotal + tax).toFixed(2)}</h2>
      {!couponApplied && (
        <div>
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={applyCoupon}>
            Apply Coupon
          </Button>
        </div>
      )}
      <Button variant="contained" color="primary"  onClick={() => alert("Checkout button wait for implementaton!")}>
        Check out
      </Button>


    </Wrapper>
  );
};

export default Cart;
