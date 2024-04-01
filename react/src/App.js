import "./styles.css";

import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./features/home";
import Auth from "./features/auth";
import Error from "./features/error";
import ResetLinkSent from "./features/resetLinkSent";
import  ErrorBoundary from "./features/errorBoundary";
import ProductDetailsPage from "./features/productDetails";
import ProductManage from "./features/productManage";
import store from "./redux/store";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
export default function App() {
  
  return (
    <BrowserRouter>
    <Provider store={store}>
     
    <div className="App" style={{ backgroundColor: "rgb(235,235,235)" }}>
      <Header></Header>
      <div style={{minHeight: "800px"}}>
      <ErrorBoundary>
      <Routes>
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/signup" element={<Auth case="signup" />} />
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Auth case="signin" />} />
        <Route path="/productmanage" element={<ProductManage />} />
        <Route path="/changepassword" element={<Auth case="change-password" />} />
        <Route path="/resetlinksent" element={<ResetLinkSent />} />
        <Route path="*" element={<Error />} />
      </Routes>
      </ErrorBoundary>
      </div>
    
      <Footer></Footer>
    </div>
 
    </Provider>
    </BrowserRouter>
   
  );
}
