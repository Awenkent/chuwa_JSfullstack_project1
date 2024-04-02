import Product from "../components/product";
import { useState, useRef } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useSelector, useDispatch } from "react-redux";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  setUser,
  selectCart,
  updateUser,
  selectUser,
  setCart,
} from "../redux/userSlice";
export default function UserCart(props) {
  const matches = useMediaQuery("(min-width:600px)");
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const cuponRef = useRef();
  const [tax, setTax] = useState(0.1);
  const [discount, setDiscount] = useState(false);
  var subTotal = 0;
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "white" : "white",
      border: "1px solid",
      borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
      fontSize: 16,
      width: "100%",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  const map = new Map();
  const set = new Set();
  const handleRemoveItem = (productId) => {
    let array = [...cart];
    let userObj = {
      ...user,
      shoppingCart: [
        ...array.filter((product) => {
          return product._id !== productId;
        }),
      ],
    };
    if (user.userName === null) {
      dispatch(setUser(userObj));
    } else {
      dispatch(updateUser(userObj));
    }
    console.log("handleRemoveItem()");
  };
  {
    props.cart
      ? props.cart.map((product, index) => {
          subTotal += Number(product.price);
          if (map.has(product._id)) {
            map.set(product._id, map.get(product._id) + 1);
          } else {
            map.set(product._id, 1);
          }
        })
      : "";
  }
  var taxAmount = subTotal * tax;
  var discountAmount = discount ? 20 : 0;
  var total = subTotal + taxAmount - discountAmount;

  return (
    <div
      style={{
        float: "right",
        width: matches ? "500px" : "300px",
        marginRight: "30px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(80,72,229)",
          padding: "10px 50px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Cart({props.cart?.length})</h3>

        <div>
          <div
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => {
              props.handleClick();
            }}
          >
            X
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "white",
          padding: "30px",
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        {props.cart
          ? props.cart.map((product, index) => {
              if (!set.has(product._id)) {
                set.add(product._id);
                return (
                  <div
                    key={index}
                    style={{
                      margin: "0 5px",
                      flexDirection: matches ? "row" : "column",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <Product
                      style={{ flex: 1 }}
                      imageHeight={100}
                      key={index}
                      productObject={product}
                      productId={product._id}
                      productName={product.productName}
                      price={product.price}
                      category={product.category}
                      onCart={map.get(product._id)}
                      quantity={product.quantity}
                      imageLink={product.imageLink}
                      description={product.description}
                    ></Product>
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        whiteSpace: "nowrap",
                        overflowY: "auto",
                      }}
                    >
                      <div>
                        <h3>{product.productName}</h3>
                        <h3 style={{ color: "rgb(80,72,229)" }}>
                          Price: ${product.price * map.get(product._id)}
                        </h3>
                      </div>
                      <Button
                        onClick={() => {
                          handleRemoveItem(product._id);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              }
            })
          : ""}
        <FormControl
          variant="standard"
          fullWidth
          style={{ borderTop: "1px solid gray" }}
        >
          <InputLabel
            shrink
            htmlFor="bootstrap-input"
            style={{ paddingTop: "10px" }}
          >
            Apply discount Cupon
          </InputLabel>
          <BootstrapInput
            id="outlined-adornment-password"
            style={{ marginTop: "30px" }}
            size="small"
            inputRef={cuponRef}
            placeholder="Enter coupon code"
            endAdornment={
              <InputAdornment position="end">
                <Button
                  size="large"
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  onClick={() => {
                    cuponRef.current.value
                      ? setDiscount(true)
                      : setDiscount(false);
                  }}
                >
                  Apply
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Subtotal</p>
          <p>${subTotal.toFixed(2)}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Tax</p>
          <p>${taxAmount.toFixed(2)}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Discount</p>
          <p>-${discountAmount.toFixed(2)}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Estimated total</p>
          <p>${total.toFixed(2)}</p>
        </div>

        <Button
          style={{
            backgroundColor: "rgb(80,72,229)",
            color: "white",
          }}
        >
          Check out
        </Button>
      </div>
    </div>
  );
}
