import React from "react";
import { useState,useRef } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import {useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  setProducts,
  createProduct,
  fetchProducts,
  selectProducts,
} from "../redux/productSlice";
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
const TextareaAutosize = styled(BaseTextareaAutosize)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
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
export default function productManage(props) {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState(props.product?props.product._id:"")
  const [productDescription, setProductDescription]= useState(props.product?props.product.description:"")
  const [productCategory, setProductCategory]= useState(props.product?props.product.category:"")
  const [productPrice, setProductPrice]= useState(props.product?props.product.price:"")
  const [productQuantity, setProductQuantity]= useState(props.product?props.product.quantity:"")
  const [productImageLink, setProductImageLink]= useState(props.product?props.product.imageLink:"")
  const [imagePreview,setImagePreview] = useState("https://preyash2047.github.io/assets/img/no-preview-available.png?h=824917b166935ea4772542bec6e8f636")
  
 const handleProductCreation = ()=>
 {
  let productObj = {
    productName: productName,
    description:productDescription,
    category:productCategory,
    price:productPrice,
    imageLink:productImageLink
  };
  dispatch(createProduct(productObj))
 }
 const handleProductImageLinkUpload = ()=>
 {
    setImagePreview(productImageLink)
 }
  const handleProductNameChange = (e) =>
  {
    console.log("handleProductNameChange")
    setProductName(e.target.value)
    
  }
  
  const handleProductDescriptionChange = (e) =>
  {
    console.log("handleProductDescriptionChange")
    setProductDescription(e.target.value)
  }
  
  const handleProductCategoryChange = (e) =>
  {
    console.log("handleProductCategoryChange")
    setProductCategory(e.target.value)
    
  }

  const handleProductPriceChange = (e) =>
  {
    console.log("handleProductPriceChange")
    setProductPrice(e.target.value)
  }
  
  const handleProductQuantityChange = (e) =>
  {
    console.log("handleProductQuantityChange")
    setProductQuantity(e.target.value)
    
  }
  const handleProductImageLinkChange = (e) =>
  {
  
    console.log("handleProductImageLinkChange")
    setProductImageLink(e.target.value)
    

  }


  const matches = useMediaQuery("(min-width:600px)");
  


  if (matches) {
    return (
      <div style={{maxWidth:"800px", margin:"0 auto"}}>
        <h2>{props.product ?"Update Product" : "Create Product"}</h2>
        <div
          style={{
            padding: "20px 50px",
            margin: "50px",
            backgroundColor: "white",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Product Name{productName}
                </InputLabel>
                <BootstrapInput key={1} id="name-input" value = {productName} onChange={handleProductNameChange}/>
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Product Description
                </InputLabel>
                <TextareaAutosize aria-label="empty textarea" minRows={8} value = {productDescription} onChange={handleProductDescriptionChange}/>
              </FormControl>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Category
                  </InputLabel>
                  <BootstrapInput id="category-input" value = {productCategory} onChange={handleProductCategoryChange}/>
                </FormControl>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Price
                  </InputLabel>
                  <BootstrapInput id="price-input" value = {productPrice} onChange={handleProductPriceChange}/>
                </FormControl>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <FormControl
                  variant="standard"
                  fullWidth
                  style={{ flex: 0.75 }}
                >
                  <InputLabel shrink htmlFor="bootstrap-input">
                    In Stock Quantity
                  </InputLabel>
                  <BootstrapInput id="quantity-input" value = {productQuantity} onChange={handleProductQuantityChange}/>
                </FormControl>
                <FormControl
                  variant="standard"
                  fullWidth
                  style={{ flex: 1.25 }}
                >
                  <InputLabel shrink htmlFor="imageLink-input">
                    Add Image Link
                  </InputLabel>
                  <BootstrapInput
                    id="outlined-adornment-password"
                    value = {productImageLink} onChange={handleProductImageLinkChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          size="small"
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          onClick ={handleProductImageLinkUpload} 
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload
                         
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <FormControl variant="standard" fullWidth>
              <img src={imagePreview}></img>
              </FormControl>
              <Button variant="contained" fullWidth onClick={handleProductCreation}>
                Add Product
              </Button>
            </Box>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{maxWidth:"800px", margin:"0 auto"}}>
        <h2>create</h2>
        <div
          style={{
            padding: "20px 50px",
            margin: "50px",
            backgroundColor: "white",
          }}
        >
          <form action="" style={{ textAlign: "center" }}>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Product Name
                </InputLabel>
                <BootstrapInput id="name-input" value = {productName} onChange={handleProductNameChange} />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Product Description
                </InputLabel>
                <TextareaAutosize aria-label="empty textarea" minRows={8} value = {productDescription} onChange={handleProductDescriptionChange}/>
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Category
                </InputLabel>
                <BootstrapInput id="category-input" value = {productCategory} onChange={handleProductCategoryChange}/>
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Price
                </InputLabel>
                <BootstrapInput id="price-input" value = {productPrice} onChange={handleProductPriceChange}/>
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  In Stock Quantity
                </InputLabel>
                <BootstrapInput id="quantity-input" value = {productQuantity} onChange={handleProductQuantityChange}/>
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="imageLink-input">
                  Add Image Link
                </InputLabel>
                <BootstrapInput
                  id="imageLink_input"
                  value = {productImageLink} onChange={handleProductImageLinkChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        onClick ={handleProductImageLinkUpload} 
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                       
                      </Button>
                    </InputAdornment>
                  }
                />

              </FormControl>
 <FormControl variant="standard" fullWidth>
                <img  src={imagePreview}></img>
              </FormControl>
              <Button variant="contained" fullWidth onClick={handleProductCreation}>
                Add Product
              </Button>
            </Box>
          </form>
        </div>
      </div>
    );
  }
}
