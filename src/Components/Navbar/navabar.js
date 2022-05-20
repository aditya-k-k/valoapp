import React from "react";
import "./navbar.css";
import img from "../../assets/logo.png";
export default function navabar() {
  return (
    <>
      <header>
        <div class="logo">
          <img src={img} alt="" />
        </div>
        <div style={{ fontSize: "28px" }}>Home</div>
        <div style={{ fontSize: "28px" }}>Crosshairs</div>
      </header>
    </>
  );
}
