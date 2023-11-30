import React from "react";
import Navbar from "./Navbar";
import TextField from "@mui/material/TextField";
// import "../CSS/UC.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";

function UpdateCat() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const [values, setValues] = useState(location.state);

  const [publisher_name, setpublisher_name] = useState("");
  const [templates, settemplates] = useState("");
  const [page_location, setpage_location] = useState("");
  const [image, setimage] = useState("");


  const getvalue = () => {
    setpublisher_name(values.publisher_name);
    settemplates(values.templates);
    setpage_location(values.page_location);
    setimage(values.image);

  };
  useEffect(() => {
    getvalue();
  }, []);

  const handleSubmit = async () => {
    let item = {
      publisher_name,
      templates,
      page_location,
      image,
    };
    console.log("handleSubmit clicked", item);
    const apiEndpoint =
      "http://174.138.101.222:8080/" + values._id + "/update-advertisements";
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };

    fetch(apiEndpoint, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            alert("Update");
            navigate("/advertisementlist");
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





  // const handleSubmit = async () => {
  //   let item = {
  //     categories_Name_English,
  //     categories_Name_Hindi,
  //     categories_Name_Url,
  //   };
  //   console.log("handleSubmit clicked", item);
  //   const apiEndpoint =
  //     "http://174.138.101.222:8080/" + values._id + "/updateCategories";
  //   const requestOptions = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(item),
  //   };

  //   fetch(apiEndpoint, requestOptions)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         return response.json().then((data) => {
  //           alert("Update");
  //           navigate("/categorylist");
  //         });
  //       } else if (response.status === 400) {
  //         return response.json().then((data) => {
  //           alert("data not added");
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };








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
        <h1>
          <span className="pointer" onClick={() => navigate(-1)}>
            <HiOutlineArrowSmallLeft />
          </span>
          <span>Update Advertisement List</span>
        </h1>
        <div className="personalcontainer">
          {/* <p className="personaltext">Category</p> */}
          <div className="formbox">
            <div className="formbox1">
              <TextField
                id="standard-basic"
                label="Vendor Name *"
                name="publisher_name"
                variant="standard"
                className="personalinput"
                value={publisher_name}
                onChange={(e) => setpublisher_name(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Template *"
                name="templates"
                variant="standard"
                className="personalinput"
                value={templates}
                onChange={(e) => settemplates(e.target.value)}
              />

              <TextField
                id="standard-basic"
                label="Page Location *"
                name="page_location"
                variant="standard"
                className="personalinput"
                value={page_location}
                onChange={(e) => setpage_location(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Images *"
                name="image"
                variant="standard"
                className="personalinput"
                value={image}
                onChange={(e) => setimage(e.target.value)}
              />

              <button className=" btn  personalbtn" onClick={handleSubmit}>
                Update{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateCat;
