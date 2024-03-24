import "./styles.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import Auth from "./components/auth";
import Error from "./components/error";
import ProductManage from "./components/productManage";
import CartApp from "./components/cartApp"
export default function App() {


  return (
    <div className="App" style={{ backgroundColor: "rgb(235,235,235)" }}>
      <Header
      ></Header>
      <CartApp/>

      <Routes>
        <Route path="/signup" element={<Auth case="signup" />} />
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Auth case="signin" />} />
        <Route path="/productmanage" element={<ProductManage />} />
        <Route path="/cart" element={<CartApp />} />
        <Route path="*" element={<Error />} />
      </Routes>

      <Footer></Footer>
    </div>
  );
}
