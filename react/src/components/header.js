import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

import {
  setUser,
  fetchUser,
  selectUsername,
  selectCart,
  selectRole,
  selectTotalPrice,
  selectUser,
} from "../redux/userSlice";

export default function Header(props) {
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const handleSignOut = ()=>
{
    alert("SignOut Succeeful!");
    localStorage.removeItem("token");
    window.location.replace("/");
}
  if (matches) {
    return (
      <header
        style={{
          display: "flex",
          height: "60px",
          alignItems: "center",
          justifyContent: "space-evenly",
          color: "white",
          backgroundColor: "black",
          flexWrap: "nowrap",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3>
            <b>Chuwa</b> <small>Management</small>
          </h3>
        </div>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Products"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            flexWrap: "nowrap",
          }}
        >
          <ManageAccountsOutlinedIcon className="icon" fontSize="medium" />
         
          {user.userName !== null?
          (<span style={{ margin: "0 10px" }} onClick={handleSignOut}>
             Sign Out
          </span>) :
            (
            <span style={{ margin: "0 10px" }} onClick={()=>{navigate("/signin")}}>
              Sign in
            </span>
            )
          }
          <ShoppingCartOutlinedIcon className="icon" fontSize="medium" />
          <a style={{ margin: "0 10px" }}> {"$" + totalPrice}</a>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <div
          style={{
            display: "flex",
            height: "60px",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
            backgroundColor: "black",
            flexWrap: "nowrap",
          }}
        >
          <div style={{ flex: 1 }}>
            <h3>
              <b>{props.title}</b> <small>{props.subtitle}</small>
            </h3>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              flexWrap: "nowrap",
            }}
          >
            <ManageAccountsOutlinedIcon className="icon" fontSize="medium" />
            <a style={{ margin: "0 10px" }}>
              {props.userName ? "Logout" : "Login"}
            </a>
            <ShoppingCartOutlinedIcon className="icon" fontSize="medium" />
            <a style={{ margin: "0 10px" }}>{"$" + totalPrice}</a>
          </div>
        </div>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Products"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </header>
    );
  }
}
