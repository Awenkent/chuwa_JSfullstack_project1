import React from "react";
import { useState,useEffect } from "react";
import {useRef} from 'react';
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
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@mui/material";
import {
  setUser,
  fetchUser,
  setDisplayCart,
  setDisplayUser,
  selectUsername,
  selectCart,
  selectRole,
  selectTotalPrice,
  selectUser,
} from "../redux/userSlice";
export default function auth(props) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const adminRef = useRef(null);
  const [errorState, setErrorState] = useState({
    errorCount :0,
    usernameError: "",
    passwordError: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event
  ) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  

  useEffect(() => {
   
    if(user.userName === null && props.case === "change-password")
    {
      dispatch(fetchUser()); 
    
    }

  }, []);
  const handleSignup = ()=>{
    let username = usernameRef.current.value;
    let password = passwordRef.current.value;
    let admin = adminRef.current.checked
    let errorObj = {
      errorCount:0,
      usernameError: "",
      passwordError: "",
    }

    if(!username)
    {
      errorObj.errorCount += 1;
      errorObj.usernameError = "Username cannot be empty."
    }

    if(!password)
    {
      errorObj.errorCount += 1;
      errorObj.passwordError = "Password cannot be empty."
    }


    if(errorObj.errorCount > 0)
    {
      setErrorState(()=>{
        return errorObj;
      })
      alert("One or more input is invalid, please try again")
      return;
    }


    let data = {
      "userName": username,
      "password": password,
      "role": admin ?"Admin" :"Regular"
    }
    fetch("http://localhost:4000/user/signup",{
      method:'POST',
      headers:{
          'Content-Type':'application/json;charset=UTF-8',
      },
      body: JSON.stringify(data),
      mode:'cors',
      cache:'default'
    }).then(res => {
      if(res.ok) {
        alert("Your account has been created, please varify the email address before login.");
        navigate("/signin");
      }
      else
      {
        return res.text().then(text => { throw new Error(text) });
      }
    })
     .catch(error => {
      alert(error);
     });
  }
  const handleSignin = ()=>{
    var username = usernameRef.current.value;
    var password = passwordRef.current.value;
    
    let errorObj = {
      errorCount:0
    }

    if(!username)
    {
      errorObj.errorCount += 1;
      errorObj.usernameError = "Username cannot be empty."
    }

    if(!password)
    {
      errorObj.errorCount += 1;
      errorObj.passwordError = "Password cannot be empty."
    }

    console.log(errorObj)
    if(errorObj.errorCount > 0)
    {
      setErrorState(()=>{
        return errorObj;
      })
      alert("One or more input is invalid, please try again")
      return;
    }

    var data = {
      "userName": username,
      "password": password,
    }
    fetch("http://localhost:4000/user/signin",{
      method:'POST',
      headers:{
          'Content-Type':'application/json;charset=UTF-8',
      },
      body: JSON.stringify(data),
      mode:'cors',
      cache:'default'
    }).then(res => {
      if(res.ok) {
        return res.json() .then(json => {
          console.log(JSON.stringify(json));
          localStorage.setItem("token", json.token);
          localStorage.setItem("email", json.email);
          alert("Login successful!");
          navigate("/");
      })
      }
      else
      {
        return res.text().then(text => { throw new Error(text) });
      }
    })
     .catch(error => {
      alert(error);
     });

  }
 const renderSwitch = (param) => {
    switch (param) {
      case "signin":
        return (
          
          <div style={{ padding: "20px 50px" }}>
            <h2 role = "title">Sign in to your account</h2>
            <form style={{ textAlign: "center" }}>
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
                  <InputLabel shrink htmlFor="bootstrap-input" >
                    Username
                  </InputLabel>
                  <TextField  style={{ marginTop: "20px" }} size="small" id="password-input" inputRef={usernameRef} error = {!!errorState.usernameError} helperText={errorState.usernameError}/>
                </FormControl>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    password
                  </InputLabel>

                  <TextField
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    style={{ marginTop: "20px" }}
                    size="small"
                    error = {!!errorState.passwordError}
                    helperText={errorState.passwordError}
                    inputRef={passwordRef}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <Button variant="contained" fullWidth onClick={handleSignin}>
                  Sign In
                </Button>
                <h5 style={{ width: "100%", textAlign: "left" }}>
                  Don't have an account?
                  <a className ="clickable" onClick={()=>{navigate("/signup")}}>signup</a>
                </h5>
              </Box>
            </form>
          </div>
        );
      case "change-password":
        return (
          <div style={{ padding: "20px 50px" }}>
            <h2 role = "title">Update your password ({user.userName})</h2>
            <form style={{ textAlign: "center" }}>
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
                    new password
                  </InputLabel>

                  <TextField
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    style={{ marginTop: "20px" }}
                    size="small"
                    error = {!!errorState.passwordError}
                    helperText={errorState.passwordError}
                    inputRef={passwordRef}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                
                <Button variant="contained" fullWidth onClick={()=>{
                  navigate("/resetLinkSent")
                }}>
                  Update
                </Button>
             
              </Box>
            </form>
          </div>
        );
      case "signup":
        return (
          <div style={{ padding: "20px 50px" }}>
            <h2 role = "title">Sign up an account</h2>
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
                    Username
                  </InputLabel>
                  <TextField id="username-input" size="small" style={{ marginTop: "20px" }} inputRef={usernameRef} error = {!!errorState.usernameError} helperText={errorState.usernameError}/>
                </FormControl>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    password
                  </InputLabel>

                  <TextField
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    style={{ marginTop: "20px" }}
                    size="small"
                    error = {!!errorState.passwordError} 
                    helperText ={errorState.passwordError}
                    inputRef={passwordRef}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                </FormControl>
              <div>
                <span>Admin:</span><input type="checkbox" style={{display:"inline"}} ref={adminRef}></input>
                </div>
               
                <Button variant="contained" fullWidth onClick={handleSignup}>
                  Sign up
                </Button>
                <h5 style={{ width: "100%", textAlign: "left" }}>
                  Already have an account?
                  <a className ="clickable" onClick={()=>{navigate("/signin")}} >signin</a>
                </h5>
              </Box>
            </form>
          </div>
        );
    
      default:
        return "Error";
    }
  }
  return (
    <div style={{ maxWidth:"800px", margin:"50px auto", backgroundColor: "white" }}>
      {renderSwitch(props.case)}
    </div>
  );
}
