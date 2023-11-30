import React, { useEffect, useState } from "react";
import "../CSS/Navbar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const [agencyDetails, setAgencyDetails] = useState();

  const id = localStorage.getItem("newspaperAgencyAdminId");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://174.138.101.222:8080/${id}/get-publication-details`
      );
      setAgencyDetails(response.data.data[0]);

      // console.log(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ul>
        <li>
          {agencyDetails && (
            <img
              src={`http://174.138.101.222:8080${agencyDetails.logo_small}`}
              className="newslogo px-2"
            />
          )}
          <a href="#">
            <i class="fa fa-home nav-icon"></i>
            <span class="nav-text">
              <Link to={"/dashboard"}>
                <p
                  className="dashboard"
                  style={{ marginTop: "2px", color: "white" }}
                >
                  MAIN DASHBOARD
                </p>
              </Link>
            </span>
          </a>
        </li>

        <li>
          <a href="#">
            <i class="fa fa-image nav-icon"></i>
            <span class="nav-text">
              <Link to={"/Profile"}>
                <p className="epaper" style={{ marginTop: "2px" }}>
                  UPDATE PROFILE
                </p>
              </Link>
            </span>
          </a>
        </li>

        <li>
          <a href="#">
            <i class="fa fa-pen nav-icon"></i>
            <span class="nav-text">
              <Link to={"/epaper"}>
                <p className="epaper" style={{ marginTop: "2px" }}>
                  E-PAPER
                </p>
              </Link>
            </span>
          </a>
        </li>

        <li>
          <a href="#">
            <i class="fa fa-envelope nav-icon"></i>
            <span class="nav-text">
              <div className="dropdown dropdowns">
                <p
                  className=" dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ marginTop: "2px" }}
                >
                  POST NEWS
                </p>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <Link to={"/news-approval"} className="dropdown-item">
                    APPROVE NEWS
                  </Link>
                  <Link to={"/addNewsArticle"} className="dropdown-item">
                    ADD NEWS ARTICLE
                  </Link>
                </div>
              </div>
            </span>
          </a>
        </li>

        <li>
          <a href="#">
            <i class="fa fa-bell nav-icon"></i>
            <span class="nav-text">
              <div className="dropdown dropdowns">
                <p
                  className=" dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ marginTop: "2px" }}
                >
                  AD MANAGEMENT
                </p>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <Link to={"/create-ad"} className="dropdown-item">
                    CREATE AN AD
                  </Link>
                  <Link to={"/Advertisementlist"} className="dropdown-item">
                    AD LIST
                  </Link>
                  {/* <a className="dropdown-item" href="#">
                  AD SETTING
                </a>
                <a className="dropdown-item" href="#">
                  AD MANAGEMENT
                </a>
                <a className="dropdown-item" href="#">
                  AD SETTING TOPICS
                </a> */}
                </div>
              </div>
            </span>
          </a>
        </li>


        <li>
          <a href="#">
            <i class="fa   fa-list nav-icon"></i>
            <span class="nav-text">
              <div className="dropdown dropdowns">
                <Link to={"/epapervendorlist"}>
                  <p className="epaper" style={{ marginTop: "2px" }}>
                    E-Paper List
                  </p>
                </Link>
              </div>
            </span>
          </a>
        </li>


       


        <li>
          <a href="#">
            <i class="fa fa-file nav-icon"></i>
            <span class="nav-text">
              <div className="dropdown dropdowns">
                <Link to={"/TemplateSelection"}>
                  <p className="epaper" style={{ marginTop: "2px" }}>
                    TEMPLATE SELECTION
                  </p>
                </Link>
              </div>
            </span>
          </a>
        </li>
        <li>
          <a onClick={logout}>
            <i class="fa fa-sign-out nav-icon" style={{ color: "white" }}></i>
            <span class="nav-text">
              <div className="dropdown dropdowns">
                <Link to={"/TemplateSelection"}>
                  <p className="epaper" style={{ marginTop: "10px" }}>
                    Logout{" "}
                  </p>
                </Link>
              </div>
            </span>
          </a>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
