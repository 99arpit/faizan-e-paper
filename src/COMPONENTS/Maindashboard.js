import React, { useState } from "react";
import "../CSS/Maindashboard.css";
import Navbar from "./Navbar";


const Maindashboard = () => {

  const [style, setStyle] = useState("main-menu");

  const changeStyle = () => {
    setStyle((prev) => {
      if (prev === 'main-menu') {
        setStyle('main-menu-1')
      } else setStyle('main-menu')
    });
  };


  return (
    <>
      <div className="maindashboard">
        <nav className={style}>
          <Navbar />
        </nav>
        <div className="dashbox">

            <div className="dashwithfav">
              <p style={{fontFamily:'Rooboto'}} className="dashboardtext">MAIN DASHBOARD</p>
              <div className="onclick" onClick={changeStyle}>
                <i class="fa-solid fa-bars"></i>
              </div>
            </div>
          
          <h3 style={{fontFamily:'Rooboto'}}>Upcoming Features :-</h3>

          <div className="userstatuscontainer">
            <div
              style={{ backgroundColor: "transparent", opacity: "0.5" }}
              className="userstatusbox5  "
            >
              <img
                className="toiimage"
                src={require("../Images/Mobile App.jpg")}
                alt="no"
              />
              <h4 style={{fontFamily:'Roobto'}} className="text-center">Mobile Application</h4>
            </div>
            <div
              style={{ backgroundColor: "transparent", opacity: "0.5" }}
              className="userstatusbox5  "
            >
              <img
                className="toiimage"
                src={require("../Images/Advertisement Image.jpg")}
                alt="no"
              />
              <h4 style={{fontFamily:'Roobto'}} className="text-center">Advertising Management</h4>
            </div>
            <div
              style={{ backgroundColor: "transparent", opacity: "0.5" }}
              className="userstatusbox5  "
            >
              <img
                className="toiimage"
                src={require("../Images/Analytics.webp")}
                alt="no"
              />
              <h4 style={{fontFamily:'Roobto'}} className="text-center">Analytics Dashboard</h4>
            </div>
            <div
              style={{ backgroundColor: "transparent", opacity: "0.5" }}
              className="userstatusbox5  "
            >
              <img
                className="toiimage"
                src={require("../Images/AI Image.jpg")}
                alt="no"
              />
              <h4 style={{fontFamily:'Roobto'}} className="text-center">AI Features</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Maindashboard;
