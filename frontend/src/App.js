import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './styles/index.css'
import { Outlet } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
     <ToastContainer/>
      <Header />
      <main className="py-3" style={{minHeight: '80vh'}}>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
