import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";

import {
  setCart,
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
  selectWholeUser
} from "../redux/userSlice";
import {
  setProducts,
  createProduct,
  fetchProducts,
  selectProducts,
} from "../redux/productSlice";

export default function ProductDetailsPage() {
  const matches = useMediaQuery("(min-width:700px)");
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

  const onCart = user.shoppingCart.filter((item) => {
    return item._id === location.state.productId;
  }).length;

  const handleAddToCart = (e) => {
    if (Number(location.state.quantity) <= Number(onCart)) {
      alert(location.state.productName + " out of stock!");
      return;
    }
    let userObj = {
      ...user,
      shoppingCart: [...cart, location.state.productObject],
    };
    if(user.userName === null)
    {
      dispatch(setUser(userObj)) 

    }
    else{

      dispatch(updateUser(userObj));
    }
  
    console.log("handleAddToCart()");
  };

  const handleRemoveFromCart = (e) => {
    let array = [...cart];
    for (let index in array) {
      if (array[index]._id === location.state.productObject._id) {
        array.splice(index, 1);
        break;
      }
    }

    let userObj = {
      ...user,
      shoppingCart: [...array],
    };

    if(user.userName === null)
    {
      dispatch(setUser(userObj)) 

    }
    else{

      dispatch(updateUser(userObj));
    }
  
    console.log("handleRemoveFromCart()");
  };

  const handleEditProduct = (e) => {
    console.log("handleEditProduct() at");
    navigate("/productManage", {
      state: { product: location.state.productObject },
    });
    console.log(e.target.dataset.productid);
  };
  useEffect(() => {
   
    if(user.userName === null)
    {
      dispatch(fetchUser()); 
      dispatch(fetchProducts());
    }
 
   
  }, []);
  if (matches) {
    return (
      <>
        <div style={{ boxSizing: "border-box"}}>
        <h2> Product Details</h2>
          <Card
            sx={{
              width: "80%",
              padding: "2%",
              margin: "3% auto",
              display: "flex",
              alignItems: "start",
              justifyContent: "space-around",
            }}
          >
            <CardMedia
              sx={{
                width: "40%",
                minWidth: "300px",
                borderRadius: "8px",
              }}
              image={location.state.imageLink}
              title={location.state.description}
              component="img"
            />
            <div
              style={{
                textAlign: "left",
                height: "400px",
                width: "40%",
                minWidth: "300px",
                margin: "5%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "start",
                overflowY:"auto"
              }}
            >
              <Typography  color="text.secondary">
                <h4>{location.state.category}</h4>
              </Typography>
              <Typography color="text.secondary">
              <h2>{location.state.name}</h2>
              </Typography>
              <Typography variant="h5" component="b">
                <span>${location.state.price} {Number(location.state.quantity) <= Number(onCart)? (<span style={{backgroundColor: "pink", color: "red"}}>Out of Stock</span>): ""}</span>
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {location.state.description}
              </Typography>


              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  width: "100%",
                  gap: "5%",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgb(80,72,229)",
                    display: "inline-flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: "5px",
                    width: "100%",
                    height: "50px",
                    textAlign: "center",
                  }}
                >
                  {onCart ? (
                    <>
                      <div
                        style={{
                          width: "100%",
                          textAlign: "center",
                          textWrap: "nowrap",
                          minWidth: "120px",
                          minHeight: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          data-productobject={location.state.productObject}
                          style={{
                            height: "100%",
                            width: "30px",
                            color: "white",
                            textAlign: "center",
                          }}
                          onClick={handleAddToCart}
                        >
                          +
                        </Button>
                        <span
                          style={{
                            textAlign: "center",
                            width: "60px",
                            color: "white",
                          }}
                        >
                          {onCart}
                        </span>
                        <Button
                          data-productobject={location.state.productObject}
                          style={{
                            height: "100%",
                            width: "30px",
                            color: "white",
                            textAlign: "center",
                          }}
                          onClick={handleRemoveFromCart}
                        >
                          -
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ width: "100%" }}>
                        <Button
                          variant="outlined"
                          style={{
                            backgroundColor: "rgb(80,72,229)",
                            textAlign: "center",
                            textWrap: "nowrap",
                            minWidth: "120px",
                            minHeight: "50px",
                            borderRadius: "5px",
                            color: "white",
                          }}
                          data-productobject={location.state.productObject}
                          onClick={handleAddToCart}
                        >
                          Add to cart
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                <div style={{ width: "100%" }}>
                  <Button
                    disabled={user.role === "Regular" ? true : false}
                    variant="outlined"
                    style={{
                      textAlign: "center",
                      minWidth: "120px",
                      minHeight: "50px",
                      borderRadius: "5px",
                      color: "black",
                    }}
                    onClick={handleEditProduct}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Typography variant="h2">Product Details</Typography>
        <Card
          sx={{
            width: "95%",
            padding: "2%",
            margin: "3% auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <CardMedia
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
              width: "80%",
              borderRadius: "8px",
              border: "1px black solid",
              padding: "20px",
            }}
            image={location.state.imageLink}
            title={location.state.description}
            component="img"
          />

          <div style={{ textAlign: "left" }}>
            <Typography variant="h4" color="text.secondary">
              {location.state.productObject.productName}
            </Typography>
            <Typography variant="h5" component="p">
              ${location.state.productObject.price}
            </Typography>
            <Typography variant="body1" component="p">
              {location.state.productObject.description}
            </Typography>

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-evenly",
                gap: "5px",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgb(80,72,229)",
                  display: "inline-flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: "5px",
                  width: "100%",
                }}
              >
                {onCart ? (
                  <>
                    <Button
                      data-productobject={location.state.productObject}
                      style={{
                        height: "30px",
                        minWidth: "0px",
                        color: "white",
                      }}
                      onClick={handleAddToCart}
                    >
                      +
                    </Button>
                    <span
                      style={{
                        textAlign: "center",
                        minWidth: "40px",
                        color: "white",
                      }}
                    >
                      {onCart}
                    </span>
                    <Button
                      data-productobject={location.state.productObject}
                      style={{
                        height: "30px",
                        minWidth: "0px",
                        color: "white",
                      }}
                      onClick={handleRemoveFromCart}
                    >
                      -
                    </Button>
                  </>
                ) : (
                  <>
                    <div style={{ width: "100%" }}>
                      <Button
                        variant="outlined"
                        style={{
                          height: "30px",
                          minWidth: "40px",
                          width: "100%",
                        }}
                        data-productobject={location.state.productObject}
                        onClick={handleAddToCart}
                      >
                        Add
                      </Button>
                    </div>
                  </>
                )}
              </div>
              <div style={{ width: "100%" }}>
                <Button
                  disabled={user.role === "Regular" ? true : false}
                  variant="outlined"
                  style={{
                    height: "30px",
                    minWidth: "40px",
                    width: "100%",
                  }}
                  onClick={handleEditProduct}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </>
    );
  }
}
