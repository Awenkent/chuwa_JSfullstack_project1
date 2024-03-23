import React from "react";
import { useState } from "react";
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

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function productManage() {
  const matches = useMediaQuery("(min-width:600px)");
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

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  if (matches) {
    return (
      <div style={{maxWidth:"800px", margin:"0 auto"}}>
        <h2>Sign up an account</h2>
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
                <BootstrapInput id="password-input" />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Product Description
                </InputLabel>
                <TextareaAutosize aria-label="empty textarea" minRows={8} />
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
                  <BootstrapInput id="category-input" />
                </FormControl>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Price
                  </InputLabel>
                  <BootstrapInput id="price-input" />
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
                  <BootstrapInput id="quantity-input" />
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
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          size="small"
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload
                          <VisuallyHiddenInput type="file" />
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>

              <Button variant="contained" fullWidth>
                Add Product
              </Button>
            </Box>
          </form>
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
                <BootstrapInput id="password-input" />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Product Description
                </InputLabel>
                <TextareaAutosize aria-label="empty textarea" minRows={8} />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Category
                </InputLabel>
                <BootstrapInput id="category-input" />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Price
                </InputLabel>
                <BootstrapInput id="price-input" />
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                  In Stock Quantity
                </InputLabel>
                <BootstrapInput id="quantity-input" />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="imageLink-input">
                  Add Image Link
                </InputLabel>
                <BootstrapInput
                  id="outlined-adornment-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                        <VisuallyHiddenInput type="file" />
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Button variant="contained" fullWidth>
                Add Product
              </Button>
            </Box>
          </form>
        </div>
      </div>
    );
  }
}
