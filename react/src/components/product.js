import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  setCart,

  selectCart,

  updateUser,
  selectUser,
} from "../redux/userSlice";

export default function Product(props) {
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleAddToCart = (e)=>{
    let userObj = {
      ...user,
      shoppingCart : [...cart,props.productObject]
    }
    dispatch(updateUser(userObj))
  
    console.log("handleAddToCart()")
 
  }
  const handleRemoveFromCart = (e)=>{
    let array = [...cart]
    for (let index in array)
    {
      if(array[index]._id === props.productObject._id)
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
    
  }
  const handleEditProduct = (e)=>{
    console.log("handleEditProduct() at" )
    console.log(e.target.dataset.productid)
  }
  const handleProductDetail = ()=>{
    console.log("handleProductDetail()")
  }
  return (
    <Card sx={{ padding: "15px", border: "1px solid rgb(200,200,200)" }}>
      <CardMedia
        onClick={handleProductDetail}
        sx={{ height: 180, borderRadius: "5px" }}
        image={props.productObject.imageLink}
        title="green iguana"
      />

      <div style={{ textAlign: "left" }}>
        <Typography variant="body2" color="text.secondary">
          {props.productObject.productName}
        </Typography>
        <Typography variant="body2" component="p">
          ${props.productObject.price}
        </Typography>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
            gap:"5px"
          }}
        >
          <div
            style={{
              backgroundColor: "rgb(80,72,229)",
              display: "inline-flex",
              justifyContent: "space-around",
              alignItems: "center",
              borderRadius: "5px",
              width:"100%"
             
            }}
          >
            { props.onCart ? 
            (
              <>
            <Button  data-productobject = {props.productObject} style={{ height: "30px", minWidth: "0px", color: "white" }} onClick={handleAddToCart} >
              +
            </Button>
            <span style={{textAlign:"center",  minWidth: "40px", color: "white" }}>
              {props.onCart}
            </span>
            <Button  data-productobject = {props.productObject} style={{ height: "30px", minWidth: "0px", color: "white" }} onClick={handleRemoveFromCart}>
              -
            </Button>
            </>)
            :
            (
              <>
            <div style={{width:"100%"}}>
            <Button
              variant="outlined"
              style={{
                height: "30px",
                minWidth: "40px",
                width:"100%"
              }}
              data-productobject = {props.productObject}
              onClick={handleAddToCart}
            >
              Add
            </Button>
          </div>
            </>)
            }
          </div>
          <div style={{width:"100%"}}>
            <Button
              disabled= {(user.role === "Regular")? true : false}
              variant="outlined"
              style={{
                height: "30px",
                minWidth: "40px",
                width:"100%"
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
