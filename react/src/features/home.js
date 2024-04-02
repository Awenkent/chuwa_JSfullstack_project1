import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Product from "../components/product";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuItem from "@mui/material/MenuItem";
import UserCart from "../components/userCart"
import UserProfile from "../components/userProfile"
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";

import Select from "@mui/material/Select";
import {
  setUser,
  fetchUser,
  selectCartMerged,
  selectCart,
  updateUser,
  selectUser,
  setCartMerge,
  selectDisplayUser,
  selectDisplayCart,
  setDisplayUser,
  setDisplayCart,
  selectWholeUser,
  setCurrentPage,
  selectCurrentPage
} from "../redux/userSlice";
import {
  setProducts,
  createProduct,
  selectProductCount,
  fetchProductCount,
  fetchProducts,
  selectProducts,
} from "../redux/productSlice";





export default function Home() {
 
  const cart = useSelector(selectCart);
  const products = useSelector(selectProducts);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const minMatches = useMediaQuery("(min-width:800px)");
  const middleMatches = useMediaQuery("(min-width:600px)");
  const maxMatches = useMediaQuery("(min-width:400px)");
  const displayUser =  useSelector(selectDisplayUser)
  const displayCart =  useSelector(selectDisplayCart)
  const cartMerged =  useSelector(selectCartMerged)
  const currentPage = useSelector(selectCurrentPage)
  const whole =  useSelector(selectWholeUser)
  const productCount = useSelector(selectProductCount)
  const pageLimit =  10;
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
  const handlePageChange = (e,v)=>
  {
  
    dispatch(setCurrentPage(v))
    dispatch(fetchProducts({limit:pageLimit,page:v})).then((res)=>{
      if(res.error)
      { 
        alert( res.error.message) 
      }
    })  
  }
  const handleSort = (e) =>{
    let sort = e.target.value;
    switch (sort)
    {
      case "LastAdded":
      {
        console.log("la")
        let array = products.toSorted((a,b)=>{    
          return Number(a.creationDate) - Number(b.creationDate);
        })

        dispatch(setProducts(array))
        break;
      }
      case "PriceLowHigh":
      {
        console.log("plh")
        let array = products.toSorted((a,b)=>{    
          return Number(a.price) - Number(b.price);
        })

      
        dispatch(setProducts(array))
        break;
      }
      case "PriceHighLow":
      {
        console.log("phl")
        let array = products.toSorted((a,b)=>{
          
          return Number(b.price) - Number(a.price);
        }) 
        dispatch(setProducts(array))
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

  if(cartMerged)
  {
    console.log("doMerge")
    dispatch(updateUser(user)).then((res)=>{
      if(res.error)
      { 
        alert( res.error.message) 
      }
    })  
    dispatch(setCartMerge())
  }

  useEffect(() => {
    dispatch(fetchProductCount()).then((res)=>{
      if(res.error)
      { 
        alert( res.error.message) 
      }
    });
    dispatch(fetchProducts({limit:pageLimit,page:currentPage})).then((res)=>{
      if(res.error)
      { 
        alert( res.error.message) 
      }
    });
    if(user.userName === null && user.shoppingCart.length !== 0)
    {
        console.log("shopping cart need to merge")
        dispatch(fetchUser(user))        
    }
    else
    {
      dispatch(fetchUser()).then((res)=>{
        if(res.error)
        { 
          alert( res.error.message) 
        }
      }); 
    }
   
  }, []);
  console.log( whole)
  return (
     
    <div>
      <div
        style={{
          position: "fixed",
          display: displayUser,
          minHeight: "1000px",
          width: "100%",
          height: "100%",
          zIndex:100,
          backgroundColor: "rgba(100,100,100,0.5)",
        }}
      >
        <UserProfile
          userName = {user.userName}
          totalPrice = {user.totalPrice}
          role = {user.role}
          handleClick={() => {
            dispatch(setDisplayUser("none"));
          }}
          handleChangePssword = {()=>{navigate("/changepassword")}}
        />
      </div>


      <div
        style={{
          position: "absolute",
          display: displayCart,
          width: "100%",
          height: "100%",
          zIndex:100,
          backgroundColor: "rgba(100,100,100,0.5)",
        }}
      >
        <UserCart
          cart = {cart}
          handleClick={() => {
            dispatch(setDisplayCart("none"));
          }}
        />
      </div>
      <div style={{ display: "flex",
      alignItems:"center",
      justifyContent:"flex-end",
      padding: "10px 20px",
      gap: "5px",
      
    }}>
      
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        size="small"
        defaultValue="LastAdded"
        onChange={handleSort}  
      >
       
          {sortOption.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
       </Select>
     
        <div
            style={user.role === "Regular"?{}: {
              height:"35px",
              backgroundColor: "rgb(80,72,229)",
              display: "inline-flex",
              justifyContent: "space-around",
              alignItems: "center",
              borderRadius: "5px",
            }}
          >
        <Button
         disabled={user.role === "Regular" ? true : false}
          variant="outlined"
          style={user.role === "Regular" ?{     
            width: "100%",
          }:{width: "100%",
          color: "white"}}
          onClick={()=>{navigate("/productManage")}
          }
        >
          Add Product
        </Button>
        </div>
      </div>
         
      <div style={gridStyle}>
       
        {products?.map((product, index) => (
          <Product
          
            key={index}
            productObject = {product}
            productId = {product._id}
            productName={product.productName}
            price={product.price}
            category = {product.category}
            onCart={(user.shoppingCart.filter(item => {
            return  item._id === product._id
            })).length}
            quantity={product.quantity}
            imageLink={product.imageLink}
            description={product.description}
          ></Product>
        ))}
      </div>

      <Pagination
    
        onChange = {handlePageChange}
        boundaryCount = {0}
        count={Math.ceil(productCount/pageLimit)}
        page={currentPage}
        variant="outlined"
        shape="rounded"
        sx={{marginRight:"20px", display : "flex", justifyContent:"flex-end"}}
      />
    </div>
  );
}
