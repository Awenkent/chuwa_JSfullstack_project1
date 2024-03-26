import React from "react";
import { useState } from "react";
import { useRef } from "react";
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
export default function auth(props) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
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
  const handleSignup = () => {
    let username = usernameRef.current.value;
    let password = passwordRef.current.value;
    let data = {
      userName: username,
      password: password,
      role: "Regular",
    };
    fetch("http://localhost:4000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
      mode: "cors",
      cache: "default",
    })
      .then((res) => {
        if (res.ok) {
          alert(
            "Your account has been created, please verify the email address before login."
          );
          navigate("/signin");
        } else {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  const handleSignin = () => {
    var username = usernameRef.current.value;
    var password = passwordRef.current.value;
    var data = {
      userName: username,
      password: password,
    };
    fetch("http://localhost:4000/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
      mode: "cors",
      cache: "default",
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((json) => {
            console.log(JSON.stringify(json));
            localStorage.setItem("token", json.token);
            localStorage.setItem("email", json.email);
            alert("Login successful!");
            navigate("/");
          });
        } else {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  const renderSwitch = (param) => {
    switch (param) {
      case "signin":
        return (
          <div style={{ padding: "20px 50px" }}>
            <h2>Sign in to your account</h2>
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
                    Username
                  </InputLabel>
                  <BootstrapInput
                    defaultValue="username"
                    id="password-input"
                    inputRef={usernameRef}
                  />
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
                  <a
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    signup
                  </a>
                </h5>
              </Box>
            </form>
          </div>
        );
      case "change-password":
        return (
          <>
            <h2>Update Password</h2>
            <form action="">
              <input type="text" placeholder="username" />
              <input type="password" placeholder="password" />
            </form>
          </>
        );
      case "signup":
        return (
          <div style={{ padding: "20px 50px" }}>
            <h2>Sign up an account</h2>
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
                  <BootstrapInput
                    defaultValue="username"
                    id="password-input"
                    inputRef={usernameRef}
                  />
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
                <Button variant="contained" fullWidth onClick={handleSignup}>
                  Sign up
                </Button>
                <h5 style={{ width: "100%", textAlign: "left" }}>
                  Already have an account?
                  <a
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    signin
                  </a>
                </h5>
              </Box>
            </form>
          </div>
        );

      default:
        return "Error";
    }
  };
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        backgroundColor: "white",
      }}
    >
      {renderSwitch(props.case)}
    </div>
  );
}
