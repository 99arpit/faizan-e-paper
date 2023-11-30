import React from "react";
import Navbar from "./Navbar";
import TextField from "@mui/material/TextField";
import "../CSS/UpdateEpaperList.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";

function UpdateCat() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state, "aaaa");
  const [values, setValues] = useState(location.state);

  console.log(values);
  const superAdminToken = localStorage.getItem("superAdminToken");
  const [category, setcategory] = useState("");
  const [pdf, setpdf] = useState("");
  const [city, setcity] = useState("");
  const [date, setdate] = useState("");
  const [image, setimage] = useState("");
  const [pdf_name, setpdf_name] = useState("");
  const [createdAt, setcreatedAt] = useState("");
  const [updatedAt, setupdatedAt] = useState("");

  const getvalue = () => {
    setcategory(values.category);
    setpdf(values.pdf);
    setcity(values.city);
    setdate(values.date);
    setimage(values.image);
    setpdf_name(values.pdf_name);
    setcreatedAt(values.createdAt);
    setupdatedAt(values.updatedAt);
  };
  useEffect(() => {
    getvalue();
  }, []);

  const handleSubmit = async () => {
    console.log(values._id);
    console.log(values.token);
    let item = {
      category,
      pdf,
      city,
      date,
      image,
      pdf_name,
      createdAt,
      updatedAt,
    };
    console.log("handleSubmit clicked", item);
    const apiEndpoint = `http://174.138.101.222:8080/{userId}/updateEpaper/${values._id} `;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${values.token}`,
      },
      body: JSON.stringify(item),
    };

    fetch(apiEndpoint, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            alert("Update");
            navigate("/epapervendorlist");
          });
        } else if (response.status === 400) {
          return response.json().then((data) => {
            alert("data not added");
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [style, setStyle] = useState("main-menu");

  const changeStyle = () => {
    setStyle((prev) => {
      if (prev === "main-menu") {
        setStyle("main-menu-1");
      } else setStyle("main-menu");
    });
  };

  return (
    <>
      <nav className={style}>
        <Navbar />
      </nav>
      <div className="parentContainer">
        <h1 style={{ paddingTop: "1%" }}>
          <span className="pointer" onClick={() => navigate(-1)}>
            <HiOutlineArrowSmallLeft />
          </span>

          <span>Update E-Paper</span>
        </h1>
        <div>
          {/* <p className="personaltext">Category</p> */}
          <div >
            <div >
              <div style={{ textAlign: "center", paddingTop: "1%" }}>
                <TextField
                  id="standard-basic"
                  label="	Category *"
                  name="category"
                  variant="standard"
                  className="personalinput"
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                />
              </div>

              <div style={{ textAlign: "center", paddingTop: "1%" }}>
                <TextField
                  id="standard-basic"
                  label="	PDF *"
                  name="pdf"
                  variant="standard"
                  className="personalinput"
                  value={pdf}
                  onChange={(e) => setpdf(e.target.value)}
                />
              </div>

              <div style={{ textAlign: "center", paddingTop: "1%" }}>
                <TextField
                  id="standard-basic"
                  label="City *"
                  name="city"
                  variant="standard"
                  className="personalinput"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                />
              </div>

              <div style={{ textAlign: "center", paddingTop: "1%" }}>
                <TextField
                  id="standard-basic"
                  label="Date *"
                  name="date"
                  variant="standard"
                  className="personalinput"
                  value={date}
                  onChange={(e) => setdate(e.target.value)}
                />
              </div>

              <div style={{ textAlign: "center", paddingTop: "1%" }}>
                <TextField
                  id="standard-basic"
                  label="Image *"
                  name="image"
                  variant="standard"
                  className="personalinput"
                  value={image}
                  onChange={(e) => setimage(e.target.value)}
                />
              </div>

              <div style={{ textAlign: "center", paddingTop: "1%" }}>
                <TextField
                  id="standard-basic"
                  label="	PDF NAME *"
                  name="createdAt"
                  variant="standard"
                  className="personalinput"
                  value={pdf_name}
                  onChange={(e) => setpdf_name(e.target.value)}
                />
              </div>
              <div style={{ textAlign: "center", paddingTop: "1%" }}>
                <TextField
                  id="standard-basic"
                  label="	Created Add *"
                  name="createdAt"
                  variant="standard"
                  className="personalinput"
                  value={createdAt}
                  onChange={(e) => setcreatedAt(e.target.value)}
                />
              </div>

              <div style={{ textAlign: "center", paddingTop: "1%" }}>
                <TextField
                  id="standard-basic"
                  label="	Updated Data *"
                  name="updatedAt"
                  variant="standard"
                  className="personalinput"
                  value={updatedAt}
                  onChange={(e) => setupdatedAt(e.target.value)}
                />
              </div>

              <br />
              <div style={{ textAlign: "center", paddingTop: "1%" }}>
                <button
                  style={{ backgroundColor: "blue", color: "white" }}
                  className=" btn  personalbtn"
                  onClick={handleSubmit}
                >
                  Update{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateCat;
