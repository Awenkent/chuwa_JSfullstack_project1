import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import {
  setUser,
  selectCart,
  updateUser,
  selectUser,
  setCart,
} from "../redux/userSlice";

export default function Product(props) {
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddToCart = (e) => {
    if (Number(props.productObject.quantity) <= Number(props.onCart)) {
      alert(props.productObject.productName + " out of stock!");
      return;
    }
    let userObj = {
      ...user,
      shoppingCart: [...cart, props.productObject],
    };
    if (user.userName === null) {
      dispatch(setUser(userObj));
    } else {
      dispatch(updateUser(userObj));
    }

    console.log("handleAddToCart()");
  };
  const handleRemoveFromCart = (e) => {
    let array = [...cart];
    for (let index in array) {
      if (array[index]._id === props.productObject._id) {
        array.splice(index, 1);

        break;
      }
    }

    let userObj = {
      ...user,
      shoppingCart: [...array],
    };

    if (user.userName === null) {
      dispatch(setUser(userObj));
    } else {
      dispatch(updateUser(userObj));
    }

    console.log("handleRemoveFromCart()");
  };
  const handleEditProduct = (e) => {
    console.log("handleEditProduct() at");
    navigate("/productManage", { state: { product: props.productObject } });
    console.log(e.target.dataset.productid);
  };

  const propsToPass = {
    productObject: props.productObject,
    productId: props.productId,
    name: props.productName,
    price: props.price,
    quantity: props.quantity,
    imageLink: props.imageLink,
    description: props.description,
    category: props.category,
    onCart: props.onCart,
  };

  const handleProductDetail = (e) => {
    navigate(`/product/${props.productObject._id}`, {
      state: propsToPass,
    });
    console.log("handleProductDetail()");
    console.log(props.productId);
  };

  return (
    <Card
      sx={{
        padding: "15px",
        //border: "1px solid rgb(200,200,200)",
        cursor: "point",
      }}
    >
      <CardMedia
        onClick={handleProductDetail}
        sx={{
          height: props.imageHeight ? props.imageHeight : 180,
          borderRadius: "5px",
        }}
        image={props.productObject.imageLink}
        title={props.productName}
        style={{ cursor: "pointer" }}
      />

      <div style={{ textAlign: "left", overflowY: "auto" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{
            whiteSpace: "nowrap",
            maxWidth: props.imageHeight ? props.imageHeight : 180,
          }}
        >
          <span>{props.productObject.productName}</span>
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ whiteSpace: "nowrap" }}
        >
          <span>
            {" "}
            ${props.productObject.price}
            {Number(props.productObject.quantity) <= Number(props.onCart) ? (
              <span
                style={{
                  backgroundColor: "pink",
                  color: "red",
                  borderRadius: "2.5px",
                  marginLeft: "10px",
                }}
              >
                Out of Stock
              </span>
            ) : (
              ""
            )}{" "}
          </span>
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
            {props.onCart ? (
              <>
                <Button
                  data-productobject={props.productObject}
                  style={{ height: "30px", minWidth: "0px", color: "white" }}
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
                  {props.onCart}
                </span>
                <Button
                  data-productobject={props.productObject}
                  style={{ height: "30px", minWidth: "0px", color: "white" }}
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
                      color: "white",
                    }}
                    data-productobject={props.productObject}
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
  );
}
