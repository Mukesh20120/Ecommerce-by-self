import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './styles/index.css'
import { Outlet } from "react-router-dom";
export default function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
