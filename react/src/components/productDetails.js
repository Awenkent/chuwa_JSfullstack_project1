import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import {
  setUser,
  setCart,
  selectCart,
  updateUser,
  selectUser,
} from "../redux/userSlice";
import { relative } from "path";

export default function ProductDetailsPage(props) {
  const matches = useMediaQuery("(min-width:600px)");
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.state);

  const handleAddToCart = (e) => {
    let userObj = {
      ...user,
      shoppingCart: [...cart, location.state.productObject],
    };
    dispatch(updateUser(userObj));

    console.log("handleAddToCart()");
  };

  const handleRemoveFromCart = (e) => {
    let array = [...cart];
    for (let index in array) {
      if (array[index]._id === location.state.productObject.productId) {
        array.splice(index, 1);
        dispatch(setCart(array));
        break;
      }
    }
    console.log("handleRemoveFromCart()");
  };

  const handleEditProduct = (e) => {
    console.log("handleEditProduct() at");
    console.log(location.state.productObject);
  };

  if (matches) {
    return (
      <>
        <div style={{ boxSizing: "border-box" }}>
          <Typography variant="h3">Product Details</Typography>
          <Card
            sx={{
              width: "80%",
              height: "100%",
              padding: "2%",
              margin: "3% auto",
              display: "flex",
              alignItems: "start",
              justifyContent: "space-around",
            }}
          >
            <CardMedia
              sx={{
                height: "40%",
                width: "40%",
                borderRadius: "8px",
              }}
              image={location.state.imageLink}
              title={location.state.description}
              component="img"
            />

            <div
              style={{
                textAlign: "left",
                height: "auto",
                width: "50%",
                margin: "5%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "start",
                border: "3px red solid",
              }}
            >
              <Typography variant="h3" color="text.secondary">
                {location.state.name}
              </Typography>
              <Typography variant="h4" component="p">
                ${location.state.price}
              </Typography>
              <Typography variant="h5" component="p">
                {location.state.description}
              </Typography>

              <div
                style={{
                  display: "flex",
                  width: "50%",
                  gap: "5%",
                  border: "2px solid black",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgb(80,72,229)",
                    display: "inline-flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: "5px",
                    width: "40%",
                    height: "100%",
                    textAlign: "center",
                    // minWidth: "80px",
                    // minHeight: "40px",
                    border: "1px solid red",
                  }}
                >
                  {location.state.onCart ? (
                    <>
                      <Button
                        data-productobject={location.state.productObject}
                        style={{
                          textAlign: "center",
                          color: "white",
                          width: "30%",
                          minWidth: "10px",
                          height: "100%",
                        }}
                        onClick={handleAddToCart}
                      >
                        +
                      </Button>
                      <span
                        style={{
                          textAlign: "center",
                          color: "white",
                          width: "40%",
                          minWidth: "10px",
                          height: "100%",
                        }}
                      >
                        {location.state.onCart}
                      </span>
                      <Button
                        data-productobject={location.state}
                        style={{
                          color: "white",
                          textAlign: "center",
                          width: "30%",
                          height: "100%",
                          minWidth: "10px",
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
                            backgroundColor: "rgb(80,72,229)",
                            textAlign: "center",
                            minWidth: "80px",
                            minHeight: "50px",
                            width: "75%",
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
                <div style={{ width: "40%", border: "1px solid black" }}>
                  <Button
                    disabled={user.role === "Regular" ? true : false}
                    variant="outlined"
                    style={{
                      textAlign: "center",
                      // minWidth: "180px",
                      // minHeight: "50px",
                      width: "100%",
                      height: "100%",
                      border: "1px solid gray",
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
            width: "auto",
            height: "100%",
            padding: "2%",
            margin: "3% auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <CardMedia
            sx={{
              height: "40%",
              width: "40%",
              borderRadius: "8px",
              border: "1px black solid",
            }}
            image={location.state.imageLink}
            title={location.state.description}
            component="img"
          />

          <CardMedia
            style={{
              textAlign: "left",
              border: "1px black solid",
              height: "80%",
              width: "40%",
            }}
          >
            <Typography variant="h3" color="text.secondary">
              {location.state.name}
            </Typography>
            <Typography variant="h4" component="p">
              ${location.state.price}
            </Typography>
            <Typography variant="h5" component="p">
              {location.state.description}
            </Typography>

            <div
              style={{
                border: "1px solid red",
                display: "flex",
                width: "60%",
                justifyContent: "space-around",
                gap: "30px",
              }}
            >
              <div
                style={{
                  // backgroundColor: "rgb(80,72,229)",
                  // display: "inline-flex",
                  // justifyContent: "space-around",
                  // alignItems: "center",
                  // borderRadius: "10px",
                  width: "100%",
                  // border: "1px solid black",
                }}
              >
                {location.state.onCart ? (
                  <>
                    <Button
                      data-productobject={location.state.productObject}
                      style={{
                        minHeight: "30px",
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
                      {location.state.onCart}
                    </span>
                    <Button
                      data-productobject={location.state}
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
                          backgroundColor: "rgb(80,72,229)",
                          textAlign: "center",
                          minWidth: "80px",
                          minHeight: "50px",
                          width: "75%",
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
                    // minWidth: "180px",
                    // minHeight: "50px",
                    width: "50%",
                    borderRadius: "5px",
                    border: "1px solid gray",
                    borderRadius: "5px",
                    color: "black",
                  }}
                  onClick={handleEditProduct}
                >
                  Edit
                </Button>
              </div>
            </div>
          </CardMedia>
        </Card>
      </>
    );
  }
}
