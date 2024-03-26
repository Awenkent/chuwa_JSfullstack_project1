import React, { useState, useEffect } from "react";
import { Badge, Drawer, Grid, LinearProgress } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import {selectCart} from "../redux/userSlice";
import selectProducts from "../redux/productSlice";
const { useSelector } = require("react-redux");
import { Wrapper, StyledButton } from "./cartApp.styles";
import Cart from "./cart";
import "./styles.css";

const CartApp = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async() => {
      const cart = useSelector(selectCart);
      //console.log(cart);
      const products = useSelector(selectProducts);
      //console.log(products);
      const response = [];

      // Create an object to keep track of the frequency of each product ID
      const frequencyMap = {};

      // Count the frequency of each product ID
      cart.forEach((productId) => {
        if (frequencyMap[productId]) {
          frequencyMap[productId]++;
        } else {
          frequencyMap[productId] = 1;
        }
      });

      // Iterate through each unique product ID
      for (const productId of Object.keys(frequencyMap)) {
        const product = products.find((p) => p.id === productId);

        // Modify the product object before adding it to the response array
        const modifiedProduct = {
          id: product._id, // Change _id to id
          productName: product.productName,
          price: product.price,
          amount: frequencyMap[productId], // Set amount to the frequency
          imageLink: product.imageLink,
          description: product.description,
          __v: product.__v,
        };

        delete modifiedProduct.quantity; // Remove the quantity attribute

        response.push(modifiedProduct);
      }

      setCartItems(response);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const getTotalItems = (items) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  const handleAddToCart = (clickedItem) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>{error}</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
    </Wrapper>
  );
};

export default CartApp;

/* const response = [
  {"id": "65f60f5cf03761ec078f3574",
  "productName": "Apple",
  "price": "2000",
  "amount": 5,
  "imageLink": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200",
  "__v": 0,
  "description": "Apple"},
  {"id": "65f9d17dcf96e73a87887a09",
  "productName": "Bose",
  "price": "200",
  "amount": 5,
  "imageLink": "https://assets.bosecreative.com/transform/2f9ed90d-78da-47be-90e4-b5a9df3395fb/soundlink_mini_silo_1_1280_1280",
  "__v": 0,
  "description": "Bose Speaker"}
] */
