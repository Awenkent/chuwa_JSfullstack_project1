import "./styles.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import Auth from "./components/auth";
import Error from "./components/error";
import ProductDetailsPage from "./components/productDetails";
import ProductManage from "./components/productManage";
export default function App() {
  return (
    <div className="App" style={{ backgroundColor: "rgb(235,235,235)" }}>
      <Header></Header>

      <Routes>
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/signup" element={<Auth case="signup" />} />
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Auth case="signin" />} />
        <Route path="/productmanage" element={<ProductManage />} />
        <Route path="*" element={<Error />} />
      </Routes>

      <Footer></Footer>
    </div>
  );
}
