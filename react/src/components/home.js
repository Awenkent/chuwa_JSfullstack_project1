import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {useRef} from 'react';
import Button from "@mui/material/Button";
import Product from "./product";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import {
  setUser,
  fetchUser,
  selectUsername,
  selectCart,
  selectRole,
  selectTotalPrice,
  selectUser,
} from "../redux/userSlice";
import {
  setProducts,
 
  fetchProducts,
  selectProducts,
} from "../redux/productSlice";


export default function Home() {
  const userName = useSelector(selectUsername);
  const totalPrice = useSelector(selectTotalPrice);
  const role= useSelector(selectRole);
  const cart = useSelector(selectCart);
  const products = useSelector(selectProducts);
  const user = useSelector(selectUser);

  const minMatches = useMediaQuery("(min-width:800px)");
  const middleMatches = useMediaQuery("(min-width:600px)");
  const maxMatches = useMediaQuery("(min-width:400px)");
  const [status, setstatus] = useState(false);
  const sortOptionRef = useRef();
  const sortOption = [
    {
      value: "LastAdded",
      label: "Last Added",
    },
    {
      value: "PriceLowHigh",
      label: "Price: Low to High",
    },
    {
      value: "PriceHighLow",
      label: "Price: High to Low",
    },
  ];

  const dispatch = useDispatch();
  const handleSort = () =>{
    let sort = sortOptionRef.current.value;
    switch (sort)
    {
      case "LastAdded":
      {
        dispatch(setProducts(products.toReversed()))
        break;
      }
      case "PriceLowHigh":
      {
        dispatch(setProducts(products.toSorted((a,b)=>{
          
          return Number(a.price) - Number(b.price);
        })))
        break;
      }
      case "PriceHighLow":
      {
        dispatch(setProducts(products.toSorted((a,b)=>{
          return Number(b.price) - Number(a.price);
        })))
        break;
      }
    }
  }
  var gridStyle = {};

  if (minMatches) {
    gridStyle = {
      margin: "20px",
      padding: "20px",
      backgroundColor: "white",
      display: "grid",
      gap: "20px",
      gridTemplateColumns: "repeat(5, 1fr)",
    };
  } else if (middleMatches) {
    gridStyle = {
      margin: "20px",
      padding: "20px",
      backgroundColor: "white",
      display: "grid",
      gap: "20px",
      gridTemplateColumns: "repeat(3, 1fr)",
    };
  } else if (maxMatches) {
    gridStyle = {
      margin: "20px",
      padding: "20px",
      backgroundColor: "white",
      display: "grid",
      gap: "20px",
      gridTemplateColumns: "repeat(2, 1fr)",
    };
  } else {
    gridStyle = {
      margin: "20px",
      padding: "20px",
      backgroundColor: "white",
      display: "grid",
      gap: "20px",
      gridTemplateColumns: "repeat(1, 1fr)",
    };
  }

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUser());
  }, []);
  console.log(products)
  return (
     
    <div>
       {cart ? cart.map((item, index) => (
          <div key = {index}>{item._id}</div>
        )):""}

      <div style={{ display: "flex" }}>
        <p>currentUser: {user?.userName}</p>
        <p>{"total:" + user?.totalPrice}</p>
        <p>role: {user?.role}</p>
       
       
        
        <TextField
          id="outlined-select-currency"
          select
          variant="filled"
          defaultValue="LastAdded"
          inputRef={sortOptionRef}
          onChange={handleSort}
        >
          {sortOption.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          onClick={() =>
            dispatch(fetchUser())
          }
        >
          Add Product
        </Button>
      </div>
         
      <div style={gridStyle}>
        {products ? products.map((product, index) => (
          <Product
            key={index}
            productObject = {product}
            productId = {product._id}
            productName={product.productName}
            price={product.price}
            onCart={(user.shoppingCart.filter(item => {
            return  item._id === product._id
            })).length}
            quantity={product.quantity}
            imageLink={product.imageLink}
            description={product.description}
          ></Product>
        )):""}
      </div>

      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        sx={{marginRight:"20px", display : "flex", justifyContent:"flex-end"}}
      />
    </div>
  );
}
