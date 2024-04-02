import React, { useState, useEffect } from "react";
import { Badge, Drawer, Grid, LinearProgress } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { Wrapper, StyledButton } from "../styles/cartApp.styles";
import { selectProducts } from "../redux/productSlice";
import Cart from "./cart";
import {
  setCart,
  selectCart,
  updateUser,
  selectUser,
  setDisplayCart,
  selectDisplayCart
} from "../redux/userSlice";

const CartApp = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  const cartOn= useSelector(selectDisplayCart);
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const Products= useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(cartOn === "none"){
      setCartOpen(true);
    }else{
      setCartOpen(false);
    }
  },[cartOn]);
  
  useEffect(()=>{
    const newCartItems = Object.values(
      cart.reduce((accumulator, product) => {
        if (!product) return accumulator;
        const productId = product._id;
        if (!accumulator[productId]) {
          accumulator[productId] = {
            id: product._id,
            productName: product.productName,
            price: product.price,
            amount: 1,
            imageLink: product.imageLink,
            description: product.description,
            __v: product.__v,
            category: product.category,
          };
        } else {
          accumulator[productId].amount++;
        }
        return accumulator;
      }, {})
    );
    setCartItems(newCartItems);

  },[cart]);
  
 
/*   const cartItems=[
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
  ]; */
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

    const product = Products.find((item) => item._id === clickedItem.id);
    if(Number(product.quantity) ===0)
    {
      alert(product.productName + "out of stock!");
      return; 
    }

    let userObj = {
      ...user,
      shoppingCart : [...cart,product]
    }
    dispatch(updateUser(userObj)) 
    console.log("handleAddToCart()")
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
    let array = [...cart];
    for (let index in array)
    {
      if(array[index]._id === id)
      {
        array.splice(index,1);
        dispatch(setCart(array));
        break;
      }
    }

    let userObj = {
      ...user,
      shoppingCart : [...array]
    }
   
    dispatch(updateUser(userObj))
    console.log("handleRemoveFromCart()")

  };

  const handleRemoveAllFromCart = (id) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          return acc;
        } else {
          return [...acc, item];
        }
      }, [])
    );
    let array = [...cart];
    for (let index in array)
    {
      if(array[index]._id === id)
      {
        array.splice(index,1);
        dispatch(setCart(array));
      }
    }

    let userObj = {
      ...user,
      shoppingCart : [...array]
    }
   
    dispatch(updateUser(userObj))
    console.log("handleRemoveFromCart()")

  };



  return (
    
      <Wrapper>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            removeAllFromCart={handleRemoveAllFromCart}
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

export {CartApp};

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
